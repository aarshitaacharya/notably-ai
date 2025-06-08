"use client"
import Logo from '@/app/_components/Logo'
import { Button } from '@/components/ui/button'
import { db } from '@/config/firebaseConfig'
import { collection, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import { Bell, Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DocumentList from './DocumentList'
import { setDoc , doc} from 'firebase/firestore';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Progress } from "@/components/ui/progress"
import { toast } from 'sonner'

const MAX_FILE = 5

function SideNav({ params }) {

    const [documentList, setDocumentList] = useState([]);
    const {user} = useUser();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [workspaceName, setWorkspaceName] = useState('');

    const [emoji, setEmoji] = useState('');

    useEffect(()=>{
        if(!params?.workspaceid) {
            console.log("undefineddd")
        };

        GetDocumentList();
        FetchWorkspaceName();
    }, [params]);


    const FetchWorkspaceName = async () => {
        const docRef = doc(db, 'Workspace', params.workspaceid.toString());
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            setWorkspaceName(docSnap.data().workspaceName)
            setEmoji(docSnap.data().emoji)
        }else{
            setWorkspaceName("Workspace not found")
        }
    }

    const GetDocumentList = () => {
        const q = query(
            collection(db, 'workspaceDocuments'),
            where('workspaceId', '==', Number(params?.workspaceid))
        )

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setDocumentList(
            querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            );
        });

        return unsubscribe;
        };


        const CreateNewDocument=async()=>{
            
            if(documentList?.length>=MAX_FILE){
                toast("Upgrade to add a new file", {
                    description:"You have reached the maximum file limits, please upgrade for unlimited file creations.",
                    action: {
                        label: "Upgrade",
                        onClick:()=> console.log("undo"),
                    },
                })
                return;
            }
            
            setLoading(true);
            const docId = uuid4();
         
            await setDoc(doc(db,'workspaceDocuments', docId.toString()), {
                workspaceId: Number(params?.workspaceid),
                createdBy: user?.primaryEmailAddress?.emailAddress,
                coverImage:null,
                emoji:null,
                id:docId,
                documentName:'Untitled Document',
                documentOutput:[]
            })
            await setDoc(doc(db, 'documentOutput', docId.toString()),{
                docId:docId,
                output:[]
            })
            setLoading(false);
            router.replace('/workspace/'+params?.workspaceid+"/"+docId);
            }


  return (
    <div className="h-screen md:w-72 hidden md:block fixed 
    bg-blue-50
    pr-3 shadow-md z-50"
    >
    <div className="flex justify-between items-center">
        <Logo/>
        <Bell className = "h-5 w-5 text-gray-500"/>
    </div>
    <hr className="my-5"></hr>
    <div>
        <div className = "flex justify-between items-center px-3">
            <h3 className="font-medium">{emoji}  {workspaceName || "Loading.."}</h3>
        <Button size="sm" onClick={CreateNewDocument}>
            {loading?<Loader2Icon className="h-4 w-4 animate-spin" />:
            '+'}</Button>
        </div>
    </div>

    <DocumentList documentList = {documentList} params={params} />



    <div className="px-4 absolute bottom-10 w-[90%]">
        <Progress value={(documentList?.length/MAX_FILE)*100} />
        <h5 className="text-sm my-2 font-light"><strong>{documentList?.length}</strong> out of <strong>5</strong> files used</h5>
        <h5 className="text-sm my-2 font-light">Upgrade for unlimited access.</h5>
    </div>
    </div>
  )
}

export default SideNav
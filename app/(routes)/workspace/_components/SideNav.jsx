"use client"
import Logo from '@/app/_components/Logo'
import { Button } from '@/components/ui/button'
import { db } from '@/config/firebaseConfig'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { Bell, Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DocumentList from './DocumentList'
import { setDoc , doc} from 'firebase/firestore';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

function SideNav({ params }) {

    const [documentList, setDocumentList] = useState([]);
    const {user} = useUser();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        params&&GetDocumentList();

    },[params])


    const GetDocumentList = () => {
        const q = query(
            collection(db, 'workspaceDocuments'),
            where('workspaceId', '==', Number(params?.workspaceid))
        );

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
            setLoading(false);
            router.replace('/workspace/'+params?.workspaceid+"/"+docId);
            }


  return (
    <div className="h-screen md:w-72 hidden md:block fixed 
    bg-blue-50
    pr-3 shadow-md"
    >
    <div className="flex justify-between items-center">
        <Logo/>
        <Bell className = "h-5 w-5 text-gray-500"/>
    </div>
    <hr className="my-5"></hr>
    <div>
        <div className = "flex justify-between items-center p-3">
            <h3 className="font-medium">Workspace Name</h3>
        <Button size="sm" onClick={CreateNewDocument}>
            {loading?<Loader2Icon className="h-4 w-4 animate-spin" />:
            '+'}</Button>
        </div>
    </div>

    <DocumentList documentList = {documentList} params={params} />
    </div>
  )
}

export default SideNav
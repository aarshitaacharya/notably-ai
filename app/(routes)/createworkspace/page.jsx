"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import cover1 from '@/assets/cover1.jpg'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2Icon, SmilePlus } from 'lucide-react';
import CoverPicker from '@/app/_components/CoverPicker'
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent'
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import { useAuth } from '@clerk/clerk-react';
import { setDoc , doc} from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import uuid4 from 'uuid4';

function CreateWorkspace() {

    const [coverImage, setCoverImage] = useState(cover1);
    const [workspaceName, setWorkspaceName ] = useState("");
    const [emoji, setEmoji] = useState("");
    const {user} = useUser();
    const {orgId} = useAuth();

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const OnCreateWorkspace=async()=>{
        setLoading(true);
        const workspaceId = Date.now();
        const result = await setDoc(doc(db, 'Workspace', workspaceId.toString()), {
            workspaceName:workspaceName,
            emoji:emoji,
            coverImage:coverImage.src,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            id:workspaceId,
            orgId: orgId || user?.primaryEmailAddress?.emailAddress
        });

        const docId = uuid4();
        
        await setDoc(doc(db,'workspaceDocuments', docId.toString()), {
            workspaceId: workspaceId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            coverImage:null,
            emoji:null,
            id:docId,
            documentOutput:[]
        })

        await setDoc(doc(db, 'documentOutput', docId.toString()),{
            docId:docId,
            output:[]
        })

        setLoading(false);
        router.replace('/workspace/'+workspaceId+"/"+docId);
    } 

  return (
    <div className="p-10 md:px-36 lg:px-52 xl:px-80 py-40">
    <div className="shadow-2xl rounded-xl overflow-hidden max-w-[600px] mx-auto ">
        {/* Image wrapper with hover effect */}
        
        <CoverPicker setNewCover={(v)=> setCoverImage(v)}>
            <div className="relative group cursor-pointer">
            <Image
                src={coverImage}
                width={600}
                height={150}
                alt="cover"
                className="w-full h-[180px] object-cover rounded-t-xl transition-opacity group-hover:opacity-35"
            />
            <h3 className="hidden group-hover:flex absolute inset-0 items-center justify-center text-white text-sm font-medium bg-black/20">
                Change Cover
            </h3>
            </div>

        </CoverPicker>

        {/* Text content directly below image */}
        <div className="p-6 bg-white dark:bg-gray-900">
        <h3 className="text-lg font-semibold">Create a new workspace</h3>
        <h4 className="text-sm mt-2 text-gray-600 dark:text-gray-300">
            This is a shared space where you can collaborate with your team. You can always rename it later.
        </h4>

        <div className="mt-8 flex gap-2 items-center">
            <EmojiPickerComponent setEmojiIcon={(v)=>setEmoji(v)}>
                <Button variant="outline">
                    {emoji?emoji: <SmilePlus className="mr-2" />}
                    
                </Button>
            </EmojiPickerComponent>
            <Input placeholder = "Workspace Name" 
            onChange={(e)=> setWorkspaceName(e.target.value)}
            />
        </div>

        <div className = "mt-7 flex justify-end gap-6">
            <Button disabled={!workspaceName?.length || loading} className="bg-[#8230ff] text-white hover:bg-[#732ae6]"
            onClick={OnCreateWorkspace}
            >Create {loading&&<Loader2Icon className="animate-spin ml-2" />}</Button>
            <Button variant="outline">Cancel</Button>
        </div>
        </div>
    </div>
    </div>

  )
}

export default CreateWorkspace
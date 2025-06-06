"use client"
import React, { useEffect, useState } from 'react'
import CoverPicker from '@/app/_components/CoverPicker'
import Image from 'next/image'
import cover1 from '@/assets/cover1.jpg'
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent'
import { SmilePlus } from 'lucide-react';
import { db } from '@/config/firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'sonner'

function DocumentInfo({params}) {
    const [coverImage, setCoverImage] = useState(cover1);
    const [emoji, setEmoji] = useState("");
    const [documentInfo, setDocumentInfo] = useState();


    useEffect(()=>{
            params&&GetDocumentInfo();
        }, [params])

    const GetDocumentInfo=async()=>{
        const docRef=doc(db, 'workspaceDocuments', params?.documentid);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            setDocumentInfo(docSnap.data());
            setEmoji(docSnap.data()?.emoji);
            docSnap.data()?.coverImage&&setCoverImage(docSnap.data()?.coverImage);
        }
    }


    const updateDocumentInfo=async(key, value)=>{
        const docRef= doc(db, 'workspaceDocuments', params?.documentid);
        await updateDoc(docRef, {
            [key]: value
        })

        toast('Document updated');
    }


  return (
    <div className="w-screen">

        <CoverPicker setNewCover={(v)=> {
            setCoverImage(v),
            updateDocumentInfo('coverImage', v)
        }}>
            <div className="relative group cursor-pointer w-full">
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

        <div className="absolute ml-10 mt-[-40px] cursor-pointer">
            <EmojiPickerComponent setEmojiIcon={(emoji)=>{setEmoji(emoji);
                updateDocumentInfo('emoji', emoji)
            }}>
            <div className="bf-[#ffffffb0] p-4 rounded-md">
            {emoji?<span className="text-5xl">{emoji}</span>: <SmilePlus className="h-8 w-8 text-gray-500"/>}
            </div>
        </EmojiPickerComponent>
        </div>

        <div className="mt-10 p-10 px-20 ml-10">
            <input type="text" 
            placeholder="Untitled Document"
            defaultValue={documentInfo?.documentName}
            className='font-bold text-4xl outline-none'
            onBlurCapture={(event)=> updateDocumentInfo('documentName',event.target.value)}
            />
        </div>

    </div>
  )
}

export default DocumentInfo
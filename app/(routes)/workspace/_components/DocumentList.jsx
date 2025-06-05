import Image from 'next/image'
import React from 'react'
import document from '@/assets/document.svg'
import { useRouter } from 'next/navigation'
import DocumentOptions from './DocumentOptions'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/config/firebaseConfig'
import { toast } from 'sonner'

function DocumentList({documentList, params}) {
  const router = useRouter();

  const DeleteDocument=async(docId)=>{
    await deleteDoc(doc(db, "workspaceDocuments", docId));
    toast('Document Deleted!')
  }


    return (
    
    <div className="p-3">
        {documentList.map((doc, index)=>(
            <div key={index} className={`mt-3 p-2 px-3 
            hover:bg-gray-200 rounded-lg 
            cursor-pointer flex justify-between items-center
            ${doc?.id==params?.documentid&&'bg-white'}    
            `} onClick={()=>router.push('/workspace/'+params?.workspaceid+'/'+doc?.id)}>
                <div className='flex gap-2 items-center'>
                    {!doc.emoji&&
                    <Image src={document} width={20} height={20}
                    alt="document" />}
                    <h4 className="flex gap-2">{doc?.emoji}{doc.documentName}</h4>
                    </div>
                    <DocumentOptions doc={doc} 
                    deleteDocument={(docId)=>DeleteDocument(docId)}
                    />
            </div>
        ))}
    </div>
  )
}

export default DocumentList
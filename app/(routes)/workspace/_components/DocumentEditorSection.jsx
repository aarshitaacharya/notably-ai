"use client"
import React from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
import RichDocumentEditor from './RichDocumentEditor'

function DocumentEditorSection({params}) {

  return (
    <div>

        <DocumentHeader />

        <div className ="relative">
          <DocumentInfo params={params} />

        <RichDocumentEditor params={params}/>
        </div>






    </div>
  )
}

export default DocumentEditorSection
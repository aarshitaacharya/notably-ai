"use client"
import React from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
import RichDocumentEditor from './RichDocumentEditor'

function DocumentEditorSection({params}) {

  return (
    <div>

        <DocumentHeader />

        <DocumentInfo params={params} />

        <RichDocumentEditor/>






    </div>
  )
}

export default DocumentEditorSection
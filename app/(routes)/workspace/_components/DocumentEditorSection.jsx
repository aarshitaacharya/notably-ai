import React, { useState } from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
import RichDocumentEditor from './RichDocumentEditor'

function DocumentEditorSection({ params }) {

  const [openComment, setOpenComment] = useState(false);
  return (
    <div className='relative'>
      {/* Header  */}
      <DocumentHeader />

      {/* Document Info  */}
      <DocumentInfo params={params} />

      {/* Rich Text Editor  */}
 
        <RichDocumentEditor params={params} />
    
    </div>
  )
}

export default DocumentEditorSection
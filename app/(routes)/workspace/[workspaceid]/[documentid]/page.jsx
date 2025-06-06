"use client"
import React, { use } from 'react'
import SideNav from '../../_components/SideNav'
import DocumentEditorSection from '../../_components/DocumentEditorSection'

function WorkspaceDocument({params}) {
  const unwrappedParams = use(params)
  return (
    <div>
      <div>
        <SideNav params={unwrappedParams} />
      </div>

      <div className="md:ml-72">
        <DocumentEditorSection params={unwrappedParams}/>
      </div>
    </div>
  )
}

export default WorkspaceDocument
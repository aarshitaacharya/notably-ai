"use client"
import React, { use } from 'react'
import SideNav from '../../_components/SideNav'

function WorkspaceDocument({params}) {
  const unwrappedParams = use(params)
  return (
    <div>
      <div>
        <SideNav params={unwrappedParams} />
      </div>

      <div className="md:ml-72">
        Document
      </div>
    </div>
  )
}

export default WorkspaceDocument
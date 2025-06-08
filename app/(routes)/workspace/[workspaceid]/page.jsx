"use client"
import React from 'react'
import SideNav from '../_components/SideNav'

function Workspace({params}) {
  return (
    <div>
        <SideNav params={params}/>

        <div className="flex items-center justify-center h-screen ml-50">
        <h2 className="text-gray-500 text-xl">Please select a document to view</h2>
      </div>

    </div>
  )
}

export default Workspace
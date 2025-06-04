"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import { AlignLeft, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'
import workspace from "@/assets/workspace.jpeg"
import Link from 'next/link';

function WorkspaceList() {

  const {user} = useUser();
  const [workspaceList, setWorkspaceList] = useState([]);

  return (
    <div className="my-10 p-10 md:px-24 lg:px-36 cl:px-52">
      
      <div className = "flex justify-between">
        <h2 className = "font-bold text-2xl">Hello, {user?.fullName} </h2>
        <Link href = {'/createworkspace'}>
        <Button className = "bg-[#8230ff] text-white hover:bg-[#732ae6] text-base">+</Button>
        </Link>
      </div>

      <div className="mt-10 flex justify-between">
        <div>
          <h3 className = "font-small">Workspaces</h3>
        </div>

        <div className="flex gap-2">
          <LayoutGrid/>
          <AlignLeft/>
        </div>
      </div>

      {workspaceList?.length==0?
      <div className = "flex flex-col justify-center items-center my-10">
        <Image src = {workspace} width={200} height={200} alt="workspace"/>
      
        <h3> Create a new workspace</h3>

        <Link href={'/createworkspace'}>
        <Button className = "my-3 bg-[#8230ff] text-white hover:bg-[#732ae6] text-base">+ New Workspace</Button>
    
        </Link>

        </div> :
        
        <div>
        Workspace List
        </div>
        }
      
      
      </div>
  )
}

export default WorkspaceList
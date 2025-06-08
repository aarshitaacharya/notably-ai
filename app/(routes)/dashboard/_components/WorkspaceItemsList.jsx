import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function WorkspaceItemList({ workspaceList }) {

const router = useRouter();
const OnClickWorkspaceItem=(workspaceId)=>{
    router.push('/workspace/'+workspaceId);
}
  return (
    <div className="w-full flex mt-5">
      <div className="w-full max-w-screen-xl grid grid-cols-2 md:grid-cols-3 gap-6">
        {workspaceList && workspaceList.map((workspace, index) => (
          <div key={index} className="border shadow-xl rounded-xl overflow-hidden
          hover:scale-105 transition-all
          bg-white cursor-pointer"
          
          onClick={() => router.push('/workspace/' + workspace.id)}

          >
            <Image 
              src={workspace?.coverImage}
              height={200}
              width={400}
              alt="cover"
              className="h-[250px] w-full object-cover"
            />
            <div className="p-4">
              <h4 className="flex gap-2 items-center text-lg font-semibold">
                {workspace?.emoji}
                {workspace.workspaceName}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkspaceItemList;

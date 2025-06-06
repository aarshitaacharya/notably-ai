import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { coverOptions } from '@/app/_shared/CoverOptions'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function CoverPicker({children, setNewCover}) {

  const [selectedCover, setSelectedCover] = useState();

  return (
    <Dialog>
    <DialogTrigger className="w-full">{children}</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Cover</DialogTitle>
        <DialogDescription>
          Select a new cover image.
        </DialogDescription>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3">
          {coverOptions.map((cover, index) => (
            <div key={index} onClick={()=>setSelectedCover(cover?.src)}
            className={`${selectedCover==cover?.src&&'border-[#8230ff] border-2'} p-1 rounded-md`}>
              <Image 
                src={cover}
                width={200}
                height={200}
                alt={`cover-${index + 1}`}
                className="h-[100px] w-full rounded-md object-cover cursor-pointer"
              />
            </div>
          ))}
        </div>
      </DialogHeader>

      <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
            
          </DialogClose>
          <DialogClose asChild>
            <Button 
            onClick={()=> setNewCover(selectedCover)}
            type="button" className="bg-[#8230ff] text-white hover:bg-[#732ae6]">
              Update
            </Button>
            
          </DialogClose>
        </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default CoverPicker
import { Button } from '@/components/ui/button'
import { LayoutGrid, Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { chatSession } from '@/config/GoogleAIModel';

function GenerateAITemplate({setGenerateAIOutput}) {
    const [open, setOpen] = useState(false);
    const [userInput, setUserInput] = useState();
    const [loading, setLoading] = useState(false);

    const GenerateFromAI=async()=>{
        setLoading(true);
        const PROMPT='Generate template for editor.js in JSON for'+userInput
        const result = await chatSession.sendMessage(PROMPT);
        console.log(result.response.text());
       try{
         const output = JSON.parse(result.response.text());
         setGenerateAIOutput(output);
       }
       catch (e){
            setLoading(false);
       }
        setLoading(false);
        setOpen(false);
        
    }

  return (
    <div>
        <Button variant="outline" className="flex gap-2"
        onClick={()=>setOpen(true)}>
            <LayoutGrid className='h-4 w-4'/>
            Generate AI Template
            </Button>

            <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Generate AI Template</DialogTitle>
                <DialogDescription>
                    <h4 className="mt-4">What would you like to be generated?</h4>
                    <Input placeholder = "Example: ToDo List"
                    onChange={(e)=>setUserInput(e?.target.value)} />
                    <div className="mt-5 flex gap-5 justify-end">
                        <Button variant = "ghost"
                        onClick={()=>setOpen(false)}>Cancel</Button>
                        <Button disables={!userInput || loading}
                        onClick={()=>GenerateFromAI()}>
                        {loading?<Loader2Icon className="animate-spin"/>:"Generate"}</Button>
                    </div>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
            </Dialog>
        
    </div>
  )
}

export default GenerateAITemplate
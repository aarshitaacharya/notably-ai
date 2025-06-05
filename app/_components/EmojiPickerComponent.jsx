import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react'

function EmojiPickerComponent({children, setEmojiIcon}) {
  const [openEmoji, setOpenEmoji] = useState(false);
  
  return (
    <div>
      <div onClick={()=>setOpenEmoji(true)}>
        {children}
      </div>
      {openEmoji&& 
      <div className ='absolute z-10'>
      <EmojiPicker
        onEmojiClick={(e)=>{
          setEmojiIcon(e.emoji);
          setOpenEmoji(false);
        }}
      />
      </div>
      }
    </div>
  )
}

export default EmojiPickerComponent
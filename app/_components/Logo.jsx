import React from 'react'
import logo from '@/assets/logo.png'
import Image from 'next/image'

function Logo() {
  return (
    <div className = "flex items-center">
        <Image 
        src= {logo}
        alt = "logo"
        width = {100}
        height = {100}
        />
        <h2 className = "font-bold text-xl">Notably AI </h2>
    </div>
  )
}

export default Logo
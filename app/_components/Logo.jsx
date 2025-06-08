import React from 'react'
import logo from '@/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'

function Logo() {
  return (
   <Link href={'/dashboard'} className='flex items-center gap-2'>
        <Image 
        src= {logo}
        alt = "logo"
        width = {100}
        height = {100}
        />
        <h2 className = "font-bold text-xl">Notably AI </h2>
    </Link>
  )
}

export default Logo
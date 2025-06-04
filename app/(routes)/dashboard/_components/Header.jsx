import React from 'react'
import Logo from '@/app/_components/Logo'
import { UserButton } from '@clerk/nextjs'

function Header() {
  return (
    <div className="flex justify-between items-center px-3 shadow-sm">
      <Logo/>
      <UserButton />
    </div>
  )
}

export default Header
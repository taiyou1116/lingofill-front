"use client"

import React from 'react'
import { AccountCircle, Reorder } from "@mui/icons-material";
import { useStore } from '@/store/store';
import { m_plus_rounded_1c_bold } from '@/store/fontStore';
import Image from 'next/image';
import Link from 'next/link';

function HeaderComponent() {
  // store
  const flipShowSidebar = useStore((store) => store.flipShowSidebar);

  return (
    <div className="header-bg-height bg-cyan-500 flex items-center justify-between">
      <div className='flex items-center pl-4 gap-5'>
        <button onClick={flipShowSidebar}>
          <Reorder style={{fontSize: 35}} />
        </button>
        <div className=' flex items-center cursor-pointer'>
          <Image src="LF.svg" width="40" height="40" alt='ロゴ' />
          <h1 className={` text-xl ${m_plus_rounded_1c_bold.className}`}>
            Lingo Fill
          </h1> 
        </div>
      </div>
      <div 
        className=' px-10'
      >
        <Link href={'/signIn'}>
          <AccountCircle style={{fontSize: 35}} />
        </Link>
      </div>
    </div>
  )
}

export default HeaderComponent
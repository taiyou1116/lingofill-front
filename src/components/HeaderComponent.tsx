"use client"

import React from 'react'
import { AccountCircle, Reorder } from "@mui/icons-material";
import { useStore } from '@/store/store';
import { m_plus_rounded_1c_bold } from '@/store/fontStore';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip } from './Tooltip';

function HeaderComponent() {
  // store
  const flipShowSidebar = useStore((store) => store.flipShowSidebar);

  return (
    <div className="header-bg-height bg-cyan-500 flex items-center justify-between">
      <div className='flex items-center pl-4 gap-5'>
        <button onClick={flipShowSidebar}>
          <Reorder style={{fontSize: 35}} />
        </button>
        <Link href={"/"} className=' flex items-center cursor-pointer'>
          <Image src="LF.svg" width="40" height="40" alt='ロゴ' />
          <h1 className={` text-xl ${m_plus_rounded_1c_bold.className}`}>
            Lingo Fill
          </h1> 
        </Link>
      </div>
      <div 
        className=' px-10'
      >
        <Link href={'/acount'}>
          <Tooltip tooltipText="アカウント">
            <AccountCircle style={{fontSize: 35}} />
          </Tooltip>
        </Link>
        
      </div>
    </div>
  )
}

export default HeaderComponent
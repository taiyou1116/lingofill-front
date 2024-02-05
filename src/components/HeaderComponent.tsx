"use client"

import React from 'react'
import { Reorder } from "@mui/icons-material";
import { useStore } from '@/store/store';
import { m_plus_rounded_1c_bold } from '@/store/fontStore';

function HeaderCmponent() {
  const flipShowSidebar = useStore((store) => store.flipShowSidebar);

  return (
    <div className="header-bg-height bg-cyan-500 flex items-center pl-4 gap-4">
      <button onClick={flipShowSidebar}>
        <Reorder style={{fontSize: 35}} />
      </button>
      <h1 className={` text-xl ${m_plus_rounded_1c_bold.className}`}>
        Lingo Fill
      </h1> 
    </div>
  )
}

export default HeaderCmponent
"use client"

import { useStore } from '@/store/store';
import React from 'react'

function ModalCenterComponent() {
  // store
  const showCenterModal = useStore((store) => store.showCenterModal);

  return (
    <div>
      { showCenterModal 
      ? 
        <div className=' fixed inset-0 h-screen w-screen bg-slate-500/50'>
          <h1>テストModal</h1>
        </div>
      : 
        <div></div>
      }
    </div>
  )
}

export default ModalCenterComponent
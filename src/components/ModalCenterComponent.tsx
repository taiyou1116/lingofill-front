"use client"

import { useStore } from '@/store/store';
import React from 'react'
import "../app/globals.css";

function ModalCenterComponent() {
  // store
  const showCenterModal = useStore((store) => store.showCenterModal);
  const flipCenterModal = useStore((store) => store.flipCenterModal);

  // 背景とサイドバーをクリックしたときの処理
  const handleCloseModal = () => flipCenterModal();
  const handleModalClick = (e: any) => e.stopPropagation();

  return (
    <div>
      { showCenterModal 
      ? 
        <div className=' fixed inset-0 h-screen w-screen flex items-center justify-center'>
          <div onClick={handleCloseModal} className=' fixed h-screen w-screen shadow-2lg bg-slate-500/50'></div>
          <div onClick={handleModalClick} className=' fixed h-4/5 w-3/5 bg-white rounded-xl shadow-lg p-5 flex flex-col justify-start items-center gap-10'>
            <div className=' w-full flex justify-center items-center gap-3'>
              <span>Study →</span>
              <input type='text' placeholder='翻訳' className=' border border-stone-900 p-1 rounded-sm w-1/3 modal-center-input'/>
            </div>
            <div className=' w-full h-full flex flex-col gap-1'>
              <div>メモ</div>
              <textarea placeholder='' className=' border p-1 w-full h-2/3 resize-none rounded-sm border-stone-900' />
            </div>
          </div>
        </div>
      : 
        <div></div>
      }
    </div>
  )
}

export default ModalCenterComponent
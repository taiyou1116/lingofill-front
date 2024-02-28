"use client"

import { useStore } from '@/store/store';
import { ReactNode } from 'react'
import "../app/globals.css";
import { handleCloseModal, handleStopPropagation } from '@/utils/modal';

type ModalCenterProps = {
  children: ReactNode,
}

function ModalCenterComponent(props: ModalCenterProps) {
  const { children} = props;

  const { showCenterModal, flipCenterModal } = useStore((store) => ({
    showCenterModal: store.showCenterModal,
    flipCenterModal: store.flipCenterModal,
  }))

  return (
    <div className={` fixed inset-0 flex items-center justify-center ${showCenterModal ? '' : ' pointer-events-none'}`}>
      {/* 背景 */}
      <div 
        onClick={() => handleCloseModal(flipCenterModal)} 
        className={` fixed h-screen w-screen shadow-2lg bg-black/50 transition-opacity duration-300 ${ showCenterModal ? 'opacity-100' : 'opacity-0 pointer-events-none' }`}
      >
      </div>
      {/* ModalWindow */}
      <div 
        onClick={handleStopPropagation} 
        className={` fixed h-4/5 w-5/6  md:w-3/5 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col justify-start items-center gap-10 duration-300 ${ showCenterModal ? ' scale-100' : ' scale-0 pointer-events-none' }`}
      >
        { children }
      </div>
    </div>
  )
}

export default ModalCenterComponent
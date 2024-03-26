
"use client"

import React, { ReactNode } from 'react'
import { GrobalStore } from '@/store/grobalStore';

import "../../../app/globals.css";

type ModalCenterProps = {
  children: ReactNode,
}

function ModalCenterComponent(props: ModalCenterProps) {
  const { children } = props;
  const { showCenterModal, flipCenterModal } = GrobalStore();

  return (
    <div 
      className={` fixed z-10 inset-0 flex items-center justify-center 
                   ${showCenterModal ? '' : ' pointer-events-none'}`}
    >
      {/* 背景 */}
      <div 
        onClick={() => flipCenterModal()} 
        className={` fixed h-screen w-screen shadow-2lg transition-opacity duration-300 
                   bg-black/50 
                   ${ showCenterModal ? 'opacity-100' : 'opacity-0 pointer-events-none' }`}
      >
      </div>
      {/* ModalWindow */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className={` fixed h-5/6 w-full md:h-5/6 md:w-5/6 rounded-xl dark:shadow-black shadow-2xl p-5 
                     flex flex-col justify-start items-center gap-10 duration-300
                   bg-white 
                   dark:bg-gray-800 
                   ${ showCenterModal ? ' scale-100' : ' scale-0 pointer-events-none' }`}
      >
        { children }
      </div>
    </div>
  )
}

export default React.memo(ModalCenterComponent);
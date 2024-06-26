
"use client"

import React, { ReactNode } from 'react'
import "../../../app/globals.css";

type ModalCenterProps = {
  children: ReactNode,
  showCenterModal: boolean,
  closeModal: () => void,
}

function ModalCenterComponent(props: ModalCenterProps) {
  const { children, showCenterModal, closeModal } = props;

  const modalBaseClass = `
    fixed z-10 inset-0 flex items-center justify-center ${showCenterModal ? '' : ' pointer-events-none'}`
    ;

  const modalBgClass = `
    fixed h-screen w-screen shadow-2lg transition-opacity duration-300 
    bg-black/50 ${ showCenterModal ? 'opacity-100' : 'opacity-0 pointer-events-none' }`
    ;

  const modalClass = ` 
    fixed h-5/6 w-full md:h-5/6 md:w-5/6 rounded-xl dark:shadow-black shadow-2xl p-5 
    flex flex-col justify-start items-center gap-10 duration-300 bg-white dark:bg-gray-800 
    ${ showCenterModal ? ' scale-100' : ' scale-0 pointer-events-none' }`
    ;

  return (
    <div className={modalBaseClass}>

      {/* 背景 */}
      <div onClick={closeModal} className={modalBgClass} />
      
      {/* ModalWindow */}
      <div onClick={(e) => e.stopPropagation()} className={modalClass}>
        { children }
      </div>
    </div>
  )
}

export default React.memo(ModalCenterComponent);
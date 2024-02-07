"use client"

import { useStore } from '@/store/store';
import React from 'react'
import "../app/globals.css";

type ModalCenterProps = {
  onSaveTranslation: (index: number, transition: any) => void,
}

function ModalCenterComponent(props: ModalCenterProps) {
  const { onSaveTranslation } = props;

  // store
  const showCenterModal = useStore((store) => store.showCenterModal);
  const flipCenterModal = useStore((store) => store.flipCenterModal);
  const selectedWordIndex = useStore((store) => store.selectedWordIndex);

  // 背景とサイドバーをクリックしたときの処理
  const handleCloseModal = () => flipCenterModal();
  const handleModalClick = (e: any) => e.stopPropagation();

  const handleSave = () => {
    // 選択された単語のインデックスと入力された翻訳をonSaveTranslationを通じて親コンポーネントに渡す
    const translation = "inputから受け取る";
    if (selectedWordIndex === null) return;
    onSaveTranslation(selectedWordIndex, translation);
    handleCloseModal();
  }

  return (
    <div className={` fixed inset-0 flex items-center justify-center ${showCenterModal ? '' : ' pointer-events-none'}`}>
      {/* 背景 */}
      <div 
        onClick={handleCloseModal} 
        className={` fixed h-screen w-screen shadow-2lg bg-black/50 transition-opacity duration-300 ${ showCenterModal ? 'opacity-100' : 'opacity-0 pointer-events-none' }`}
      >
      </div>
      {/* ModalWindow */}
      <div 
        onClick={handleModalClick} 
        className={` fixed h-4/5 w-3/5 bg-white rounded-xl shadow-lg p-5 flex flex-col justify-start items-center gap-10 duration-300 ${ showCenterModal ? ' scale-100' : ' scale-0 pointer-events-none' }`}
      >
        <div className=' w-full'>
          <div>翻訳</div>
          <div className=' w-full flex justify-center items-center gap-3'>
            <span>Study →</span>
            <input type='text' placeholder='日本語' className=' border border-stone-900 p-1 rounded-sm w-1/3 modal-center-input'/>
          </div>
        </div>
        <div className=' w-full h-full flex flex-col gap-1'>
          <div>メモ</div>
          <textarea placeholder='' className=' border p-1 w-full h-2/3 resize-none rounded-sm border-stone-900' />
        </div>
        <button 
          className=' bg-sky-400 px-4 py-2 rounded-md'
          onClick={handleSave}
        >
          保存する
        </button>
      </div>
    </div>
  )
}

export default ModalCenterComponent
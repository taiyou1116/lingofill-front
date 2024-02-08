"use client"

import { useStore } from '@/store/store';
import React, { useState } from 'react'
import "../app/globals.css";
import { SelectedOriginalWord } from '@/types/types';

type ModalCenterProps = {
  // index, 英単語
  selectedWord: SelectedOriginalWord,
  onSaveTranslation: (selectedWord: SelectedOriginalWord, input: string) => void,
}

function ModalCenterComponent(props: ModalCenterProps) {
  const { selectedWord, onSaveTranslation } = props;

  // store
  const showCenterModal = useStore((store) => store.showCenterModal);
  const flipCenterModal = useStore((store) => store.flipCenterModal);

  const [userInput, setUserInput] = useState('');

  // 背景とサイドバーをクリックしたときの処理
  const handleCloseModal = () => flipCenterModal();
  const handleModalClick = (e: any) => e.stopPropagation();

  // 日本語化
  const handleSave = () => {
    onSaveTranslation(selectedWord, userInput);
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
            <span>{selectedWord.text} →</span>
            <input 
              type='text' 
              placeholder='日本語' 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className=' border border-stone-900 p-1 rounded-sm w-1/3 modal-center-input'/>
          </div>
        </div>
        <div className=' w-full h-full flex flex-col gap-1'>
          <div>メモ</div>
          <textarea 
            placeholder='' 
            className=' border p-1 w-full h-2/3 resize-none rounded-sm border-stone-900' />
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
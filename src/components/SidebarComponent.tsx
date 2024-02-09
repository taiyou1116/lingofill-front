"use client"

import { useStore } from '@/store/store';
import { m_plus_rounded_1c } from '@/store/fontStore';
import { EditNote } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { handleCloseModal, handleStopPropagation } from '@/utils/modal';

function SidebarComponent() {
  // store
  const showSidebar = useStore((store) => store.showSidebar);
  const flipShowSidebar = useStore((store) => store.flipShowSidebar);

  const [sentences, setSentences] = useState<string[]>(["あいうえお", "かきくけこ"]);

  // どのSentenceが入力中か判定
  const [inputNameIndex, setInputNameIndex] = useState<number>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 新しいセンテンスが作成されたらインプットにフォーカスを当てる
    if (inputNameIndex === 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputNameIndex, sentences]);

  const createNewSentence = () => {
    setSentences(['', ...sentences]);
    setInputNameIndex(0);
  }

  const openSentence = (index: number) => {
    console.log(sentences[index]);
  }

  return (
    <div>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => handleCloseModal(flipShowSidebar)}>
      </div>
      <div 
        className={`fixed w-1/5 p-5 top-0 left-0 h-full bg-white shadow-2xl transition-transform duration-300 transform ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
        onClick={handleStopPropagation}
      >
        <div className=" break-all flex flex-col items-center gap-3">
          <div className=' flex justify-between w-full p-1'>
            <h1 className={`${m_plus_rounded_1c.className} text-lg`}>テキスト一覧</h1>
            <button 
              onClick={createNewSentence}
              className=' border-2 rounded-lg p-0.5  hover:shadow-lg duration-100'>
              <EditNote style={{fontSize: 30}}/>
            </button>
          </div>
          
          {/* Sentences */}
          { sentences.map((s, index) => {
            return (
              <div 
                key={index} 
                onClick={() => openSentence(index)}
                className=' bg-slate-100 h-full w-full p-3 cursor-pointer hover:shadow-lg duration-100'>
                { inputNameIndex === index
                ?
                <div>
                  <input type='text' ref={inputRef}/>
                </div>
                :
                 s
                }
              </div>
            )
          }) }
        </div>
      </div>
    </div>
  );
}

export default SidebarComponent
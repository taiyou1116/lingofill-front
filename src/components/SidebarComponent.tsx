"use client"

import { useStore } from '@/store/store';
import { m_plus_rounded_1c } from '@/store/fontStore';
import { Autorenew, EditNote } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { handleCloseModal, handleStopPropagation } from '@/utils/modal';
import { Sentences } from '@/types/types';
import { Tooltip } from './Tooltip';

function SidebarComponent() {
  // store
  const showSidebar = useStore((store) => store.showSidebar);
  const flipShowSidebar = useStore((store) => store.flipShowSidebar);
  const setText = useStore((store) => store.setText);

  const [sentences, setSentences] = useState<Sentences[]>([
    {
      title: "english test1",
      text: "In the realm of software development",
    },
    {
      title: "english test2",
      text: "In the realm of software development2",
    }
  ]);

  // どのSentenceが入力中か判定
  const [inputNameIndex, setInputNameIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 新しいセンテンスが作成されたらインプットにフォーカスを当てる
    if (inputNameIndex === 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputNameIndex]);

  const createNewSentence = () => {
    setSentences([{
      title: "",
      text: "",
    } , ...sentences]);
    setInputNameIndex(0);
  }

  const finishEditing = (index: number, value: string) => {
    // sentences配列を更新
    const newSentences = [...sentences];
    newSentences[index].title = value;
    setSentences(newSentences);

    setInputNameIndex(-1);
  };

  const openSentence = (index: number) => {
    setText(sentences[index].text);
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
          <div className=' flex justify-between w-full p-1 items-center'>
            <h1 className={`${m_plus_rounded_1c.className}`}>テキスト一覧</h1>
            {/* <Tooltip tooltipText='テキストの更新'>
              <Autorenew style={{fontSize: 20}}/>
            </Tooltip> */}
            <Tooltip tooltipText='新規作成'>
              <button 
                onClick={createNewSentence}
                className=' border-2 rounded-lg p-0.5  hover:border-slate-600 duration-150'>
                <EditNote style={{fontSize: 30}}/>
              </button>
            </Tooltip>
            
          </div>
          
          {/* Sentences */}
          { sentences.map((sentence, index) => {
            return (
              <div 
                key={index} 
                onClick={() => openSentence(index)}
                className=' bg-slate-100 h-full w-full p-3 cursor-pointer hover:shadow-lg duration-100'>
                { inputNameIndex === index
                ?
                  <div>
                    <input 
                      type='text' 
                      value={sentences[0].title}
                      onChange={(e) => {
                        // 最初の要素を更新し、残りの要素をそのまま配列に含める新しい配列を作成
                        const updatedSentences = [{
                          title: e.target.value,
                          // 元々の値に戻す
                          text: "",
                        }, ...sentences.slice(1)];
                        setSentences(updatedSentences);
                      }}
                      onBlur={() => {
                        finishEditing(index, sentence.title)} // 外側をクリックした時
                      }
                      ref={inputRef}
                      className=' p-1'  
                    />
                  </div>
                :
                  sentence.title
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
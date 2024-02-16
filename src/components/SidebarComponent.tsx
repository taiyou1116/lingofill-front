"use client"

import { useStore } from '@/store/store';
import { m_plus_rounded_1c } from '@/store/fontStore';
import { EditNote } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { handleCloseModal, handleStopPropagation } from '@/utils/modal';
import { Document } from '@/types/types';
import { Tooltip } from './Tooltip';
import { Skeleton, Typography } from '@mui/material';

function SidebarComponent() {
  // store
  const showSidebar = useStore((store) => store.showSidebar);
  const flipShowSidebar = useStore((store) => store.flipShowSidebar);
  const setDocument = useStore((store) => store.setDocument);
  const getDocuments = useStore((store) => store.documents);

  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    setDocuments(getDocuments);
    console.log(getDocuments);
  }, [getDocuments, setDocuments])

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
    setDocuments([{
      title: "",
      text: "",
    } , ...documents]);
    setInputNameIndex(0);
  }

  const finishEditing = (index: number, value: string) => {
    // documents配列を更新
    const newSentences = [...documents];
    newSentences[index].title = value;
    setDocuments(newSentences);

    setInputNameIndex(-1);
  };

  const openSentence = (index: number) => {
    setDocument(documents[index]);
    console.log(documents[index]);
  }

  return (
    <div>
      <div 
        className={`fixed z-10 inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => handleCloseModal(flipShowSidebar)}>
      </div>
      <div 
        className={`fixed z-10 w-1/5 p-5 top-0 left-0 h-full bg-white shadow-2xl transition-transform duration-300 transform ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
        onClick={handleStopPropagation}
      >
        <div className=" break-all flex flex-col items-center gap-3">
          <div className=' flex justify-between w-full p-1 items-center'>
            <h1 className={`${m_plus_rounded_1c.className}`}>テキスト一覧</h1>
            <Tooltip tooltipText='新規作成'>
              <button 
                onClick={createNewSentence}
                className=' border-2 rounded-lg p-0.5  hover:border-slate-600 duration-150'>
                <EditNote style={{fontSize: 30}}/>
              </button>
            </Tooltip> 
          </div>

          {/* コンポーネントを分ける */}
          { documents.length === 0
          ?
            <Typography 
              variant="h3"
              className=' w-full'
            >
              {<Skeleton />}
              {<Skeleton />}
              {<Skeleton />}
            </Typography>
          :
            documents.map((document, index) => {
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
                        value={documents[0].title}
                        onChange={(e) => {
                          // 最初の要素を更新し、残りの要素をそのまま配列に含める新しい配列を作成
                          const updatedDocuments = [{
                            title: e.target.value,
                            // 元々の値に戻す
                            text: "",
                          }, ...documents.slice(1)];
                          setDocuments(updatedDocuments);
                        }}
                        onBlur={() => {
                          finishEditing(index, document.title)} // 外側をクリックした時
                        }
                        ref={inputRef}
                        className=' p-1'  
                      />
                    </div>
                  :
                  document.title
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default SidebarComponent
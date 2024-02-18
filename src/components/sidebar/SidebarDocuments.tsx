import { useStore } from '@/store/store';
import { Document } from '@/types/types'
import { handleStopPropagation } from '@/utils/modal';
import { Delete, ModeEdit } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type Props = {
  documents: Document[]
  inputNameIndex: number,
  setDocuments: Dispatch<SetStateAction<Document[]>>,
  setInputNameIndex: Dispatch<SetStateAction<number>>,
  flipShowSidebar: () => void,
}

// documentは選択中のドキュメントであり、名前編集中のdocumentと一致するとは限らない

function SidebarDocuments(props: Props) {
  const { documents, inputNameIndex, setInputNameIndex, setDocuments, flipShowSidebar } = props;

  const setDocument = useStore((store) => store.setDocument);

  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>('');

  // const [sidebarDocuments, setSidebarDocuments] = useState<Document[]>([]);

  useEffect(() => {
    if (inputNameIndex !== -1 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputNameIndex]);

  const openSentence = (index: number) => {
    // Sidebarを閉じる処理追加
    flipShowSidebar();
    setDocument(documents[index]);
  }

  const finishEditing = (index: number, value: string) => {
    // documents配列を更新
    const newSentences = [...documents];

    if (!value) {
      newSentences[index].title = 'テキスト ' + documents.length;
    } else {
      newSentences[index].title = value;
    }
    setDocuments(newSentences);

    setInputNameIndex(-1);
  };

  const editTitle = (index: number) => {
    setInput(documents[index].title);
    setInputNameIndex(index);
  }

  const deleteText = () => {

  }

  return (
    <div className=' break-all flex flex-col w-full gap-3'>
      { 
        documents.map((document, index) => {
          return (
            <div 
              key={index} 
              onClick={() => openSentence(index)}
              className=' bg-slate-100 h-full w-full p-3 cursor-pointer hover:shadow-lg duration-100'
            >
              { inputNameIndex === index
              ?
                <div>
                  <input className=' p-2'
                    placeholder='テキスト名を入力'
                    type='text' 
                    value={input}
                    defaultValue={documents[index].title}
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                    onBlur={() => {
                      finishEditing(index, input)}
                    }
                    ref={inputRef}
                  />
                </div>
              :
                <div className=' flex justify-between'>
                  { document.title }
                  <div onClick={handleStopPropagation} className=' flex gap-0.5 pl-1'>
                    <Tooltip title='テキスト名を変更'>
                      <button onClick={() => editTitle(index)}>
                        <ModeEdit style={{fontSize: 15}} />
                      </button>
                    </Tooltip>
                    <Tooltip title='テキストを削除'>
                      <button onClick={() => deleteText()}>
                        <Delete style={{fontSize: 15}} color='error' />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default SidebarDocuments
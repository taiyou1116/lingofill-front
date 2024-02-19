import { useStore } from '@/store/store';
import { Document } from '@/types/types'
import { handleStopPropagation } from '@/utils/modal';
import { CloudUpload, Delete, ModeEdit } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type Props = {
  documents: Document[]
  setDocuments: Dispatch<SetStateAction<Document[]>>,
  flipShowSidebar: () => void,
  createNewDocument: boolean,
  setCreateNewDocument: Dispatch<SetStateAction<boolean>>,
}

function SidebarDocuments(props: Props) {
  const { documents, setDocuments, flipShowSidebar, createNewDocument, setCreateNewDocument } = props;

  const setDocument = useStore((store) => store.setDocument);
  const documentPublic = useStore((store) => store.document);

  const [inputNameIndex, setInputNameIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (inputNameIndex !== -1 && inputRef.current) {
      inputRef.current.focus();
    }
    if (createNewDocument && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputNameIndex, createNewDocument]);

  const openSentence = (index: number) => {
    flipShowSidebar();
    setDocument(documents[index]);
  }

  const createNewDocumentBlur = (input: string) => {
    if (input === '') {
      setCreateNewDocument(false);
      return;
    }
    const newDocument: Document = {
      title: input,
      text: '',
      sortKey: Date.now().toString(),
    }
    setDocuments([newDocument, ...documents]);
    setInput('');
    setCreateNewDocument(false);
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
    setInput('');
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
      {/* 新規作成input */}
      { createNewDocument 
      ? 
        <input className=' p-2'
          placeholder='テキスト名を入力'
          type='text' 
          value={input}
          defaultValue=''
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onBlur={() => {
            createNewDocumentBlur(input)}
          }
          ref={inputRef}
        />
      : '' }
      
      { 
        documents.map((document, index) => {
          return (
            <div 
              key={index} 
              onClick={() => openSentence(index)}
              className={`bg-slate-100 h-full w-full p-3 cursor-pointer hover:shadow-lg duration-100 ${ documentPublic === documents[index] ? " border-2 border-slate-700" : ""}`}
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
                    <Tooltip title='保存する'>
                      <button onClick={() => deleteText()}>
                        <CloudUpload style={{fontSize: 15}} />
                      </button>
                    </Tooltip>
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
import { useStore } from '@/store/store';
import { Document } from '@/types/types'
import { handleStopPropagation } from '@/utils/modal';
import { updateText } from '@/utils/request';
import { CloudUpload, Delete, ModeEdit } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type Props = {
  createNewDocument: boolean,
  setCreateNewDocument: Dispatch<SetStateAction<boolean>>,
}

function SidebarDocuments(props: Props) {
  const { createNewDocument, setCreateNewDocument } = props;

  const { setDocument, documentPublic, username, documents, setDocuments, flipShowSidebar } = useStore((store) => ({
    setDocument: store.setDocument,
    documentPublic: store.document,
    username: store.username,
    documents: store.documents,
    setDocuments: store.setDocuments,
    flipShowSidebar: store.flipShowSidebar,
  }));

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
      isSynced: false,
      translations: [],
    }
    setDocuments([newDocument, ...documents]);
    setInput('');
    setCreateNewDocument(false);
  }

  const finishEditing = (index: number, value: string) => {
    // documents配列を更新
    const newSentences = [...documents];

    setInput('');
    setInputNameIndex(-1);

    if (newSentences[index].title === value) {

      return;
    } 
    newSentences[index].title = value;
    newSentences[index].isSynced = false;
    setDocuments(newSentences);
  };

  const editTitle = (index: number) => {
    setInput(documents[index].title);
    setInputNameIndex(index);
  }

  const uploadDocument = async (index: number) => {
    await updateText(username, documents[index].sortKey, documents[index].title, documents[index].text, documents[index].translations);
    const documentsLocal = [...documents];
    documentsLocal[index].isSynced = true;
    setDocuments(documentsLocal);
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
              className={`bg-slate-100 h-full w-full p-3 cursor-pointer hover:shadow-lg duration-100 ${ documentPublic?.sortKey === documents[index].sortKey ? " border-2 border-slate-700" : ""}`}
            >
              { inputNameIndex === index
              ?
                <div>
                  <input className=' p-2'
                    placeholder='テキスト名を入力'
                    type='text' 
                    value={input}
                    defaultValue={document.title}
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
                    { document.isSynced ? '' : 
                      <Tooltip title='変更を保存する'>
                        <button onClick={() => uploadDocument(index)}>
                          <CloudUpload style={{fontSize: 15}} />
                        </button>
                      </Tooltip>
                    }
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
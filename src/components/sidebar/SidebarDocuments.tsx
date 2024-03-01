import { useStore } from '@/store/store';
import { Document } from '@/types/types'
import { handleStopPropagation } from '@/utils/modal';
import { createDate, deleteText, getText, updateText } from '@/utils/request';
import { CloudUpload, Delete, ModeEdit } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React, { Dispatch, SetStateAction, memo, useEffect, useRef, useState } from 'react'

const MemoizedDocumentComponent = memo(SidebarDocuments);

type Prop = {
  createNewDocument: boolean,
  setCreateNewDocument: Dispatch<SetStateAction<boolean>>,
}

function SidebarDocumentsMemo(props: Prop) {
  const { createNewDocument, setCreateNewDocument } = props;
  const {setDocument, documentPublic, username, documents, setDocuments, flipShowSidebar, setIsLoading } = useStore((store) => ({
    setDocument:     store.setDocument,
    documentPublic:  store.document,
    username:        store.username,
    documents:       store.documents,
    setDocuments:    store.setDocuments,
    flipShowSidebar: store.flipShowSidebar,
    setIsLoading:    store.setIsLoading,
  }));

  return (
    <div>
      <MemoizedDocumentComponent 
        createNewDocument={createNewDocument}
        setCreateNewDocument={setCreateNewDocument}
        setDocument={setDocument}
        documentPublic={documentPublic}
        username={username}
        documents={documents}
        setDocuments={setDocuments}
        flipShowSidebar={flipShowSidebar}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export default SidebarDocumentsMemo;

type Props = {
  createNewDocument: boolean,
  setCreateNewDocument: Dispatch<SetStateAction<boolean>>,
  setDocument:     (document: Document | null) => void,
  documentPublic:  Document | null,
  username:        string,
  documents:       Document[],
  setDocuments:    (documents: Document[]) => void,
  flipShowSidebar: () => void,
  setIsLoading:    (state: boolean) => void,
}

function SidebarDocuments(props: Props) {
  const { createNewDocument, setCreateNewDocument, setDocument, documentPublic, username, documents, setDocuments, flipShowSidebar, setIsLoading } = props;

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


  // 新規作成時はサーバーから取得しない。
  const openSentence = async (index: number) => {
    flipShowSidebar();
    // 1回目だけサーバーから取得 -> textがないとき
    if (documents[index].text !== '' || documents[index].isNew === true) {
      setIsLoading(false);
      setDocument(documents[index]);
      return;
    }
    setIsLoading(true);

    try {
      const data = await getText(username, documents[index].sortKey);
      setIsLoading(false);
      const updateDocuments = documents.map((document) => {
        if (document.sortKey === data.sortKey) {
          return {
            ...document,
            text: data.text,
            translations: data.translations,
          }
        }
        return document;
      })
      setDocuments(updateDocuments);
      setDocument(updateDocuments[index]);

    } catch(error) {
      console.log(error);
    }
  }

  const createNewDocumentBlur = (input: string) => {
    if (input === '') {
      setCreateNewDocument(false);
      return;
    }
    const now = Date.now().toString();
    const newDocument: Document = {
      title: input,
      text: '',
      sortKey: now,
      isSynced: false,
      isNew: true,
      isDelete: false,
      translations: [],
      updatedAt: now,
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
    try {
      const now = Date.now().toString();
      await updateText(username, documents[index].sortKey, documents[index].title, documents[index].text, documents[index].translations, now);
      const documentsLocal = [...documents];
      documentsLocal[index].isSynced = true;
      documentsLocal[index].updatedAt = now;
      
      documentsLocal.sort((a, b) => parseInt(b.updatedAt) - parseInt(a.updatedAt));
      setDocuments(documentsLocal);
    } catch(error) {
      console.error(error);
    }
  }

  const deleteTextButton = async (index: number) => {
    try {
      await deleteText(username, documents[index].sortKey);
      const filterDoc = documents.filter((doc) => doc !== documents[index]);
      if (documents[index] === documentPublic) {
        setDocument(null);
      }
      setDocuments(filterDoc);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div className=' break-all flex flex-col w-full overflow-y-auto' style={{ maxHeight: '90vh', overflowY: 'auto' }}>
      {/* 新規作成input */}
      { createNewDocument 
      ? 
        <input className=' p-2'
          placeholder='新規テキスト名を入力'
          type='text' 
          value={input}
          // defaultValue=''
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
              className={`border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:hover:bg-gray-900 border-b-2 h-full w-full py-4 px-2 cursor-pointer duration-100 ${ documentPublic?.sortKey === documents[index].sortKey ? " border-2 border-gray-900 dark:border-gray-500" : ""}`}
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
                  <div className=' flex flex-col gap-0.5'>
                    <div className=' dark:text-gray-100'>
                      { document.title }
                    </div>
                    <div className=' text-xs text-slate-500'>
                      { createDate(document.updatedAt) }
                    </div>
                  </div>
                  
                  <div onClick={handleStopPropagation} className=' flex gap-0.5 pl-1'>
                    { document.isSynced ? '' : 
                      <Tooltip title='変更を保存する'>
                        <button onClick={() => uploadDocument(index)}>
                          <CloudUpload style={{fontSize: 15}} className=' dark:text-gray-100' />
                        </button>
                      </Tooltip>
                    }
                    <Tooltip title='テキスト名を変更'>
                      <button onClick={() => editTitle(index)}>
                        <ModeEdit style={{fontSize: 15}} className=' dark:text-gray-100' />
                      </button>
                    </Tooltip>
                    <Tooltip title='テキストを削除'>
                      <button onClick={() => deleteTextButton(index)}>
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
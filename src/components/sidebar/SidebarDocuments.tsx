import { useStore } from '@/store/store';
import { Document } from '@/types/types'
import { handleStopPropagation } from '@/utils/modal';
import { createDate, getText } from '@/utils/request';
import React, { Dispatch, SetStateAction, memo, useEffect, useRef, useState } from 'react'
import CreateNewDocument from './sidebarDocument/CreateNewDocument';
import UploadDocumentButton from './sidebarDocument/UploadDocumentButton';
import EditTitle from './sidebarDocument/EditTitle';
import DeleteTextButton from './sidebarDocument/DeleteTextButton';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
            language: data.language,
            translateLanguage: data.translateLanguage,
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

  return (
    <div className=' break-all flex flex-col w-full overflow-y-auto' style={{ maxHeight: '90vh', overflowY: 'auto' }}>
      {/* 新規作成input */}
      { createNewDocument 
      ? 
        <CreateNewDocument 
          input={input}
          setInput={setInput}
          setCreateNewDocument={setCreateNewDocument}
          documents={documents}
          setDocuments={setDocuments}
          inputRef={inputRef}
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
                    placeholder={t('sidebarDocument.inputTextName')}
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
                      <UploadDocumentButton 
                        username={username}
                        documents={documents}
                        setDocuments={setDocuments}
                        index={index}
                      />
                    }
                    <EditTitle 
                      setInput={setInput}
                      setInputNameIndex={setInputNameIndex}
                      documents={documents}
                      index={index}
                    />
                    <DeleteTextButton 
                      username={username}
                      documentPublic={document}
                      setDocument={setDocument}
                      documents={documents}
                      setDocuments={setDocuments}
                      index={index}
                    />
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
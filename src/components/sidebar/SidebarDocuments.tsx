
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { GrobalStore } from '@/store/grobalStore';
import { useThemeMode } from '@/hooks/hooks';
import { handleStopPropagation } from '@/utils/modal';
import { getText } from '@/utils/request';
import { createDate } from '@/utils/helper';
import CreateNewDocument from './sidebarDocument/CreateNewDocument';
import UploadDocumentButton from './sidebarDocument/UploadDocumentButton';
import EditTitle from './sidebarDocument/EditTitle';
import DeleteTextButton from './sidebarDocument/DeleteTextButton';
import { Document } from '@/types/types'
import { Menu, MenuItem, ThemeProvider, Tooltip } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';


type Props = {
  createNewDocument: boolean,
  setCreateNewDocument: Dispatch<SetStateAction<boolean>>,
  documents:       Document[],
  flipShowSidebar: () => void,
}

function SidebarDocuments(props: Props) {
  const { createNewDocument, setCreateNewDocument, documents, flipShowSidebar } = props;
  const { username, setIsLoading, setDocument, setDocuments, document } = GrobalStore();
  const { t } = useTranslation();
  const theme = useThemeMode();

  const [inputNameIndex, setInputNameIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState<null | number>(null);

  const handleClick = (event: any, index: number) => {
    setAnchorEl(event.currentTarget);
    setActiveMenuIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveMenuIndex(null);
  };

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

      { documents.length === 0 &&
        <div className=' p-3 dark:text-gray-300'>
          新規作成からテキストを作成する。
        </div> 
      }       

      {/* 新規作成input */}
      { createNewDocument &&
        <CreateNewDocument 
          input={input}
          setInput={setInput}
          setCreateNewDocument={setCreateNewDocument}
          documents={documents}
          setDocuments={setDocuments}
          inputRef={inputRef}
        />
      }

      { 
        documents.map((localDoc, index) => {
          return (
            <div 
              key={index} 
              onClick={() => openSentence(index)}
              className={`border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:hover:bg-gray-900 border-b-2 h-full w-full py-4 px-2 cursor-pointer duration-100 ${ document?.sortKey === documents[index].sortKey ? " border-2 border-gray-900 dark:border-gray-500" : ""}`}
            >
              { inputNameIndex === index
              ?
                <div>
                  <input 
                    maxLength={100}
                    className=' p-2'
                    placeholder={t('sidebarDocument.inputTextName')}
                    type='text' 
                    defaultValue={localDoc.title}
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
                      { localDoc.title }
                    </div>
                    <div className=' text-xs text-slate-500'>
                      { createDate(localDoc.updatedAt) }
                    </div>
                  </div>
                  
                  <div onClick={handleStopPropagation} className=' flex gap-1 pl-1 items-center'>
                    { localDoc.isSynced ? '' : 
                      <UploadDocumentButton 
                        username={username}
                        documents={documents}
                        setDocuments={setDocuments}
                        index={index}
                      />
                    }

                    <div className=' flex items-center gap-1'>
                      <div onClick={(event) => handleClick(event, index)} className=" cursor-pointer">
                        <Tooltip title={t('sidebarDocument.more')}>
                          <MoreHoriz style={{fontSize: 25}} className=" dark:text-gray-200" />
                        </Tooltip>
                      </div>
                    </div>
                    <ThemeProvider theme={theme}>
                      <Menu
                        autoFocus={false}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && activeMenuIndex !== null}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        <MenuItem className=" flex items-center gap-1">
                          <EditTitle 
                            setInput={setInput}
                            setInputNameIndex={setInputNameIndex}
                            documents={documents}
                            index={activeMenuIndex!}
                            handleClose={handleClose}
                          />
                        </MenuItem>
                        <MenuItem className=" flex items-center gap-1">
                          <DeleteTextButton 
                            username={username}
                            document={document!}
                            setDocument={setDocument}
                            documents={documents}
                            setDocuments={setDocuments}
                            index={activeMenuIndex!}
                            handleClose={handleClose}
                          />
                        </MenuItem>
                      </Menu>
                      </ThemeProvider>
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

export default React.memo(SidebarDocuments);
"use client"

import { useStore } from '@/store/store';
import { m_plus_rounded_1c } from '@/store/fontStore';
import { EditNote, FolderDelete } from '@mui/icons-material';
import { memo, useState } from 'react';
import { handleCloseModal, handleStopPropagation } from '@/utils/modal';
import { Skeleton, Tooltip, Typography } from '@mui/material';
import { Document } from '@/types/types';
import SidebarDocumentsMemo from './SidebarDocuments';

const MemoizedDocumentComponent = memo(SidebarComponent);

function SidebarMemo() {
  const { showSidebar, flipShowSidebar, documents } = useStore((store) => ({
    showSidebar:     store.showSidebar,
    flipShowSidebar: store.flipShowSidebar,
    documents:       store.documents,
  }));

  return (
    <div>
      <MemoizedDocumentComponent 
        documents={documents}
        flipShowSidebar={flipShowSidebar}
        showSidebar={showSidebar}
      />
    </div>
  );
}

export default SidebarMemo;

type Props = {
  showSidebar: boolean,
  flipShowSidebar: () => void,
  documents: Document[]
}

function SidebarComponent(props: Props) {
  const { showSidebar, flipShowSidebar, documents } = props;

  const [createNewDocument, setCreateNewDocument] = useState<boolean>(false);

  // documentの作成ではなく、inputのみ作成 -> titleが付けられた時点でdocumentsに格納
  const createNewSentence = () => {
    setCreateNewDocument(true);
  }

  return (
    <div>
      <div 
        className={`fixed z-10 inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => handleCloseModal(flipShowSidebar)}>
      </div>
      <div 
        className={`fixed z-10 w-full md:w-1/3 lg:w-1/5 top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-2xl transition-transform duration-300 transform ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
        onClick={handleStopPropagation}
      >
        <div className="flex flex-col gap-3">
          <div className=' flex justify-between w-full p-5 items-center'>
            <h1 className={`dark:text-gray-300 ${m_plus_rounded_1c.className}`}>テキスト一覧</h1>
            <div className=' flex gap-1 items-center'>
              <Tooltip 
                title='削除したテキスト' 
                className=' dark:text-gray-300'>
                <button 
                  className=' rounded-lg p-0.5 duration-150'>
                  <FolderDelete style={{fontSize: 25}}/>
                </button>
              </Tooltip> 
              <Tooltip 
                title='テキスト新規作成' 
                className=' dark:text-gray-300'>
                <button 
                  onClick={createNewSentence}
                  className=' border-2 rounded-lg p-0.5 dark:border-gray-400  hover:border-slate-600 duration-150'>
                  <EditNote style={{fontSize: 25}}/>
                </button>
              </Tooltip> 
            </div>
          </div>

          { documents.length === 0
          ?
            <Typography 
              variant="h3"
              className=' w-full'
            >
              {<Skeleton />}
              {<Skeleton />}
              {<Skeleton />}
              {<Skeleton />}
              {<Skeleton />}
            </Typography>
          :
            <SidebarDocumentsMemo 
              createNewDocument={createNewDocument}
              setCreateNewDocument={setCreateNewDocument}
            />
          }
        </div>
      </div>
    </div>
  );
}
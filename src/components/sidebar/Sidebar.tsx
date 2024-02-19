"use client"

import { useStore } from '@/store/store';
import { m_plus_rounded_1c } from '@/store/fontStore';
import { EditNote } from '@mui/icons-material';
import { useState } from 'react';
import { handleCloseModal, handleStopPropagation } from '@/utils/modal';
// import { Tooltip } from '../Tooltip';
import { Skeleton, Tooltip, Typography } from '@mui/material';
import SidebarDocuments from './SidebarDocuments';

function SidebarComponent() {
  // store
  const showSidebar = useStore((store) => store.showSidebar);
  const flipShowSidebar = useStore((store) => store.flipShowSidebar);
  const documents = useStore((store) => store.documents);
  const setDocuments = useStore((store) => store.setDocuments);

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
        className={`fixed z-10 w-1/5 p-5 top-0 left-0 h-full bg-white shadow-2xl transition-transform duration-300 transform ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
        onClick={handleStopPropagation}
      >
        <div className="flex flex-col gap-3">
          <div className=' flex justify-between w-full p-1 items-center'>
            <h1 className={`${m_plus_rounded_1c.className}`}>テキスト一覧</h1>
            <Tooltip title='新規作成'>
              <button 
                onClick={createNewSentence}
                className=' border-2 rounded-lg p-0.5  hover:border-slate-600 duration-150'>
                <EditNote style={{fontSize: 30}}/>
              </button>
            </Tooltip> 
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
            <SidebarDocuments 
              documents={documents}
              setDocuments={setDocuments}
              flipShowSidebar={flipShowSidebar}
              createNewDocument={createNewDocument}
              setCreateNewDocument={setCreateNewDocument}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default SidebarComponent
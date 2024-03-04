"use client"

import { m_plus_rounded_1c } from '@/store/fontStore';
import { EditNote, FolderDelete } from '@mui/icons-material';
import React, { useState } from 'react';
import { handleCloseModal, handleStopPropagation } from '@/utils/modal';
import { Skeleton, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GrobaltStore } from '@/store/grobalStore';
import SidebarDocuments from './SidebarDocuments';

function SidebarComponent() {
  const { showSidebar, flipShowSidebar, documents } = GrobaltStore();
  const { t } = useTranslation();

  const [createNewDocument, setCreateNewDocument] = useState<boolean>(false);

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
            <h1 className={`dark:text-gray-300 ${m_plus_rounded_1c.className}`}>{t('sidebar.textList')}</h1>
            <div className=' flex gap-1 items-center'>
              <Tooltip 
                title={t('sidebar.deleteText')}
                className=' dark:text-gray-300'>
                <button 
                  className=' rounded-lg p-0.5 duration-150'>
                  <FolderDelete style={{fontSize: 25}}/>
                </button>
              </Tooltip> 
              <Tooltip 
                title={t('sidebar.createNewText')}
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
            <SidebarDocuments
              createNewDocument={createNewDocument}
              setCreateNewDocument={setCreateNewDocument}
              documents={documents}
              flipShowSidebar={flipShowSidebar}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default React.memo(SidebarComponent);
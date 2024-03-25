"use client"

import React, { useEffect, useState } from 'react';
import { GrobalStore } from '@/store/grobalStore';
import SidebarDocuments from './SidebarDocuments';
import { getCurrentUser } from 'aws-amplify/auth';
import { getTitles } from '@/utils/request';
import { handleCloseModal, handleStopPropagation } from '@/utils/modal';
import { Skeleton, Typography } from '@mui/material';
import CreateNewDocumentButton from './siderbarParent/CreateNewDocumentButton';

function SidebarComponent() {
  const { showSidebar, flipShowSidebar, documents, setDocuments, username, setUsername } = GrobalStore(); 

  const [createNewDocument, setCreateNewDocument] = useState<boolean>(false);
  const [documentLoading, setDocumentLoading] = useState<boolean>(false);

  // documentsはsidebarで受け取るように変更
  useEffect(() => {
    const fetchData = async () => {
      if (username === '') {
        const user = await getCurrentUser();
        setUsername(user.username);
      } else {
        // ここで状態変数を使う
        setDocumentLoading(true);
        const data = await getTitles(username);
        setDocumentLoading(false);
        setDocuments(data);
      }
    };
    fetchData();
  }, [setDocuments, username, setUsername])

  return (
    <div>
      <div 
        className={`fixed z-20 inset-0 
                  bg-black bg-opacity-50 transition-opacity duration-300 
                  ${showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => handleCloseModal(flipShowSidebar)}>
      </div>
      <div 
        className={`fixed z-20 w-2/3 md:w-1/3 lg:w-1/5 top-0 left-0 h-full 
                  bg-white dark:bg-gray-800 
                    transition-transform duration-300 transform 
                  ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
        onClick={handleStopPropagation}
      >
        <div className="flex flex-col gap-3">
          <CreateNewDocumentButton 
            setCreateNewDocument={setCreateNewDocument}
          />

          { documentLoading 
          ?
            <Typography variant="h3" className='px-3'>
              { Array.from(new Array(5)).map((_, index) => (
                <Skeleton key={index} animation="wave" />
              )) }
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
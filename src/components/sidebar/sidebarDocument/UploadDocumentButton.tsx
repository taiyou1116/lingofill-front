
import React from 'react'
import { useTranslation } from 'react-i18next'
import { updateText } from '@/utils/request'

import { CloudUpload } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { Document } from '@/types/types'

type Props = {
  documents: Document[],
  setDocuments: (documents: Document[]) => void,
  username: string,
  index: number,
}

function UploadDocumentButton(props: Props) {
  const { username, documents, setDocuments, index } = props;
  const { t } = useTranslation();
  
  const uploadDocument = async (index: number) => {
    try {
      const now = Date.now().toString();
      await updateText(
        username, 
        documents[index].sortKey, 
        documents[index].title, 
        documents[index].text, 
        documents[index].translations, 
        documents[index].language, 
        documents[index].translateLanguage, 
        now
      );
      const documentsLocal = [...documents];
      documentsLocal[index].isSynced = true;
      documentsLocal[index].updatedAt = now;
      
      documentsLocal.sort((a, b) => parseInt(b.updatedAt) - parseInt(a.updatedAt));
      setDocuments(documentsLocal);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <Tooltip title={t('sidebarDocument.uploadDocumentButton.uploadDocument')}>
      <button onClick={() => uploadDocument(index)}>
        <CloudUpload style={{fontSize: 20}} className=' text-lime-400 dark:text-lime-600' />
      </button>
    </Tooltip>
  )
}

export default React.memo(UploadDocumentButton);
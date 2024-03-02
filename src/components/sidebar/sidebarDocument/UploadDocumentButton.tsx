import { Document } from '@/types/types'
import { updateText } from '@/utils/request'
import { CloudUpload } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'

type Props = {
  username: string,
  documents: Document[],
  setDocuments: (documents: Document[]) => void,
  index: number,
}

function UploadDocumentButton(props: Props) {
  const { username, documents, setDocuments, index } = props;
  const uploadDocument = async (index: number) => {
    try {
      const now = Date.now().toString();
      await updateText(username, documents[index].sortKey, documents[index].title, documents[index].text, documents[index].translations, documents[index].language, documents[index].translateLanguage, now);
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
    <Tooltip title='変更を保存する'>
      <button onClick={() => uploadDocument(index)}>
        <CloudUpload style={{fontSize: 15}} className=' dark:text-gray-100' />
      </button>
    </Tooltip>
  )
}

export default UploadDocumentButton
import { Document } from '@/types/types'
import { deleteText } from '@/utils/request'
import { Delete } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  username: string,
  documents: Document[],
  setDocument: (document: Document | null) => void,
  setDocuments: (documents: Document[]) => void,
  index: number,
  documentPublic: Document,
}

function DeleteTextButton(props: Props) {
  const { username, documents, setDocument,setDocuments, index, documentPublic } = props;
  const { t } = useTranslation();
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
    <Tooltip title={t('sidebarDocument.deleteTextButton.deleteText')}>
      <button onClick={() => deleteTextButton(index)}>
        <Delete style={{fontSize: 15}} color='error' />
      </button>
    </Tooltip>
  )
}

export default DeleteTextButton
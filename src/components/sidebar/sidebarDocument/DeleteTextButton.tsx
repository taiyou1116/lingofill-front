import { Document } from '@/types/types'
import { deleteText } from '@/utils/request'
import { Delete } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  document: Document,
  setDocument: (document: Document | null) => void,
  documents: Document[],
  setDocuments: (documents: Document[]) => void,
  username: string,
  index: number,
}

function DeleteTextButton(props: Props) {
  const { username, documents, setDocument,setDocuments, index, document } = props;
  const { t } = useTranslation();
  const deleteTextButton = async (index: number) => {
    try {
      await deleteText(username, documents[index].sortKey);
      const filterDoc = documents.filter((doc) => doc !== documents[index]);
      if (documents[index] === document) {
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

export default React.memo(DeleteTextButton);
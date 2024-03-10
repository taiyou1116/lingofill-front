import { Document } from '@/types/types'
import { deleteText } from '@/utils/request'
import { Delete } from '@mui/icons-material'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  document: Document,
  setDocument: (document: Document | null) => void,
  documents: Document[],
  setDocuments: (documents: Document[]) => void,
  username: string,
  index: number,
  handleClose: () => void,
}

function DeleteTextButton(props: Props) {
  const { username, documents, setDocument,setDocuments, index, document, handleClose } = props;
  const { t } = useTranslation();
  const deleteTextButton = async (index: number) => {
    try {
      await deleteText(username, documents[index].sortKey);
      const filterDoc = documents.filter((doc) => doc !== documents[index]);
      if (documents[index] === document) {
        setDocument(null);
      }
      handleClose();
      setDocuments(filterDoc);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <button onClick={() => deleteTextButton(index)} className=' flex items-center gap-3 text-red-500'>
      <Delete style={{fontSize: 15}} color='error' />
      {t('sidebarDocument.deleteTextButton.deleteText')}
    </button>
  )
}

export default React.memo(DeleteTextButton);
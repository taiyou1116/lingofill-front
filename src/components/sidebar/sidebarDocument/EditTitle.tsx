import { Document } from '@/types/types'
import { ModeEdit } from '@mui/icons-material'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  documents: Document[],
  setInput: (value: React.SetStateAction<string>) => void,
  setInputNameIndex: (value: React.SetStateAction<number>) => void,
  index: number,
  handleClose: () => void,
}

function EditTitle(props: Props) {
  const { setInput, setInputNameIndex, documents, index, handleClose } = props;
  const { t } = useTranslation();

  const editTitle = (index: number) => {
    handleClose();
    setInput(documents[index].title);
    setInputNameIndex(index);
  }

  return (
    <button onClick={() => editTitle(index)}  className='flex items-center gap-3'>
      <ModeEdit style={{fontSize: 15}} />
      {t('sidebarDocument.editTitle.editTitle')}
    </button>
  )
}

export default React.memo(EditTitle);
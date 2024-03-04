import { Document } from '@/types/types'
import { ModeEdit } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  documents: Document[],
  setInput: (value: React.SetStateAction<string>) => void,
  setInputNameIndex: (value: React.SetStateAction<number>) => void,
  index: number,
}

function EditTitle(props: Props) {
  const { setInput, setInputNameIndex, documents, index  } = props;
  const { t } = useTranslation();
  const editTitle = (index: number) => {
    setInput(documents[index].title);
    setInputNameIndex(index);
  }

  return (
    <Tooltip title={t('sidebarDocument.editTitle.editTitle')}>
      <button onClick={() => editTitle(index)}>
        <ModeEdit style={{fontSize: 15}} className=' dark:text-gray-100' />
      </button>
    </Tooltip>
  )
}

export default React.memo(EditTitle);
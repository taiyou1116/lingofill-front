import { Document } from '@/types/types'
import { ModeEdit } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'

type Props = {
  setInput: (value: React.SetStateAction<string>) => void,
  setInputNameIndex: (value: React.SetStateAction<number>) => void,
  documents: Document[],
  index: number,
}

function EditTitle(props: Props) {
  const { setInput, setInputNameIndex, documents, index  } = props;
  const editTitle = (index: number) => {
    setInput(documents[index].title);
    setInputNameIndex(index);
  }

  return (
    <Tooltip title='テキスト名を変更'>
      <button onClick={() => editTitle(index)}>
        <ModeEdit style={{fontSize: 15}} className=' dark:text-gray-100' />
      </button>
    </Tooltip>
  )
}

export default EditTitle
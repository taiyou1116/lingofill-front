import { ContentPaste, StarBorder } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'

type Props = {
  selectedWords: string,
  translatedWords: string,
  userInputTranslation: string,
  setUserInputTranslation: React.Dispatch<React.SetStateAction<string>>,
}

function InputBlock(props: Props) {
  const { selectedWords, translatedWords, userInputTranslation, setUserInputTranslation } = props;
  return (
    <div className=' flex w-full gap-3 justify-center items-center'>
      <input 
        type='text' 
        placeholder='ブロックの表示' 
        value={userInputTranslation}
        onChange={(e) => setUserInputTranslation(e.target.value)}
        className=' border border-gray-900 p-1 w-1/3 modal-center-input rounded-md dark:bg-gray-800 dark:border-gray-400 dark:text-gray-100'
      />
      <button onClick={() => setUserInputTranslation(selectedWords)} className=' flex items-center text-xs bg-gray-800 text-gray-300 dark:bg-gray-200 rounded-md px-1 py-1 dark:text-gray-800'>
        <ContentPaste style={{fontSize: 20}} />原文
      </button>
      <button onClick={() => setUserInputTranslation(translatedWords)}  className=' flex items-center text-xs bg-gray-800 text-gray-300 dark:bg-gray-200 rounded-md px-1 py-1 dark:text-gray-800'>
        <ContentPaste style={{fontSize: 20}} />翻訳
      </button>
      <Tooltip title='お気に入り登録'>
        <StarBorder className=' cursor-pointer'/>
      </Tooltip>
    </div>
  )
}

export default InputBlock
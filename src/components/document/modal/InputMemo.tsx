import { ContentPaste } from '@mui/icons-material'
import React from 'react'

type Props = {
  selectedWords: string,
  translatedWords: string,
  userInputMemo: string,
  setUserInputMemo: React.Dispatch<React.SetStateAction<string>>,
}

function InputMemo(props: Props) {
  const { selectedWords, translatedWords, userInputMemo, setUserInputMemo } = props;
  return (
    <div className=' w-full h-full flex flex-col gap-1'>
      <div className=' flex gap-1 items-center'>
        <button onClick={() => setUserInputMemo(selectedWords)} className=' flex items-center text-xs bg-gray-800 text-gray-300 dark:bg-gray-200 rounded-md px-1 py-1 dark:text-gray-800'>
          <ContentPaste style={{fontSize: 20}} />原文をメモに
        </button>
        <button onClick={() => setUserInputMemo(translatedWords)}  className=' flex items-center text-xs bg-gray-800 text-gray-300 dark:bg-gray-200 rounded-md px-1 py-1 dark:text-gray-800'>
          <ContentPaste style={{fontSize: 20}} />翻訳をメモに
        </button>
      </div>
      <textarea 
        placeholder='メモをここに入力（例：文脈、用法、訳文など）'
        className=' border p-1 h-full w-full resize-none rounded-md border-stone-900 dark:bg-gray-800 dark:border-gray-400 dark:text-gray-100' 
        value={userInputMemo}
        onChange={(e) => setUserInputMemo(e.target.value)}
      />
    </div>
  )
}

export default InputMemo
import React from 'react'
import PasteButton from './PasteButton';
import { generateMemoFromGPT4 } from '@/utils/request';

type Props = {
  userInputMemo: string,
  setUserInputMemo: React.Dispatch<React.SetStateAction<string>>,
  selectedWords: string,
  ln: string | undefined,
}

function InputMemo(props: Props) {
  const { userInputMemo, setUserInputMemo, selectedWords, ln } = props;

  return (
    <div className=' w-full h-full flex flex-col gap-1'>
      <PasteButton 
        setUserInput={setUserInputMemo}
        plceholder='document.modal.inputMemo.inputMemo'
      />
      <button onClick={() => generateMemoFromGPT4(selectedWords, ln!)}>GPT</button>
      <textarea 
        maxLength={1000}
        className=' border p-1 h-full w-full resize-none rounded-md 
                  border-stone-900 
                  dark:bg-gray-800 
                  dark:border-gray-400 
                  dark:text-gray-100' 
        value={userInputMemo}
        onChange={(e) => setUserInputMemo(e.target.value)}
      />
    </div>
  )
}

export default React.memo(InputMemo);
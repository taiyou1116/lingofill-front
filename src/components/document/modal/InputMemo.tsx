import React from 'react'
import PasteButton from './PasteButton';
import { generateMemoFromGPT4 } from '@/utils/request';
import { AutoAwesome } from '@mui/icons-material';

type Props = {
  userInputMemo: string,
  setUserInputMemo: React.Dispatch<React.SetStateAction<string>>,
  selectedWords: string,
  ln: string | undefined,
}

function InputMemo(props: Props) {
  const { userInputMemo, setUserInputMemo, selectedWords, ln } = props;

  const generateMemo = async () => {
    const text = await generateMemoFromGPT4(selectedWords, ln!);
    setUserInputMemo(text);
  }

  return (
    <div className=' w-full h-full flex flex-col gap-1'>
      <div className=' flex gap-3'>
        <PasteButton 
          setUserInput={setUserInputMemo}
          plceholder='document.modal.inputMemo.inputMemo'
        />
        <button 
          onClick={generateMemo} 
          className=' bg-gray-600 py-1 px-2 text-sm flex gap-1 rounded-md border-gray-400 border hover:bg-gray-900'
        >
          <AutoAwesome style={{ fontSize: 20 }} />AIで生成
        </button>
      </div>
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
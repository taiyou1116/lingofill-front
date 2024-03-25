import React, { useState } from 'react'
import PasteButton from './PasteButton';
import { generateMemoFromGPT4 } from '@/utils/request';
import { AutoAwesome } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  userInputMemo: string,
  setUserInputMemo: React.Dispatch<React.SetStateAction<string>>,
  selectedWords: string,
  ln: string | undefined,
}

function InputMemo(props: Props) {
  const { userInputMemo, setUserInputMemo, selectedWords, ln } = props;
  const [ isGeneratingAIResponse, setIsGeneratingAIResponse ] = useState<boolean>(false);
  const { t } = useTranslation();

  const generateMemo = async () => {
    setIsGeneratingAIResponse(true);
    const text: string = await generateMemoFromGPT4(selectedWords, ln!);
    setIsGeneratingAIResponse(false);
    setUserInputMemo(text);
  }

  return (
    <div className=' w-full h-full flex flex-col gap-1'>
      <div className=' flex md:flex-row flex-col gap-3'>
        <PasteButton 
          setUserInput={setUserInputMemo}
        />
        { isGeneratingAIResponse
        ?
          <div className='flex items-center gap-1 p-1'>
            {t('document.modal.inputMemo.generatingAI')}<CircularProgress size={20} />
          </div>
        :
          <button 
            onClick={generateMemo} 
            className=' dark:bg-gray-600 py-1 px-2 text-sm flex gap-1 rounded-md border-gray-400 border hover:bg-gray-300 dark:hover:bg-gray-900'
          >
            <AutoAwesome style={{ fontSize: 20 }} />{t('document.modal.inputMemo.generateAI')}
          </button>
        }
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
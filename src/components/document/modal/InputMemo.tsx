
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { generateMemoFromGPT4 } from '@/utils/request';

import Button from '@/components/ui/Button';
import PasteButton from './PasteButton';

import { AutoAwesome } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

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
    try {
      const text: string = await generateMemoFromGPT4(selectedWords, ln!);
      setUserInputMemo(text);
    } catch (error) {
      console.error('Failed to generate memo: ', error);
    } finally {
      setIsGeneratingAIResponse(false);
    }
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
          <Button 
            onClick={generateMemo}
            baseUI='py-1 px-2 text-sm flex gap-1 rounded-md border'
            light='border-gray-400 hover:bg-gray-300'
            dark='dark:text-gray-300 dark:bg-gray-600 dark:hover:bg-gray-900'
          >
            <AutoAwesome style={{ fontSize: 20 }} />{t('document.modal.inputMemo.generateAI')}
          </Button>
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

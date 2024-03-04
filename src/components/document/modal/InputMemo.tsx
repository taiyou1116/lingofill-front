import { ContentPaste } from '@mui/icons-material'
import React from 'react'
import { useTranslation } from 'react-i18next';

type Props = {
  selectedWords: string,
  translatedWords: string,
  userInputMemo: string,
  setUserInputMemo: React.Dispatch<React.SetStateAction<string>>,
}

function InputMemo(props: Props) {
  const { selectedWords, translatedWords, userInputMemo, setUserInputMemo } = props;
  const { t } = useTranslation();
  return (
    <div className=' w-full h-full flex flex-col gap-1'>
      <div className=' flex gap-1 items-center'>
        <button onClick={() => setUserInputMemo(selectedWords)} className=' flex items-center text-xs bg-gray-800 text-gray-300 dark:bg-gray-200 rounded-md px-1 py-1 dark:text-gray-800'>
          <ContentPaste style={{fontSize: 20}} />{t('document.modal.inputMemo.noteTheOriginalText')}
        </button>
        <button onClick={() => setUserInputMemo(translatedWords)}  className=' flex items-center text-xs bg-gray-800 text-gray-300 dark:bg-gray-200 rounded-md px-1 py-1 dark:text-gray-800'>
          <ContentPaste style={{fontSize: 20}} />{t('document.modal.inputMemo.noteTheTranslation')}
        </button>
      </div>
      <textarea 
        maxLength={1000}
        placeholder={t('document.modal.inputMemo.inputMemo')}
        className=' border p-1 h-full w-full resize-none rounded-md border-stone-900 dark:bg-gray-800 dark:border-gray-400 dark:text-gray-100' 
        value={userInputMemo}
        onChange={(e) => setUserInputMemo(e.target.value)}
      />
    </div>
  )
}

export default React.memo(InputMemo);
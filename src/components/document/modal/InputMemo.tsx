import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';

type Props = {
  translatedWords: string,
  userInputMemo: string,
  setUserInputMemo: React.Dispatch<React.SetStateAction<string>>,
}

function InputMemo(props: Props) {
  const { translatedWords, userInputMemo, setUserInputMemo } = props;
  const { t } = useTranslation();

  useEffect(() => {
    if (userInputMemo === '') {
      setUserInputMemo(translatedWords);
    }
  }, [setUserInputMemo, translatedWords, userInputMemo])

  return (
    <div className=' w-full h-full flex flex-col gap-1'>
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
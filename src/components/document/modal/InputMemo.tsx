// import { ContentPaste } from '@mui/icons-material';
// import { Tooltip } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';
import PasteButton from './PasteButton';

type Props = {
  userInputMemo: string,
  setUserInputMemo: React.Dispatch<React.SetStateAction<string>>,
}

function InputMemo(props: Props) {
  const { userInputMemo, setUserInputMemo } = props;
  const { t } = useTranslation();

  // const getClipboardText = async () => {
  //   const text = await navigator.clipboard.readText();
  //   setUserInputMemo(text);
  // }

  return (
    <div className=' w-full h-full flex flex-col gap-1'>
      <PasteButton 
        setUserInput={setUserInputMemo}
      />
      {/* <div className=' flex items-center gap-2 text-xs dark:text-gray-400'>
        {t('document.modal.inputMemo.inputMemo')}
        <Tooltip title='クリップボードからペースト' className=' cursor-pointer' onClick={getClipboardText}>
          <ContentPaste style={{ fontSize: 20 }} />
        </Tooltip>
      </div> */}
      <textarea 
        maxLength={1000}
        className=' border p-1 h-full w-full resize-none rounded-md border-stone-900 dark:bg-gray-800 dark:border-gray-400 dark:text-gray-100' 
        value={userInputMemo}
        onChange={(e) => setUserInputMemo(e.target.value)}
      />
    </div>
  )
}

export default React.memo(InputMemo);
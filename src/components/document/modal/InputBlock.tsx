import { ContentPaste, StarBorder } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import PasteButton from './PasteButton';

type Props = {
  userInputTranslation: string,
  setUserInputTranslation: React.Dispatch<React.SetStateAction<string>>,
}

function InputBlock(props: Props) {
  const { userInputTranslation, setUserInputTranslation } = props;
  const { t } = useTranslation();

  // const getClipboardText = async () => {
  //   const text = await navigator.clipboard.readText();
  //   setUserInputTranslation(text);
  // }

  return (
    <div className=' flex flex-col w-3/5 gap-1'>
      <PasteButton
        setUserInput={setUserInputTranslation}
      />
      {/* <div className=' flex items-center gap-2 text-xs dark:text-gray-400'>
        {t('document.modal.inputBlock.inputBlock')}
        <Tooltip title='クリップボードからペースト' className=' cursor-pointer' onClick={getClipboardText}>
          <ContentPaste style={{ fontSize: 20 }} />
        </Tooltip>
      </div> */}
      <div className=' flex items-center gap-3'>
        <input 
          maxLength={1000}
          type='text' 
          value={userInputTranslation}
          onChange={(e) => setUserInputTranslation(e.target.value)}
          className=' border border-gray-900 p-1 w-full modal-center-input rounded-md dark:bg-gray-800 dark:border-gray-400 dark:text-gray-100'
        />
        <Tooltip title={t('document.modal.inputBlock.favorite')}>
          <StarBorder className=' cursor-pointer'/>
        </Tooltip>
      </div>
    </div>
  )
}

export default React.memo(InputBlock);
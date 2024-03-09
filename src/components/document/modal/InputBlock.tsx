
import React from 'react'
import { useTranslation } from 'react-i18next';
import PasteButton from './PasteButton';
import { Tooltip } from '@mui/material'
import { StarBorder } from '@mui/icons-material'

type Props = {
  userInputTranslation: string,
  setUserInputTranslation: React.Dispatch<React.SetStateAction<string>>,
}

function InputBlock(props: Props) {
  const { userInputTranslation, setUserInputTranslation } = props;
  const { t } = useTranslation();

  return (
    <div className=' flex flex-col w-3/5 gap-1'>
      <PasteButton
        setUserInput={setUserInputTranslation}
        plceholder='document.modal.inputBlock.inputBlock'
      />
      <div className=' flex items-center gap-3'>
        <input 
          maxLength={1000}
          type='text' 
          value={userInputTranslation}
          onChange={(e) => setUserInputTranslation(e.target.value)}
          className=' border border-gray-900 p-1 w-full modal-center-input rounded-md dark:bg-gray-800 dark:border-gray-400 dark:text-gray-100'
        />
        <Tooltip title={t('document.modal.inputBlock.favorite')}>
          <StarBorder className='cursor-pointer hover:text-gray-300 dark:text-gray-300 dark:hover:text-gray-500'/>
        </Tooltip>
      </div>
    </div>
  )
}

export default React.memo(InputBlock);
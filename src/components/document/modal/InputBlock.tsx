import { StarBorder } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';

type Props = {
  selectedWords: string,
  userInputTranslation: string,
  setUserInputTranslation: React.Dispatch<React.SetStateAction<string>>,
}

function InputBlock(props: Props) {
  const { selectedWords, userInputTranslation, setUserInputTranslation } = props;
  const { t } = useTranslation();

  useEffect(() => {
    if (userInputTranslation === '') {
      setUserInputTranslation(selectedWords);
    }
  }, [selectedWords, setUserInputTranslation, userInputTranslation])

  return (
    <div className=' flex w-full gap-3 justify-center items-center'>
      <input 
        maxLength={1000}
        type='text' 
        placeholder={t('document.modal.inputBlock.inputBlock')}
        value={userInputTranslation}
        onChange={(e) => setUserInputTranslation(e.target.value)}
        className=' border border-gray-900 p-1 w-1/3 modal-center-input rounded-md dark:bg-gray-800 dark:border-gray-400 dark:text-gray-100'
      />
      <Tooltip title={t('document.modal.inputBlock.favorite')}>
        <StarBorder className=' cursor-pointer'/>
      </Tooltip>
    </div>
  )
}

export default React.memo(InputBlock);
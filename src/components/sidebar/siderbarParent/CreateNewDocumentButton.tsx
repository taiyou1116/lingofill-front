import { m_plus_rounded_1c } from '@/store/fontStore'
import { EditNote } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';

type Props = {
  setCreateNewDocument: React.Dispatch<React.SetStateAction<boolean>>,
}

function CreateNewDocumentButton(props: Props) {
  const { setCreateNewDocument } = props;
  const { t } = useTranslation();

  return (
    <div className=' flex justify-between w-full p-5 items-center'>
      <h1 className={`dark:text-gray-300 ${m_plus_rounded_1c.className}`}>{t('sidebar.textList')}</h1>
      <Tooltip
        title={t('sidebar.createNewText')}
        className=' dark:text-gray-300'>
        <button 
          onClick={() => setCreateNewDocument(true)}
          className=' border-2 rounded-lg p-0.5 dark:border-gray-400  hover:border-slate-600 duration-150'
        >
          <EditNote style={{fontSize: 25}}/>
        </button>
      </Tooltip> 
    </div>
  )
}

export default CreateNewDocumentButton
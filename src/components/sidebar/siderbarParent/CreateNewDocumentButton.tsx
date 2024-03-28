
import React from 'react'
import { useTranslation } from 'react-i18next';
import { m_plus_rounded_1c } from '@/store/fontStore'

import { EditNote } from '@mui/icons-material'
import { Tooltip } from '@mui/material'

type Props = {
  setCreateNewDocument: React.Dispatch<React.SetStateAction<boolean>>,
}

function CreateNewDocumentButton(props: Props) {
  const { setCreateNewDocument } = props;
  const { t } = useTranslation();

  const tooltipBaseStyle = 'dark:text-gray-300 dark:border-gray-400 border-2 cursor-pointer rounded-lg p-0.5 hover:border-slate-600 duration-150'

  return (
    <div className=' flex justify-between w-full p-5 items-center'>
      <h1 className={`dark:text-gray-300 ${m_plus_rounded_1c.className}`}>{t('sidebar.textList')}</h1>
      <Tooltip
        title={t('sidebar.createNewText')}
        className={tooltipBaseStyle}
        onClick={() => setCreateNewDocument(true)}
      >
        <EditNote style={{fontSize: 35}}/>
      </Tooltip> 
    </div>
  )
}

export default CreateNewDocumentButton
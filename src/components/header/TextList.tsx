import { GrobalStore } from '@/store/grobalStore';
import { Reorder } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';

function TextList() {
  const {flipShowSidebar} = GrobalStore();
  const { t } = useTranslation();
  
  return (
    <Tooltip 
      title={t('header.textList')}
      onClick={flipShowSidebar}
    >
      <Reorder style={{fontSize: 35}} className=" dark:text-gray-200 cursor-pointer" />
    </Tooltip>
  )
}

export default TextList
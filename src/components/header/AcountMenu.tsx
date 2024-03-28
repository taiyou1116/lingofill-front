
import { AccountCircle, Launch, Logout, Settings } from '@mui/icons-material'
import { Divider, Menu, MenuItem, Tooltip } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import Acount from './Acount'
import { useTranslation } from 'react-i18next'

function AcountMenu() {

  const { t } = useTranslation();
  
  const [anchorEl, setAnchorEl] = useState(null);

  const openNewDoc = () => {
    window.open('https://www.lingo-fill.com/doc', '_blank');
  }

  return (
    <>
      <Tooltip 
        title={t('header.acountSetting')}
        onClick={(event: any) => setAnchorEl(event.currentTarget)}
        className=" cursor-pointer dark:text-gray-200"
      >
        <AccountCircle style={{fontSize: 35}} />
      </Tooltip>
      <Menu
        autoFocus={false}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Link href='/setting'>
          <MenuItem className=" flex items-center gap-1">
            <Settings style={{fontSize: 20}} /> {t('header.setting')}
          </MenuItem>
        </Link>
        <MenuItem onClick={openNewDoc} className=" flex items-center gap-1">
          <Launch style={{fontSize: 20}} /> {t('header.howToUse')}
        </MenuItem>
        <Divider variant="middle" className=" py-1"/>
        <MenuItem className=" flex items-center gap-1 text-red-500">
          <Logout style={{fontSize: 20}} /> <Acount />
        </MenuItem>
      </Menu>
    </>
  )
}

export default AcountMenu
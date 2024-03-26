
import { AccountCircle, Help, Logout, Settings } from '@mui/icons-material'
import { Divider, Menu, MenuItem, Tooltip } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import Acount from './Acount'
import { useTranslation } from 'react-i18next'

function AcountMenu() {

  const { t } = useTranslation();
  
  const [anchorEl, setAnchorEl] = useState(null);

  const openNewDoc = () => {
    window.open('https://main.d5yypxcoba5g4.amplifyapp.com/doc', '_blank');
  }

  return (
    <>
      <div onClick={(event: any) => setAnchorEl(event.currentTarget)} className=" cursor-pointer">
        <Tooltip title={t('header.acountSetting')}>
          <AccountCircle style={{fontSize: 35}} className=" dark:text-gray-200" />
        </Tooltip>
      </div>
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
          <Help style={{fontSize: 20}} /> {t('header.howToUse')}
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
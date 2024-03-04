"use client"

import { AccountCircle, Help, Reorder, Settings } from "@mui/icons-material";
import { oswald } from '@/store/fontStore';
import Image from 'next/image';
import Link from 'next/link';
import { Toaster } from "react-hot-toast";
import { Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GrobaltStore } from "@/store/grobalStore";

function HeaderComponent() {
  const {flipShowSidebar} = GrobaltStore();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header-bg-height flex items-center justify-between shadow-2xl bg-white dark:bg-gray-600">
      <div className='flex items-center pl-4 gap-5'>
        <Tooltip title={t('header.textList')}>
          <button onClick={flipShowSidebar}>
            <Reorder style={{fontSize: 35}} className=" dark:text-gray-200" />
          </button>
        </Tooltip>
        <Link href={"/home"} className=' flex items-center cursor-pointer hover:bg-gray-200 dark:bg-gray-500 dark:hover:bg-gray-600 border-2 border-black rounded-lg pr-3'>
          <Image src="LF.svg" width="40" height="40" alt='ロゴ' />
          <h1 className={` text-xl ${oswald.className}`}>
            Lingo Fill
          </h1> 
        </Link>
      </div>
      <div className=' flex px-10 items-center gap-1'>
        <div onClick={handleClick} className=" cursor-pointer">
          <Tooltip title={t('header.acountSetting')}>
            <AccountCircle style={{fontSize: 35}} className=" dark:text-gray-200" />
          </Tooltip>
        </div>
        <Menu
          autoFocus={false}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Link href='/acount'>
            <MenuItem className=" flex items-center gap-1">
              <AccountCircle style={{fontSize: 20}} /> {t('header.acount')}
            </MenuItem>
          </Link>
          <Link href='/setting'>
            <MenuItem className=" flex items-center gap-1">
              <Settings style={{fontSize: 20}} /> {t('header.setting')}
            </MenuItem>
          </Link>
          <Link href='/doc'>
            <MenuItem className=" flex items-center gap-1">
              <Help style={{fontSize: 20}} /> {t('header.howToUse')}
            </MenuItem>
          </Link>
        </Menu>
      </div>
      <Toaster 
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default HeaderComponent
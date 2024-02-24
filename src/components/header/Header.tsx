"use client"

import { AccountCircle, Reorder, Settings } from "@mui/icons-material";
import { useStore } from '@/store/store';
import { oswald } from '@/store/fontStore';
import Image from 'next/image';
import Link from 'next/link';
import { Toaster } from "react-hot-toast";
import { Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";

function HeaderComponent() {
  const flipShowSidebar = useStore((store) => store.flipShowSidebar);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header-bg-height bg-cyan-500 flex items-center justify-between shadow-md">
      <div className='flex items-center pl-4 gap-5'>
        <Tooltip title="テキスト一覧">
          <button onClick={flipShowSidebar}>
            <Reorder style={{fontSize: 35}} />
          </button>
        </Tooltip>
        <Link href={"/"} className=' flex items-center cursor-pointer border-2 border-black rounded-lg pr-3'>
          <Image src="LF.svg" width="40" height="40" alt='ロゴ' />
          <h1 className={` text-xl ${oswald.className}`}>
            Lingo Fill
          </h1> 
        </Link>
      </div>
      <div className=' flex px-10 items-center'>
        <div onClick={handleClick} className=" cursor-pointer">
          <Tooltip title="アカウント設定">
            <AccountCircle style={{fontSize: 35}} />
          </Tooltip>
        </div>
        <Menu
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
          <MenuItem onClick={handleClose}>
            <Link href='/acount'>
              アカウント
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href='/setting'>
              設定
            </Link>
          </MenuItem>
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
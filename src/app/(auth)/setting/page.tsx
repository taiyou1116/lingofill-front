import { Switch } from '@mui/material'
import React from 'react'

function Setting() {
  
  return (
    <div className=' flex items-start justify-center py-10 w-full h-full bg-slate-300 dark:bg-slate-800'>
      <div className=' bg-slate-200 rounded-lg py-5 px-10 flex flex-col gap-10 w-3/6 dark:bg-slate-600'>
      <div className=' text-lg dark:text-white'>設定</div>
      <div className=' flex flex-col gap-3'>
        <div className=' flex items-center justify-between dark:text-white'>ダークモード <Switch /></div>
        <div className=' flex items-center justify-between dark:text-white'>翻訳をそのまま表示する <Switch /></div>
        <div className=' flex items-center justify-between dark:text-white'>翻訳をそのまま表示する <Switch /></div>
        <div className=' flex items-center justify-between dark:text-white'>翻訳をそのまま表示する <Switch /></div>
        <div className=' flex items-center justify-between dark:text-white'>翻訳をそのまま表示する <Switch /></div>
      </div>
    </div>
    </div>
  )
}

export default Setting
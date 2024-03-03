'use client'

import { useStore } from '@/store/store';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import { changeLanguage } from 'i18next';
import React from 'react'

function Setting() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // ダークモードまたはライトモードのテーマを動的に生成
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  const { language, setLanguage } = useStore((store) => ({
    language: store.language,
    setLanguage: store.setLanguage,
  }));

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const ln = event.target.value as string;
    localStorage.setItem('language', ln);
    setLanguage(ln);
    changeLanguage(ln);
  };
  
  return (
    <div className=' flex items-start justify-center py-10 w-full h-full bg-slate-300 dark:bg-slate-800'>
      <div className=' bg-slate-200 rounded-lg py-5 px-10 flex flex-col gap-10 w-3/6 dark:bg-slate-600'>
      <div className=' text-lg dark:text-white'>設定</div>
      <div className=' flex flex-col gap-3'>
        <div className=' flex items-center justify-between dark:text-white'>ダークモード <Switch /></div>
        <div className=' flex items-center justify-between dark:text-white'>
          言語選択
          <ThemeProvider theme={theme}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">言語</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={language}
                label={"言語"}
                onChange={handleLanguageChange}
              >
                <MenuItem value={'ja'}>日本語</MenuItem>
                <MenuItem value={'en'}>English</MenuItem>
                <MenuItem value={'es'}>Español</MenuItem>
                <MenuItem value={'zh'}>中国語</MenuItem>
                <MenuItem value={'hi'}>हिंदी</MenuItem>
              </Select>
            </FormControl>
          </ThemeProvider>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Setting
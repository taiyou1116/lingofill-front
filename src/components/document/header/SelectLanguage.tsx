import { TrendingFlat } from '@mui/icons-material'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import React, { memo } from 'react'

const MemoizedSelectLanguage = memo(SelectLanguage);

function SelectLanguageMemo() {
  return (
    <div>
      <MemoizedSelectLanguage />
    </div>
  );
}
export default SelectLanguageMemo;


function SelectLanguage() {
  
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

  const [language, setLanguage] = React.useState('en');
  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };

  const [translateLanguage, setTranslateLanguage] = React.useState('ja');
  const handleTranslateLanguageChange = (event: SelectChangeEvent) => {
    setTranslateLanguage(event.target.value as string);
  };

  return (
    <div className=" flex items-center">
      <ThemeProvider theme={theme}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-label">言語</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            label="言語"
            onChange={handleLanguageChange}
          >
            <MenuItem value={'ja'}>日本語</MenuItem>
            <MenuItem value={'en'}>English</MenuItem>
            <MenuItem value={'sp'}>Spanish</MenuItem>
          </Select>
        </FormControl>
        <TrendingFlat className=" dark:text-gray-300" />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-label">翻訳</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={translateLanguage}
            label="翻訳"
            onChange={handleTranslateLanguageChange}
          >
            <MenuItem value={'ja'}>日本語</MenuItem>
            <MenuItem value={'en'}>English</MenuItem>
            <MenuItem value={'sp'}>Spanish</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  )
}
'use client'

import { useThemeMode } from '@/hooks/hooks';
import { GrobalStore } from '@/store/grobalStore';
import { VoiceRate } from '@/types/types';
import { Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, ThemeProvider } from '@mui/material'
import { changeLanguage } from 'i18next';
import React from 'react'

function Setting() {
  const theme = useThemeMode();

  const { language, setLanguage, voiceType, setVoiceType, voiceRate, setVoiceRate } = GrobalStore();

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const ln = event.target.value;
    localStorage.setItem('language', ln);
    setLanguage(ln);
    changeLanguage(ln);
  };

  const handleVoiceTypeChange = () => {
    const newType = voiceType;
    if (newType === 'standard') {
      setVoiceType('neural');
      localStorage.setItem('voiceType', 'neural');
    } else {
      setVoiceType('standard');
      localStorage.setItem('voiceType', 'standard');
    }
  };

  const handleVoiceRateChange = (event: SelectChangeEvent) => {
    const rate = event.target.value;
    localStorage.setItem('rate', rate);
    setVoiceRate(rate as VoiceRate);
  };
  
  return (
    <ThemeProvider theme={theme}>
    <div className=' flex flex-col justify-start items-center py-10 w-full h-full bg-gray-300 dark:bg-gray-800'>
      <div className=' text-lg dark:text-white'>設定</div>
      <div className=' bg-gray-200 rounded-lg py-5 px-10 flex flex-col gap-10 w-3/6 dark:bg-gray-600'>

        <Divider />
          <div className=' flex flex-col gap-3'>
            <div className=' flex items-center justify-between dark:text-gray-300'>ダークモード <Switch /></div>
            <div className=' flex items-center justify-between dark:text-gray-300'>
              言語選択
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
            </div>
          </div>

          <Divider />

          <div className=' flex flex-col gap-3'>
            <div className=' flex items-center justify-between dark:text-gray-300'>自然な読み上げ 
              <Switch 
                onChange={handleVoiceTypeChange}
                checked={voiceType === 'neural'}
              />
            </div>
            <div className=' flex items-center justify-between dark:text-gray-300'>
              読み上げ速度
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-simple-select-label">速度</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={voiceRate}
                    label={"速度"}
                    onChange={handleVoiceRateChange}
                  >
                    <MenuItem value={'50'}>50%</MenuItem>
                    <MenuItem value={'60'}>60%</MenuItem>
                    <MenuItem value={'70'}>70%</MenuItem>
                    <MenuItem value={'80'}>80%</MenuItem>
                    <MenuItem value={'90'}>90%</MenuItem>
                    <MenuItem value={'100'}>100%</MenuItem>
                    <MenuItem value={'110'}>110%</MenuItem>
                    <MenuItem value={'120'}>120%</MenuItem>
                    <MenuItem value={'130'}>130%</MenuItem>
                    <MenuItem value={'140'}>140%</MenuItem>
                    <MenuItem value={'150'}>150%</MenuItem>
                  </Select>
                </FormControl>
            </div>
          </div>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default Setting
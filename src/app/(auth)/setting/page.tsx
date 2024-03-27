
'use client'

import { useThemeMode } from '@/hooks/hooks';
import { GrobalStore } from '@/store/grobalStore';
import { VoiceRate } from '@/types/types';
import { handleLanguageChange } from '@/utils/i18nUtils';
import { Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, ThemeProvider } from '@mui/material'
import { useRouter } from 'next/navigation';
import React from 'react'

function Setting() {
  const theme = useThemeMode();
  const route = useRouter();

  const { language, setLanguage,
          voiceType, setVoiceType, 
          voiceRate, setVoiceRate, 
          translationExpression, setTranslationExpression } = GrobalStore();

  const handleVoiceTypeChange = () => {
    if (voiceType === 'standard') {
      setVoiceType('neural');
      localStorage.setItem('voiceType', 'neural');
    } else {
      setVoiceType('standard');
      localStorage.setItem('voiceType', 'standard');
    }
  };

  const handleVoiceRateChange = (event: SelectChangeEvent) => {
    localStorage.setItem('rate', event.target.value);
    setVoiceRate(event.target.value as VoiceRate);
  };

  const handleExpressionLn = (e: SelectChangeEvent) => {
    setTranslationExpression(e.target.value);
    localStorage.setItem('translationExpression', e.target.value);
  };
  
  return (
    <ThemeProvider theme={theme}>
    <button 
      onClick={() => route.push('/home')} 
      className='dark:bg-gray-900 text-5xl dark:text-gray-100 rounded-3xl ml-5 mt-5 p-2'>
        ←
    </button>
    <div className=' flex flex-col justify-start items-center w-full h-full dark:bg-gray-800'>
      <div className=' text-lg dark:text-white'>設定</div>
      <div className=' bg-gray-200 border-2 border-gray-300 rounded-lg py-5 px-10 flex flex-col gap-10 w-11/12 md:w-3/6 dark:bg-gray-600'>

        <Divider />
        <div className=' dark:text-gray-300'>一般</div>
          <div className=' flex flex-col gap-3'>
            <div className=' flex items-center justify-between dark:text-gray-300'>
              言語選択
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-simple-select-label">言語</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    label={"言語"}
                    onChange={(event) => handleLanguageChange(event, setLanguage)}
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
          <div className=' dark:text-gray-300'>詳細な設定</div>
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
            <div className=' flex items-center justify-between dark:text-gray-300'>
              翻訳の表現
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-simple-select-label">表現を選択</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={translationExpression}
                    label={"翻訳方法"}
                    onChange={handleExpressionLn}
                  >
                    <MenuItem value={'NULL'}>デフォルト</MenuItem>
                    <MenuItem value={'FORMAL'}>硬い表現</MenuItem>
                    <MenuItem value={'INFORMAL'}>より自然な表現</MenuItem>
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

'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useGetLocalStorage, useThemeMode } from '@/hooks/hooks';

import { useTranslation } from 'react-i18next';

import { Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, ThemeProvider } from '@mui/material'
import { changeLanguage } from 'i18next';

function Setting() {
  const theme = useThemeMode();
  const route = useRouter();
  const { t } = useTranslation();
  
  const { value: ln, setValue: setLn } = useGetLocalStorage('language', 'ja');
  const { value: voiceRate, setValue: setVoiceRate } = useGetLocalStorage('rate', '100');
  const { value: voiceType, setValue: setvoiceType } = useGetLocalStorage('voiceType', 'standard');
  const { value: translationExpression, setValue: setTranslationExpression } = useGetLocalStorage('translationExpression', 'NULL');

  const handleLanguageChange = (event: SelectChangeEvent) => {
    localStorage.setItem('language', event.target.value)
    setLn(event.target.value);
    changeLanguage(event.target.value);
  }

  const handleVoiceTypeChange = () => {
    (voiceType === 'standard') 
    ? localStorage.setItem('voiceType', 'neural')
    : localStorage.setItem('voiceType', 'standard')

    setvoiceType(voiceType === 'standard' ? 'neural' : 'standard');
  };

  const handleVoiceRateChange = (event: SelectChangeEvent) => {
    localStorage.setItem('rate', event.target.value);
    setVoiceRate(event.target.value);
  };

  const handleExpressionLn = (event: SelectChangeEvent) => {
    localStorage.setItem('translationExpression', event.target.value);
    setTranslationExpression(event.target.value);
  };
  
  return (
    <ThemeProvider theme={theme}>
    <button 
      onClick={() => route.push('/home')} 
      className='dark:bg-gray-900 text-5xl dark:text-gray-100 rounded-3xl ml-5 mt-5 p-2'>
        ←
    </button>
    <div className=' flex flex-col justify-start items-center w-full h-full dark:bg-gray-800'>
      <div className=' text-lg dark:text-white'>{t('settings.setting')}</div>
      <div className=' bg-gray-200 border-2 border-gray-300 rounded-lg py-5 px-10 flex flex-col gap-10 w-11/12 md:w-3/6 dark:bg-gray-600'>

        <Divider />
        <div className=' dark:text-gray-300'>{t('settings.general')}</div>
          <div className=' flex flex-col gap-3'>
            <div className=' flex items-center justify-between dark:text-gray-300'>
            {t('settings.languageSelect')}
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-simple-select-label">{t('settings.language')}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ln}
                    label={t('settings.language')}
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
          <div className=' dark:text-gray-300'>{t('settings.detail')}</div>
          <div className=' flex flex-col gap-3'>
            <div className=' flex items-center justify-between dark:text-gray-300'>{t('settings.aloud')}
              <Switch 
                onChange={handleVoiceTypeChange}
                checked={voiceType === 'neural'}
              />
            </div>
            <div className=' flex items-center justify-between dark:text-gray-300'>
            {t('settings.aloudSpeed')}
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-simple-select-label">{t('settings.speed')}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={voiceRate}
                    label={t('settings.speed')}
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
            {t('settings.expression')}
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-simple-select-label">{t('settings.selectExpression')}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={translationExpression}
                    label={t('settings.selectExpression')}
                    onChange={handleExpressionLn}
                  >
                    <MenuItem value={'NULL'}>{t('settings.default')}</MenuItem>
                    <MenuItem value={'FORMAL'}>{t('settings.hardExpression')}</MenuItem>
                    <MenuItem value={'INFORMAL'}>{t('settings.easyExpression')}</MenuItem>
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
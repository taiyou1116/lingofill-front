
import React from 'react';
import { GrobalStore } from '@/store/grobalStore';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '@/hooks/hooks';
import { TrendingFlat } from '@mui/icons-material'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, ThemeProvider } from '@mui/material'

function SelectLanguage() {
  const { document, setDocument, documents, setDocuments } = GrobalStore();

  const { t } = useTranslation();
  const theme = useThemeMode();

  // 変更したらdocuments, documentを更新
  const changeLanguage = (language: string) => {
    const newDocument = {
      ...document!,
      language: language,
      isSynced: false,
    }

    const newDocuments = documents.map((doc) =>
      doc.sortKey === document?.sortKey ? newDocument : doc
    );
    setDocument(newDocument);
    setDocuments(newDocuments);
  }
  // 変更したらdocuments, documentを更新
  const changeTranslateLanguage = (language: string) => {
    const newDocument = {
      ...document!,
      translateLanguage: language,
      isSynced: false,
    }
    
    const newDocuments = documents.map((doc) =>
      doc.sortKey === document?.sortKey ? newDocument : doc
    );
    setDocument(newDocument);
    setDocuments(newDocuments);
  }
  
  // storeで管理
  const handleLanguageChange = (event: SelectChangeEvent) => {
    changeLanguage(event.target.value as string);
  };

  const handleTranslateLanguageChange = (event: SelectChangeEvent) => {
    changeTranslateLanguage(event.target.value as string);
  };

  return (
    <div className=" flex items-center">
      <ThemeProvider theme={theme}>
        <FormControl sx={{ m: 1, minWidth: 50 }} size="small">
          <InputLabel id="demo-simple-select-label" className=' text-xs'>{t('document.header.selectLanguage.language')}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={document!.language}
            label={t('document.header.selectLanguage.language')}
            onChange={handleLanguageChange}
          >
            <MenuItem value={'ja'}>日本語</MenuItem>
            <MenuItem value={'en'}>English</MenuItem>
            <MenuItem value={'es'}>Español</MenuItem>
            <MenuItem value={'fr'}>Français</MenuItem>
            <MenuItem value={'de'}>Deutsch</MenuItem>
            <MenuItem value={'it'}>Italiano</MenuItem>
            <MenuItem value={'pt'}>Português</MenuItem>
            <MenuItem value={'ru'}>Русский</MenuItem>
            <MenuItem value={'ar'}>عربي</MenuItem>
            <MenuItem value={'ko'}>한국어</MenuItem>
            <MenuItem value={'zh'}>中国語</MenuItem>
            <MenuItem value={'hi'}>हिंदी</MenuItem>
          </Select>
        </FormControl>
        <TrendingFlat className=" dark:text-gray-300" fontSize='small' />
        <FormControl sx={{ m: 1, minWidth: 50 }} size="small">
          <InputLabel id="demo-simple-select-label" className=' text-xs'>{t('document.header.selectLanguage.translation')}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={document!.translateLanguage}
            label={t('document.header.selectLanguage.translation')}
            onChange={handleTranslateLanguageChange}
          >
            <MenuItem value={'ja'}>日本語</MenuItem>
            <MenuItem value={'en'}>English</MenuItem>
            <MenuItem value={'es'}>Español</MenuItem>
            <MenuItem value={'fr'}>Français</MenuItem>
            <MenuItem value={'de'}>Deutsch</MenuItem>
            <MenuItem value={'it'}>Italiano</MenuItem>
            <MenuItem value={'pt'}>Português</MenuItem>
            <MenuItem value={'ru'}>Русский</MenuItem>
            <MenuItem value={'ar'}>عربي</MenuItem>
            <MenuItem value={'ko'}>한국어</MenuItem>
            <MenuItem value={'zh'}>中国語</MenuItem>
            <MenuItem value={'hi'}>हिंदी</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  )
}

export default React.memo(SelectLanguage);
import { useStore } from '@/store/store';
import { Document } from '@/types/types';
import { TrendingFlat } from '@mui/icons-material'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import React, { memo } from 'react'

const MemoizedSelectLanguage = memo(SelectLanguage);

function SelectLanguageMemo() {
  const { document, setDocument } = useStore((store) => ({
    document:     store.document,
    setDocument:  store.setDocument,
  }));
  return (
    <div>
      <MemoizedSelectLanguage 
        document={document}
        setDocument={setDocument}
      />
    </div>
  );
}
export default SelectLanguageMemo;

type Props = {
  document: Document | null,
  setDocument: (document: Document | null) => void,
}

function SelectLanguage(props: Props) {
  const { document, setDocument } = props;
  console.log(document);

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

  // 変更したらdocuments, documentを更新
  const changeLanguage = (language: string) => {
    const newDocument = {
      ...document!,
      language: language,
    }
    setDocument(newDocument);
  }
  // 変更したらdocuments, documentを更新
  const changeTranslateLanguage = (language: string) => {
    const newDocument = {
      ...document!,
      translateLanguage: language,
    }
    setDocument(newDocument);
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
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-label">言語</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={document!.language}
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
            value={document!.translateLanguage}
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
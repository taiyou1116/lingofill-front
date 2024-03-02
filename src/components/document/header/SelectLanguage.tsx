import { useStore } from '@/store/store';
import { Document } from '@/types/types';
import { TrendingFlat } from '@mui/icons-material'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import React, { memo } from 'react'

const MemoizedSelectLanguage = memo(SelectLanguage);

function SelectLanguageMemo() {
  const { document, setDocument, documents, setDocuments } = useStore((store) => ({
    document:     store.document,
    setDocument:  store.setDocument,
    documents:     store.documents,
    setDocuments:  store.setDocuments,
  }));
  return (
    <div>
      <MemoizedSelectLanguage 
        document={document}
        setDocument={setDocument}
        documents={documents}
        setDocuments={setDocuments}
      />
    </div>
  );
}
export default SelectLanguageMemo;

type Props = {
  document: Document | null,
  setDocument: (document: Document | null) => void,
  documents: Document[],
  setDocuments: (documents: Document[]) => void,
}

function SelectLanguage(props: Props) {
  const { document, setDocument, documents, setDocuments } = props;

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
            <MenuItem value={'es'}>Español</MenuItem>
            <MenuItem value={'fr'}>Français</MenuItem>
            <MenuItem value={'de'}>Deutsch</MenuItem>
            <MenuItem value={'it'}>Italiano</MenuItem>
            <MenuItem value={'pt'}>Português</MenuItem>
            <MenuItem value={'ru'}>Русский</MenuItem>
            <MenuItem value={'ar'}>عربي</MenuItem>
            <MenuItem value={'ko'}>한국어</MenuItem>
            <MenuItem value={'zh'}>中国語</MenuItem>
            
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
            <MenuItem value={'es'}>Español</MenuItem>
            <MenuItem value={'fr'}>Français</MenuItem>
            <MenuItem value={'de'}>Deutsch</MenuItem>
            <MenuItem value={'it'}>Italiano</MenuItem>
            <MenuItem value={'pt'}>Português</MenuItem>
            <MenuItem value={'ru'}>Русский</MenuItem>
            <MenuItem value={'ar'}>عربي</MenuItem>
            <MenuItem value={'ko'}>한국어</MenuItem>
            <MenuItem value={'zh'}>中国語</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  )
}
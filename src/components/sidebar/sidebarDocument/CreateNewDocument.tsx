import { Document } from '@/types/types';
import React from 'react'
import { useTranslation } from 'react-i18next';

type Props = {
  documents: Document[],
  setDocuments: (documents: Document[]) => void,
  input: string,
  setInput: (value: React.SetStateAction<string>) => void,
  setCreateNewDocument: React.Dispatch<React.SetStateAction<boolean>>,
  inputRef: React.RefObject<HTMLInputElement>,
}

function CreateNewDocument(props: Props) {
  const { input, setInput, setCreateNewDocument, documents, setDocuments, inputRef } = props;
  const { t } = useTranslation();
  const createNewDocumentBlur = (input: string) => {
    if (input === '') {
      setCreateNewDocument(false);
      return;
    }
    const now = Date.now().toString();
    const newDocument: Document = {
      title: input,
      text: '',
      sortKey: now,
      isSynced: false,
      isNew: true,
      isDelete: false,
      translations: [],
      language: 'en',
      translateLanguage: 'ja',
      updatedAt: now,
    }
    setDocuments([newDocument, ...documents]);
    setInput('');
    setCreateNewDocument(false);
  }

  return (
    <input 
      maxLength={100}
      className=' p-2'
      placeholder={t('sidebarDocument.createNewDocument.inputTextName')}
      type='text' 
      value={input}
      onChange={(e) => {
        setInput(e.target.value);
      }}
      onBlur={() => {
        createNewDocumentBlur(input)}
      }
      ref={inputRef}
    />
  )
}

export default React.memo(CreateNewDocument);
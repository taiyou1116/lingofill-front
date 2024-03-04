import React, { useEffect, useState } from 'react'
import debounce from "lodash/debounce";
import { Document } from '@/types/types';
import { useTranslation } from 'react-i18next';
import { GrobaltStore } from '@/store/grobalStore';

function InputDocument() {
  const { document, setDocument, documents, setDocuments } = GrobaltStore();

  const { t } = useTranslation();
  const [inputText, setInputText] = useState(document!.text);

  // デバウンスされた関数を作成
  const updateDocumentsDebounced = debounce(() => {
    if (!document) return;

    const existingDocument = documents.find(d => d.sortKey === document.sortKey);
    if (existingDocument && existingDocument.text === inputText) return;

    const updatedDocument = { ...document, 
      text: inputText,
      isSynced: false 
    };
    const updatedDocuments = documents.map((doc) =>
      doc.sortKey === document.sortKey ? updatedDocument : doc
    );
    setDocuments(updatedDocuments);
  }, 1000);

  useEffect(() => {
    updateDocumentsDebounced();

    return () => {
      updateDocumentsDebounced.cancel();
    };
  }, [inputText]);
  
  const inputOriginalText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    const updatedText = e.target.value;
    const updatedDocument: Document = {
      ...document!,
      text: updatedText,
      isSynced: false,
    };
    setDocument(updatedDocument);
  };

  return (
    <textarea
      maxLength={20000}
      className=" resize-none h-screen max-h-[calc(100vh-200px)] w-full p-3 origin-input rounded-md dark:bg-slate-600 dark:text-slate-300"
      placeholder={t('document.input')}
      value={document?.text}
      onChange={inputOriginalText}
    />
  )
}

export default React.memo(InputDocument);
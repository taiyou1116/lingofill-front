import React, { memo, useEffect, useState } from 'react'
import debounce from "lodash/debounce";
import { Document } from '@/types/types';
import { useStore } from '@/store/store';
import { useTranslation } from 'react-i18next';

const MemoizedDocumentComponent = memo(InputDocument);

function InputMemo() {
  const { document, setDocument, documents, setDocuments } = useStore((store) => ({
    document:     store.document,
    setDocument:  store.setDocument,
    documents:    store.documents,
    setDocuments: store.setDocuments,
  }));

  return (
    <div>
      <MemoizedDocumentComponent 
        document={document}
        setDocument={setDocument}
        documents={documents}
        setDocuments={setDocuments}
      />
    </div>
  );
}

export default InputMemo;

type Props = {
  document: Document | null,
  setDocument: (document: Document | null) => void,
  documents: Document[],
  setDocuments: (documents: Document[]) => void,
}

function InputDocument(props: Props) {
  const { document, setDocument, documents, setDocuments } = props;
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
import React, { useEffect, useState } from 'react'
import debounce from "lodash/debounce";
import { Document } from '@/types/types';
import { useStore } from '@/store/store';

function InputDocument() {
  const { document, setDocument, documents, setDocuments } = useStore((store) => ({
    document: store.document,
    setDocument: store.setDocument,
    documents: store.documents,
    setDocuments: store.setDocuments,
  }));

  const [inputText, setInputText] = useState(document?.text || '');

  // デバウンスされた関数を作成
  const updateDocumentsDebounced = debounce(() => {
    if (!document) return;

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
    };
    setDocument(updatedDocument);
  };

  return (
    <div className=" h-full">
      <textarea
        className=" resize-none h-full w-full p-1 border-2 origin-input"
        placeholder="原文をペースト (Command + V)" 
        value={document?.text}
        onChange={inputOriginalText}
      />
    </div>
  )
}

export default InputDocument
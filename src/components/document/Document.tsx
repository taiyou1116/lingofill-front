"use client"
import { useStore } from "@/store/store";
import { Document } from "@/types/types";
import TranslateDocument from "./TranslateDocument";
import ThreeWayToggle from "./ThreeWayToggle";
import SendDocumentDataButton from "./SendDocumentDataButton";
import { oswald } from "@/store/fontStore";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";

function DocumentComponent() {
  const text = useStore((store) => store.document?.text);
  const words = text?.split(" ");

  const { document, setDocument, documents, setDocuments, selectedmode } = useStore((store) => ({
    document: store.document,
    setDocument: store.setDocument,
    documents: store.documents,
    setDocuments: store.setDocuments,
    selectedmode: store.selectedmode,
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
    console.log("kiteru");
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

  const renderContentByMode = () => {
    if (document === null) {
      return (
        <div>テキストを選択もしくは作成してください。</div>
      )
    }
    switch (selectedmode) {
      case 'edit':
        return (
          <TranslateDocument 
            words={words}
          />
        );
      case 'preview':
        return (
          <div className=" h-full">
            preview
          </div>
        );
      case 'input':
        return (
          <div className=" h-full">
            <textarea
              className=" resize-none h-full w-full p-1 border-2 origin-input"
              placeholder="原文をペースト (Command + V)" 
              value={document?.text}
              onChange={inputOriginalText}
            />
          </div>
        );
      default:
        return <div>不明なモードです。</div>;
    }
  }

  const showToggle = () => {
    if (document === null) {
      return;
    }
    return (
      <div className=" flex gap-3 items-center">
        <h1 className={` ${oswald.className}`}>{ document.title }</h1>
        <ThreeWayToggle />
        <SendDocumentDataButton />
      </div>
    )
  }

  return (
    <div className=" h-full p-5">
      { showToggle() }
      
      <div className=" h-full p-5">
      { renderContentByMode() }
      </div>
    </div>
  );
}

export default DocumentComponent
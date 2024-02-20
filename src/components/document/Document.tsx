"use client"
import { useStore } from "@/store/store";
import TranslateDocument from "./TranslateDocument";
import ThreeWayToggle from "./ThreeWayToggle";
import SendDocumentDataButton from "./SendDocumentDataButton";
import { oswald } from "@/store/fontStore";
import InputDocument from "./InputDocument";
import { useState } from "react";
import { TranslationObj } from "@/types/types";
import PreviewDocument from "./PreviewDocument";

function DocumentComponent() {
  // 一時的にdocumentに置く
  // textと同様にdocumentから取得する。(documentにTranslationObjを含める)
  const [translations, setTranslations] = useState<TranslationObj[]>([]);

  const text = useStore((store) => store.document?.text);
  const words = text?.split(" ");

  const { document, selectedmode } = useStore((store) => ({
    document: store.document,
    selectedmode: store.selectedmode,
  }));

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
            translations={translations}
            setTranslations={setTranslations}
          />
        );
      case 'preview':
        return (
          <div className=" h-full">
            <PreviewDocument 
              words={words}
              translations={translations}
            />
          </div>
        );
      case 'input':
        return (
          <InputDocument />
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
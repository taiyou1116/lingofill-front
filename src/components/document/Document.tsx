"use client"
import { useStore } from "@/store/store";
import { Document } from "@/types/types";
import TranslateDocument from "./TranslateDocument";
import ThreeWayToggle from "../header/ThreeWayToggle";
import SendDocumentDataButton from "../header/SendDocumentDataButton";
import { oswald } from "@/store/fontStore";

function DocumentComponent() {
  const text = useStore((store) => store.document?.text);
  const words = text?.split(" ");

  // 'document...選択中のdocument'
  const selectedmode = useStore((store) => store.selectedmode);
  const document = useStore((store) => store.document);
  const setDocument = useStore((store) => store.setDocument);
  const username = useStore((store) => store.username);

  // inputModeでの入力処理
  const inputOriginalText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const d: Document = {
      sortKey: document!.sortKey,
      title: document!.title,
      text: e.target.value,
    }
    setDocument(d);
  }

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
        <SendDocumentDataButton 
          sortKey={document!.sortKey}
          username={username}
          title={document!.title}
          text={document!.text}
        />
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
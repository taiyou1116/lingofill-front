"use client"
import { useStore } from "@/store/store";
import { oswald } from "@/store/fontStore";
import { Box, LinearProgress } from "@mui/material";
import React, { memo } from "react";
import { Document, SelectedMode } from "@/types/types";
import ThreeWayToggleMemo from "./header/ThreeWayToggle";
import TranslateDocumentMemo from "./TranslateDocument";
import InputMemo from "./InputDocument";
import SendDocumentButtonMemo from "./header/SendDocumentDataButton";
import SelectLanguageMemo from "./header/SelectLanguage";

const MemoizedDocumentComponent = memo(DocumentComponent);

function DocumentMemoComponent() {
  const { document, selectedmode, isLoading } = useStore((store) => ({
    document:     store.document,
    selectedmode: store.selectedmode,
    isLoading:    store.isLoading,
  }));

  return (
    <div>
      <MemoizedDocumentComponent 
        document={document}
        selectedmode={selectedmode}
        isLoading={isLoading} 
      />
    </div>
  );
}

export default DocumentMemoComponent;

type Props = {
  document: Document | null,
  selectedmode: SelectedMode,
  isLoading: boolean,
}

function DocumentComponent(props: Props) {
  const { document, selectedmode, isLoading } = props;

  const text = document?.text;
  let words: string[] | undefined;
  if (document?.language === 'ja' || document?.language === 'zh') {
    words = text?.split("");
  } else {
    words = text?.split(" ");
  }  

  const renderContentByMode = () => {
    if (document === null) {
      return (
        <div className=" dark:text-gray-300">テキストを選択もしくは作成してください。</div>
      )
    }
    if (isLoading) {
      return (
        <div className=" flex h-full items-center justify-center">
          <Box sx={{ width: '30%' }}>
            <LinearProgress />
          </Box>
        </div>
      )
    }
    switch (selectedmode) {
      case 'edit':
        return (
          <TranslateDocumentMemo
            words={words}
          />
        );
      case 'input':
        return (
          <InputMemo />
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
      <div className=" flex items-center justify-between">
        <div className=" flex gap-5 items-center">
          <h1 className={` dark:text-gray-100 text-xxs  ${oswald.className}`}>{ document.title }</h1>
          <ThreeWayToggleMemo />
          <SelectLanguageMemo />
        </div>
        <SendDocumentButtonMemo />
      </div>
    )
  }

  return (
    <div className="h-full p-1 md:p-5 bg-gray-100 dark:bg-gray-800">
      { showToggle() }
      
      <div className=" h-5/6 pt-5">
      { renderContentByMode() }
      </div>
    </div>
  );
}
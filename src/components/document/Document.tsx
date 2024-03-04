"use client"
import { oswald } from "@/store/fontStore";
import { Box, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReadingButton from "./modal/ReadingButton";
import { audioStream } from "@/utils/request";
import StopAudio from "./header/StopAudio";
import SelectLanguage from "./header/SelectLanguage";
import InputDocument from "./InputDocument";
import TranslateDocument from "./TranslateDocument";
import { GrobaltStore } from "@/store/grobalStore";
import SendDocumentDataButton from "./header/SendDocumentDataButton";
import ThreeWayToggle from "./header/ThreeWayToggle";

function DocumentComponent() {
  const { document, selectedMode, isLoading } = GrobaltStore();

  const { t } = useTranslation();
  const [words, setWords] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    let tempWords: string[] | undefined;
    if (document?.language === 'ja' || document?.language === 'zh') {
      tempWords = document?.text?.split("");
    } else {
      tempWords = document?.text?.split(" ");
    }
    setWords(tempWords);
  }, [document]);

  const renderContentByMode = () => {
    if (document === null) {
      return (
        <div className=" dark:text-gray-300"> {t('document.chooseText')}</div>
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
    switch (selectedMode) {
      case 'edit':
        return (
          <TranslateDocument
            words={words}
            document={document}
          />
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
      <div className=" flex items-center justify-between">
        <div className=" flex gap-5 items-center">
          <h1 className={` dark:text-gray-100 text-xxs  ${oswald.className}`}>{ document.title }</h1>
          <ThreeWayToggle />
          <SelectLanguage />

          { audioStream.paused
          ? 
            <ReadingButton 
              selectedWords={document.text}
              ln={document!.language}
            />
          :
            <StopAudio />
          } 
          
        </div>
        <SendDocumentDataButton />
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

export default React.memo(DocumentComponent);
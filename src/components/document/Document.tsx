"use client"
import { oswald } from "@/store/fontStore";
import { Box, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReadingButton from "./modal/ReadingButton";
import StopAudio from "./header/StopAudio";
import SelectLanguage from "./header/SelectLanguage";
import InputDocument from "./InputDocument";
import TranslateDocument from "./TranslateDocument";
import { GrobalStore } from "@/store/grobalStore";
import SendDocumentDataButton from "./header/SendDocumentDataButton";
import ThreeWayToggle from "./header/ThreeWayToggle";
import { splitTextToSegments } from "@/utils/request";

function DocumentComponent() {
  const { document, selectedMode, isLoading, isPlaying } = GrobalStore();

  const { t } = useTranslation();
  const [sentences, setSentences] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    if (document === null) return;

    let tempWords: string[] | undefined;
    if (document.language === 'ja' || document.language === 'zh') {
      // 日本語ようの作成する!!
    } else {
      tempWords = splitTextToSegments(document.text);
    }
    setSentences(tempWords);
    // console.log("document: " + tempWords);
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
            document={document}
            sentences={sentences!}
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

          { !isPlaying
          ? 
            <ReadingButton 
              sentences={sentences!}
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
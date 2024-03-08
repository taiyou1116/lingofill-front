
"use client"

import React, { useEffect, useState } from "react";
import { GrobalStore } from "@/store/grobalStore";
import { useTranslation } from "react-i18next";
import { oswald } from "@/store/fontStore";
import { splitTextToSegments } from "@/utils/helper";
import InputDocument from "./InputDocument";
import TranslateDocument from "./TranslateDocument";
import ReadingButton from "./modal/ReadingButton";
import StopAudio from "./header/StopAudio";
import SelectLanguage from "./header/SelectLanguage";
import SendDocumentDataButton from "./header/SendDocumentDataButton";
import ThreeWayToggle from "./header/ThreeWayToggle";
import { Box, LinearProgress } from "@mui/material";

function DocumentComponent() {
  const { document, selectedMode, isLoading, isPlaying } = GrobalStore();

  const { t } = useTranslation();
  const [sentences, setSentences] = useState<string[]>([]);

  useEffect(() => {
    if (document === null) return;

    let tempWords: string[];
    tempWords = splitTextToSegments(document.text, document.language);
    setSentences(tempWords);
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
              shouldIncrement={true}
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
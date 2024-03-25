
"use client"

import React, { useEffect, useState } from "react";
import { GrobalStore } from "@/store/grobalStore";
import { useTranslation } from "react-i18next";
import { oswald } from "@/store/fontStore";

import { useWindowSize } from "@/hooks/hooks";
import { splitTextToSegment, truncateText } from "@/utils/helper";

import InputDocument from "./InputDocument";
import TranslateDocument from "./TranslateDocument";
import SelectLanguage from "./header/SelectLanguage";
import SendDocumentDataButton from "./header/SendDocumentDataButton";
import ThreeWayToggle from "./header/ThreeWayToggle";
import MoreSelectLanguage from "./header/MoreSelectLanguage";
import ListenAudio from "./header/ListenAudio";

import { Box, LinearProgress } from "@mui/material";


function DocumentComponent() {
  const { document, selectedMode, isLoading } = GrobalStore();

  const { t } = useTranslation();
  const { width } = useWindowSize();
  const isSm = width <= 425;
  
  const [sentences, setSentences] = useState<string[]>([]);
  const [isSelectedReading, setIsSelectedReading] = useState<boolean>(false);

  // documentが変更されたら'textを変更'
  useEffect(() => {
    if (document === null) return;
    const splitedText = splitTextToSegment(document.text, document.language);
    setSentences(splitedText);
  }, [document]);

  const renderContentByMode = () => {
    if (document === null) {
      return (
        <RenderEmptyState message={t('document.chooseText')} />
      )
    }
    if (isLoading) {
      return (
        <DocumentLoading />
      )
    }
    switch (selectedMode) {
      case 'edit':
        return (
          <TranslateDocument
            document={document}
            sentences={sentences!}
            isSelectedReading={isSelectedReading}
          />
        );
      case 'input':
        return (
          <InputDocument />
        );
    }
  }

  const showDocumentHeader = () => {
    if (document === null) {
      return;
    }
    if (isSm) {
      return (
        <div className="fixed pt-10 mt-6 pb-3 flex flex-col w-full bg-gray-100/95 dark:bg-gray-800/95">
          <div className=" flex pt-5 px-3 items-center justify-between">
            <ThreeWayToggle />
            <div className=" flex items-center gap-1">
              <MoreSelectLanguage />
              <ListenAudio 
                isSelectedReading={isSelectedReading}
                setIsSelectedReading={setIsSelectedReading}
              />
            </div>
            <SendDocumentDataButton />
          </div>
        </div>
      )
    } else {
      return (
        <div className=" fixed pt-10 pb-3 w-full bg-gray-100/95 dark:bg-gray-800/95 mt-6 pr-10 flex items-center justify-between">
          <div className=" flex gap-5 items-center">
            <h1 className={` dark:text-gray-100 text-xxs  ${oswald.className}`}>{ truncateText(document?.title, 20)}</h1>
            <ThreeWayToggle />
            <SelectLanguage />
            <div className=" flex gap-3 items-center">
              <ListenAudio 
                isSelectedReading={isSelectedReading}
                setIsSelectedReading={setIsSelectedReading}
              />
            </div>
          </div>
          <SendDocumentDataButton />
        </div>
      )
    }
  }

  return (
    <div className="h-full p-1 md:p-5 bg-gray-100 dark:bg-gray-800">
      { showDocumentHeader() }
      
      <div className=" h-5/6 pt-5">
      { renderContentByMode() }
      </div>
    </div>
  );
}

export default React.memo(DocumentComponent);

const DocumentLoading = () => (
  <div className="flex h-full items-center justify-center">
    <Box sx={{ width: '30%' }}>
      <LinearProgress />
    </Box>
  </div>
);

type RenderEmptyStateProps = {
  message: string,
}
const RenderEmptyState: React.FC<RenderEmptyStateProps> = ({ message }) => (
  <div className="dark:text-gray-300">{message}</div>
);
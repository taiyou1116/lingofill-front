
import React from "react";
import { m_plus_rounded_1c } from "@/store/fontStore";
import { GrobalStore } from "@/store/grobalStore";

import { judgeSpaceLanguage } from "@/utils/textUtils";

import { Tooltip } from "@mui/material";
import { Document, TranslationObj } from "@/types/types";

type RenderTextProps = {
  handleClick: (index: number) => void,
  handleMouseDown: () => void,
  handleMouseMove: (index: number) => void,
  handleMouseUp: () => void,
  handleTouchStart: (index: number) => void,
  handleTouchMove: (e: React.TouchEvent<HTMLSpanElement>) => void,
  handleTouchEnd: () => void,
  sentences: string[];
  isSelectedReading: boolean,
  words: string[],
  listenText: (sentenceIndex: number) => void,
  showMemoText: (translation: TranslationObj) => string,
  selectedWordsIndexes: number[],
  readingNumber: number,
}

const RenderText = (props: RenderTextProps) => {
  const { handleClick, handleMouseDown, handleMouseMove, handleMouseUp, handleTouchStart, handleTouchMove, handleTouchEnd, sentences, listenText, showMemoText, selectedWordsIndexes, readingNumber } = props;
  const { document } = GrobalStore();

  const textBgClass = `
    overflow-y-auto overflow-x-hidden max-h-[calc(100vh-180px)] 
    p-3 rounded-md bg-white dark:bg-slate-600 dark:text-slate-300`
    ;

  const memoClass = (captureIndex: number) => `
    select-none px-1 mx-0.5 cursor-pointer rounded-md
    ${selectedWordsIndexes.includes(captureIndex) 
    ? "bg-blue-300 dark:bg-blue-500" 
    : "bg-slate-200 dark:bg-slate-800/50"}`
    ;

  const textClass = (document: Document, captureIndex: number) => `
    select-none cursor-pointer
    ${document.language !== 'ja' && document.language !== 'zh' ? 'p-0.5' : ''} 
    ${selectedWordsIndexes.includes(captureIndex) 
    ? "bg-blue-300 dark:bg-blue-500" 
    : "bg-transparent"}`
    ;

  let globalIndex = 0;
  let newLine = '\n';

  const renderSentence = (sentence: string, sentenceIndex: number) => {
    if (document === null) return;

    if (sentence === newLine) {
      globalIndex++;
      return <br key={`br-${sentenceIndex}`} />;
    }

    // 1文の中のwords
    const wordsOfSentence = document.language && judgeSpaceLanguage(document.language) 
      ? sentence.split(' ') 
      : sentence.split('');

    return (
      <React.Fragment key={sentenceIndex}>
        <span
          className={`break-all ${sentenceIndex === readingNumber ? ' text-yellow-600 dark:text-yellow-300' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={() => listenText(sentenceIndex)}
        >
          {wordsOfSentence.map((word) => {
            const captureIndex = globalIndex;
            const translation = document.translations.find(t => t.indexes.includes(captureIndex));

            if (translation && translation.indexes[0] === captureIndex) {
              globalIndex++;
              return (
                <span
                  key={captureIndex}
                  onClick={() => handleClick(captureIndex)}
                  onMouseMove={() => handleMouseMove(captureIndex)}
                  onTouchMove={() =>handleMouseMove(captureIndex)}
                  className={memoClass(captureIndex)}
                >
                  <Tooltip
                    title={<div className={`text-sm ${m_plus_rounded_1c.className}`}
                    style={{ whiteSpace: 'pre-wrap' }}>{translation.memo}</div>}
                  >
                    <span>{showMemoText(translation)}</span>
                  </Tooltip>
                </span>
              )
            } else if (!translation) {
              globalIndex++;
              return (
                <span
                  key={captureIndex}
                  className={textClass(document, captureIndex)}
                  onClick={() => handleClick(captureIndex)}
                  onMouseMove={() => handleMouseMove(captureIndex)}
                  onTouchStart={() => handleTouchStart(captureIndex)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  data-index={captureIndex}
                >
                  {word}
                </span>
              );
            }
            globalIndex++;
          })}
        </span>
      </React.Fragment>
    );
  };

  const renderText = sentences.map((sentence, index) => renderSentence(sentence, index));

  return (
    <div className=" pt-28">
      <div className={textBgClass}>
        {renderText}
      </div>
    </div>
  );
};

export default React.memo(RenderText);
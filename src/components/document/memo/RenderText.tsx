
import React from "react";
import { m_plus_rounded_1c } from "@/store/fontStore";
import { GrobalStore } from "@/store/grobalStore";

import { judgeSpaceLanguage } from "@/utils/textUtils";

import { Tooltip } from "@mui/material";
import { TranslationObj } from "@/types/types";

type EventHandlers = {
  handleClick: (index: number) => void;
  handleMouseMove: (index: number) => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleTouchStart: (index: number) => void,
  handleTouchMove: (e: React.TouchEvent<HTMLSpanElement>) => void,
  handleTouchEnd: () => void,
}

type RenderTextProps = {
  sentences: string[];
  eventHandlers: EventHandlers;
  isSelectedReading: boolean,
  words: string[],
  listenText: (sentenceIndex: number) => void,
  showMemoText: (translation: TranslationObj) => string,
}

const RenderText = (props: RenderTextProps) => {
  const { sentences, eventHandlers, listenText, showMemoText } = props;
  const { readingNumber, document, selectedWordsIndexes } = GrobalStore();

  let globalIndex = 0;
  let newLine = '\n';

  const renderSentence = (sentence: string, sentenceIndex: number) => {
    if (document === null) return;

    if (sentence === newLine) {
      globalIndex++;
      return <br key={`br-${sentenceIndex}`} />;
    }

    // 1文の中のwords
    const wordsOfSentence = document.language && judgeSpaceLanguage(document.language) ? sentence.split(' ') : sentence.split('');

    return (
      <React.Fragment key={sentenceIndex}>
        <span
          className={`break-all ${sentenceIndex === readingNumber ? ' text-yellow-600 dark:text-yellow-300' : ''}`}
          onMouseDown={eventHandlers.handleMouseDown}
          onMouseUp={eventHandlers.handleMouseUp}
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
                  onClick={() => eventHandlers.handleClick(captureIndex)}
                  onMouseMove={() => eventHandlers.handleMouseMove(captureIndex)}
                  onTouchMove={() => eventHandlers.handleMouseMove(captureIndex)}
                  className={`select-none px-1 mx-0.5 cursor-pointer rounded-md
                    ${selectedWordsIndexes.includes(captureIndex) 
                      ? "bg-blue-300 dark:bg-blue-500" 
                      : "bg-slate-200 dark:bg-slate-800/50"}
                  `}
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
                  className={`select-none cursor-pointer
                              ${document.language !== 'ja' && document.language !== 'zh' ? 'p-0.5' : ''} 
                              ${selectedWordsIndexes.includes(captureIndex) 
                                ? "bg-blue-300 dark:bg-blue-500" 
                                : "bg-transparent"}`}
                  onClick={() => eventHandlers.handleClick(captureIndex)}
                  onMouseMove={() => eventHandlers.handleMouseMove(captureIndex)}
                  onTouchStart={() => eventHandlers.handleTouchStart(captureIndex)}
                  data-index={captureIndex}
                  onTouchMove={eventHandlers.handleTouchMove}
                  onTouchEnd={eventHandlers.handleTouchEnd}
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

  return (
    <div className=" pt-28">
      <div 
        className={`overflow-y-auto overflow-x-hidden max-h-[calc(100vh-180px)] p-3 rounded-md 
                  bg-white dark:bg-slate-600 dark:text-slate-300`}
      >
        {sentences.map((sentence, index) => renderSentence(sentence, index))}
      </div>
    </div>
  );
};

export default React.memo(RenderText);
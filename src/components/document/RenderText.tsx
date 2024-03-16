import { m_plus_rounded_1c } from "@/store/fontStore";
import { Document } from "@/types/types";
import { judgeSpaceLanguage } from "@/utils/helper";
import { Tooltip } from "@mui/material";
import React from "react";
import TranslateModal from "./modal/TranslateModal";

type RenderTextProps = {
  sentences: string[];
  readingNumber?: number;
  document: Document;
  handleClick: (index: number) => void;
  handleMouseMove: (index: number) => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  selectedWordsIndexes: number[];
  selectedWords: string
}

const RenderText = (props: RenderTextProps) => {
  const { sentences, readingNumber, document, selectedWordsIndexes, selectedWords,
          handleClick, handleMouseMove, handleMouseDown, handleMouseUp } = props;
  let globalIndex = 0;

  const renderSentence = (sentence: string, sentenceIndex: number) => {
    if (sentence === '\n') {
      globalIndex++;
      return <br key={`br-${sentenceIndex}`} />;
    }

    const words = document.language && judgeSpaceLanguage(document.language) ? sentence.split(' ') : sentence.split('');

    return (
      <React.Fragment key={sentenceIndex}>
        <span
          className={`break-all ${sentenceIndex === readingNumber ? ' text-yellow-300' : ''}`}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {words.map((word, wordIndex) => {
            const captureIndex = globalIndex;
            const translation = document.translations.find(t => t.indexes.includes(captureIndex));

            if (translation && translation.indexes[0] === captureIndex) {
              globalIndex++;
              return (
                <span
                  key={captureIndex}
                  onClick={() => handleClick(captureIndex)} // captureIndex を使用
                  onMouseMove={() => handleMouseMove(captureIndex)} // captureIndex を使用
                  onTouchMove={() => handleMouseMove(captureIndex)}
                  className={`select-none py-0.5 px-1 mx-0.5 cursor-pointer rounded-md text-sm
                    ${selectedWordsIndexes.includes(captureIndex) ? "bg-blue-300 dark:bg-blue-500" : "bg-slate-200 dark:bg-slate-900/50"}
                  `}
                >
                  <Tooltip title={<div className={`text-sm ${m_plus_rounded_1c.className}`}>{translation.memo}</div>}>
                    <span>{translation.translatedText}</span>
                  </Tooltip>
                </span>
              )
              
            } else if (!translation) {
              globalIndex++;
              return (
                <span
                  key={`${sentenceIndex}-${wordIndex}`}
                  className={`select-none cursor-pointer
                              ${document.language !== 'ja' && document.language !== 'zh' ? 'p-0.5' : ''} 
                              ${selectedWordsIndexes.includes(captureIndex) ? "bg-blue-300 dark:bg-blue-500" : "bg-transparent"}`}
                  onClick={() => handleClick(captureIndex)}
                  onMouseMove={() => handleMouseMove(captureIndex)}
                  onTouchMove={() => handleMouseMove(captureIndex)}
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
    <div className="overflow-y-auto max-h-[calc(100vh-200px)] p-3 rounded-md bg-white dark:bg-slate-600 dark:text-slate-300">
      {sentences.map(renderSentence)}
      <TranslateModal selectedWordsIndexes={selectedWordsIndexes} selectedWords={selectedWords} />
    </div>
  );
};

export default React.memo(RenderText);
import { m_plus_rounded_1c } from "@/store/fontStore";
import { Document } from "@/types/types";
import { getVoiceForLanguage, judgeSpaceLanguage, processAndSpeak } from "@/utils/helper";
import { Tooltip } from "@mui/material";
import React, { useRef, useState } from "react";
import TranslateModal from "./modal/TranslateModal";
import { GrobalStore } from "@/store/grobalStore";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

type RenderTextProps = {
  sentences: string[];
  readingNumber?: number;
  doc: Document;
  handleClick: (index: number) => void;
  handleMouseMove: (index: number) => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  selectedWordsIndexes: number[];
  selectedWords: string
  isSelectedReading: boolean,
  setSelectedWordsIndexes: (selectedWordsIndexes: number[]) => void,
}

const RenderText = (props: RenderTextProps) => {
  const { sentences, readingNumber, doc, selectedWordsIndexes, selectedWords, isSelectedReading,
          handleClick, handleMouseMove, handleMouseDown, handleMouseUp, setSelectedWordsIndexes } = props;
  const { voiceType, setReadingNumber, setIsPlaying, voiceRate } = GrobalStore();

  let globalIndex = 0;
  
  const [startNumber, setStartNumber] = useState<number>(-1);
  const touchIndexRef = useRef<number | null>(null);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const handleTouchStart = (index: number) => {
    
    setSelectedWordsIndexes([]);
    touchIndexRef.current = index;
    // 以前のタイマーがあればクリア
    if (timerId) clearTimeout(timerId);
  
    // 0.5秒後に実行されるタイマーを設定
    const newTimerId = setTimeout(() => {      
      if (index === touchIndexRef.current) {

        disableBodyScroll(document.body);

        handleMouseDown();
        setStartNumber(index);
        setSelectedWordsIndexes([index]);
      }
    }, 500);
    setTimerId(newTimerId);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLSpanElement>) => {
    // タッチイベントのクライアント座標を取得
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
  
    // タッチポイントにある要素を取得
    const elementUnderTouch = document.elementFromPoint(touchX, touchY) as HTMLSpanElement;
  
    // 要素からindexを取得（要素が正しく取得でき、data-index属性を持っている場合）
    if (elementUnderTouch && elementUnderTouch.hasAttribute('data-index')) {
      const newIndex = parseInt(elementUnderTouch.getAttribute('data-index')!, 10);

      if (newIndex === startNumber) {
        touchIndexRef.current = newIndex;
        handleMouseMove(newIndex);
      }
      if (newIndex === touchIndexRef.current) return;
        touchIndexRef.current = newIndex;
        handleMouseMove(newIndex);
      }
  };

  const handleTouchEnd = () => {
    touchIndexRef.current = null;
    handleMouseUp();

    enableBodyScroll(document.body);

    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
  };

  const renderSentence = (sentence: string, sentenceIndex: number) => {
    if (sentence === '\n') {
      globalIndex++;
      return <br key={`br-${sentenceIndex}`} />;
    }
    
    const ListenText = async (sentenceIndex: number) => {
      if (!isSelectedReading) return;
      const newSentences = sentences.slice(sentenceIndex);
      const voice = getVoiceForLanguage(doc.language, voiceType);

      await processAndSpeak(newSentences, voice, () => {
        setReadingNumber(sentenceIndex);
        setIsPlaying(true);
      }, () => setIsPlaying(false), () => {
        plusOne();
      }, voiceType, voiceRate);
    }
    const plusOne = () => {
      setReadingNumber(prevNumber => prevNumber + 1);
    };

    const words = doc.language && judgeSpaceLanguage(doc.language) ? sentence.split(' ') : sentence.split('');

    return (
      <React.Fragment key={sentenceIndex}>
        <span
          className={`break-all ${sentenceIndex === readingNumber ? ' text-yellow-300' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={() => ListenText(sentenceIndex)}
        >
          {words.map((word, wordIndex) => {
            const captureIndex = globalIndex;
            const translation = doc.translations.find(t => t.indexes.includes(captureIndex));

            if (translation && translation.indexes[0] === captureIndex) {
              globalIndex++;
              return (
                <span
                  key={captureIndex}
                  onClick={() => handleClick(captureIndex)} // captureIndex を使用
                  onMouseMove={() => handleMouseMove(captureIndex)} // captureIndex を使用
                  onTouchMove={() => handleMouseMove(captureIndex)}
                  className={`select-none px-1 mx-0.5 cursor-pointer rounded-md
                    ${selectedWordsIndexes.includes(captureIndex) ? "bg-blue-300 dark:bg-blue-500" : "bg-slate-200 dark:bg-slate-800/50"}
                  `}
                >
                  <Tooltip
                    title={<div className={`text-sm ${m_plus_rounded_1c.className}`}
                    style={{ whiteSpace: 'pre-wrap' }}>{translation.memo}</div>}
                  >
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
                              ${doc.language !== 'ja' && doc.language !== 'zh' ? 'p-0.5' : ''} 
                              ${selectedWordsIndexes.includes(captureIndex) ? "bg-blue-300 dark:bg-blue-500" : "bg-transparent"}`}
                  onClick={() => handleClick(captureIndex)}
                  onMouseMove={() => handleMouseMove(captureIndex)}
                  onTouchStart={() => handleTouchStart(captureIndex)}
                  data-index={captureIndex}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
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
      <div className={`overflow-y-auto overflow-x-hidden max-h-[calc(100vh-180px)] p-3 rounded-md bg-white dark:bg-slate-600 dark:text-slate-300`}>
        {sentences.map(renderSentence)}
        <TranslateModal selectedWordsIndexes={selectedWordsIndexes} selectedWords={selectedWords} />
      </div>
    </div>
  );
};

export default React.memo(RenderText);
import { m_plus_rounded_1c } from "@/store/fontStore";
import { Document } from "@/types/types";
import { getVoiceForLanguage, judgeSpaceLanguage, processAndSpeak } from "@/utils/helper";
import { Tooltip } from "@mui/material";
import React, { useRef, useState } from "react";
import TranslateModal from "./modal/TranslateModal";
import { GrobalStore } from "@/store/grobalStore";

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
}

const RenderText = (props: RenderTextProps) => {
  const { sentences, readingNumber, doc, selectedWordsIndexes, selectedWords, isSelectedReading,
          handleClick, handleMouseMove, handleMouseDown, handleMouseUp } = props;
  const { voiceType, setReadingNumber, setIsPlaying, voiceRate } = GrobalStore();

  let globalIndex = 0;
  
  const [longTouch, setLongTouch] = useState<boolean>(false);
  const touchIndexRef = useRef<number | null>(null);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const handleTouchStart = (index: number) => {
    console.log("start: " + index);
    touchIndexRef.current = index;
    // 以前のタイマーがあればクリア
    if (timerId) clearTimeout(timerId);
  
    // 0.5秒後に実行されるタイマーを設定
    const newTimerId = setTimeout(() => {
      console.log("touchIndex: " + touchIndexRef.current);
      
      if (index === touchIndexRef.current) {
        setLongTouch(true); 
        console.log("kita");
      }
    }, 500);
  
    setTimerId(newTimerId);
  };

  const handleTouchEnd = () => {
    setLongTouch(false);
    touchIndexRef.current = null;
  
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
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
      if (newIndex === touchIndexRef.current) return;

      touchIndexRef.current = newIndex;
      console.log('Moved over index:', newIndex);
    }
  };

  const renderSentence = (sentence: string, sentenceIndex: number) => {
    if (sentence === '\n') {
      globalIndex++;
      return <br key={`br-${sentenceIndex}`} />;
    }
    
    const Test = async (sentenceIndex: number) => {
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
          // onTouchStart={handleMouseDown}
          // onTouchEnd={handleMouseUp}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={() => Test(sentenceIndex)}
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
                  className={`select-none py-0.5 px-1 mx-0.5 cursor-pointer rounded-md text-sm
                    ${selectedWordsIndexes.includes(captureIndex) ? "bg-blue-300 dark:bg-blue-500" : "bg-slate-200 dark:bg-slate-900/50"}
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
    <div className={`${ longTouch === false ? 'overflow-y-auto' : ' overflow-y-clip' } max-h-[calc(100vh-200px)] p-3 rounded-md bg-white dark:bg-slate-600 dark:text-slate-300`}>
      {sentences.map(renderSentence)}
      <TranslateModal selectedWordsIndexes={selectedWordsIndexes} selectedWords={selectedWords} />
    </div>
  );
};

export default React.memo(RenderText);
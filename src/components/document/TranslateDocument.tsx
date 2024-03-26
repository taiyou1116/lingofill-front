
import React, { useEffect, useRef, useState } from "react";
import { GrobalStore } from "@/store/grobalStore";

import { getVoiceForLanguage, judgeSpaceLanguage, processAndSpeak } from "@/utils/helper";
import RenderText from "./RenderText";

import { Document } from "@/types/types";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

type Props = {
  localDocument: Document | null,
  sentences: string[],
  isSelectedReading: boolean,
}

function TranslateDocument(props: Props) {
  const { localDocument, sentences, isSelectedReading } = props;
  const { showCenterModal, flipCenterModal, 
          selectedWordsIndexes, setSelectedWordsIndexes, 
          readingNumber, voiceType, setReadingNumber, setIsPlaying, voiceRate } = GrobalStore();

  const [words, setWords] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedWords, setSelectedWords] = useState('hello');
  const [startDragIndex, setStartDragIndex] = useState<number | null>(null);
  const [ oldIndex, setOldIndex ] = useState<number | null>(null);
  
  // 単語用 -> sentencesからさらに分割
  useEffect(() => {
    if (localDocument === null) return;

    let tempWords: string[];
    if (judgeSpaceLanguage(localDocument.language)) {
      tempWords = sentences.map((s) => s.split(" ")).flat();
    } else {
      tempWords = sentences.map((s) => s.split("")).flat();
    }
    setWords(tempWords);
  }, [sentences]);
  
  // 単語編集処理
  const handleClick = (index: number) => {
    if (showCenterModal || isSelectedReading) return;

    const translation = localDocument!.translations.find(translation => translation.indexes.includes(index));
    if (translation) {
      setSelectedWordsIndexes(translation.indexes);
      setSelectedWords(translation.indexes.map((i) => words[i]).join(' '));
    } else {
      setSelectedWordsIndexes([index]);
      setSelectedWords(words[index]);
    }
    flipCenterModal();
  };

  const handleMouseDown = () => {
    if (showCenterModal || isSelectedReading) return;
    setIsDragging(true);
    setSelectedWordsIndexes([]);
  };

  const handleMouseMove = (index: number) => {
    if (showCenterModal || !isDragging) return;
  
    if (startDragIndex === null) {
      // ドラッグ開始時にtranslation.indexesにindexが含まれているかチェック
      const startTranslation = localDocument!.translations.find(t => t.indexes.includes(index));
      if (startTranslation) {
        // 含まれている場合はそのindexes全体を選択
        setSelectedWordsIndexes(startTranslation.indexes);
        setStartDragIndex(index);
        setOldIndex(index);
      } else {
        setStartDragIndex(index);
      }
    } else {
      if (oldIndex === index) return;
  
      setOldIndex(index);
      const newIndexes: number[] = [];
      const minIndex = Math.min(startDragIndex, index);
      const maxIndex = Math.max(startDragIndex, index);
  
      for (let i = minIndex; i <= maxIndex; i++) {
        // translation.indexes[0]のみではなく、indexes全体に含まれるかチェック
        const translation = localDocument!.translations.find(t => t.indexes.includes(i));
        if (translation) {
          // 同じindexesを複数回追加しないようにチェック
          translation.indexes.forEach(index => {
            if (!newIndexes.includes(index)) {
              newIndexes.push(index);
            }
          });
        } else {
          if (!newIndexes.includes(i)) {
            newIndexes.push(i);
          }
        }
      }
      setSelectedWordsIndexes(newIndexes);
    }
  };

  const handleMouseUp = () => {
    if (showCenterModal) return;
    setIsDragging(false);
    setStartDragIndex(null);
    if (selectedWordsIndexes.length > 0) {
      flipCenterModal();
      if (localDocument?.language === 'ja' || localDocument?.language === 'zh') {
        setSelectedWords(selectedWordsIndexes.map((i) => words[i]).join(''));
      } else {
        setSelectedWords(selectedWordsIndexes.map((i) => words[i]).join(' '));
      }
    }
  };

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

  // 場所移すかも
  const listenText = async (sentenceIndex: number) => {
    if (!isSelectedReading) return;
    const newSentences = sentences.slice(sentenceIndex);
    const voice = getVoiceForLanguage(localDocument!.language, voiceType);

    await processAndSpeak(newSentences, voice, () => {
      setReadingNumber(sentenceIndex);
      setIsPlaying(true);
    }, () => setIsPlaying(false), () => {
      setReadingNumber(prevNumber => prevNumber + 1);
    }, voiceType, voiceRate);
  }

  return (
    <RenderText
      sentences={sentences}
      readingNumber={readingNumber}
      doc={localDocument!}
      handleClick={handleClick}
      handleMouseMove={handleMouseMove}
      handleMouseDown={handleMouseDown}
      handleMouseUp={handleMouseUp}
      handleTouchStart={handleTouchStart}
      handleTouchMove={handleTouchMove}
      handleTouchEnd={handleTouchEnd}
      selectedWordsIndexes={selectedWordsIndexes}
      setSelectedWordsIndexes={setSelectedWordsIndexes}
      selectedWords={selectedWords}
      isSelectedReading={isSelectedReading}
      words={words}
      listenText={listenText}
    />
  );
}

export default React.memo(TranslateDocument);

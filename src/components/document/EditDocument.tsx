
import React, { useEffect, useRef, useState } from "react";
import { useModal } from "@/hooks/hooks";

import { getVoiceForLanguage, processAndSpeak } from "@/utils/audioUtils";
import { handleClick, handleMouseDown, handleMouseMove, handleMouseUp, handleTouchEnd, handleTouchMove, handleTouchStart } from "@/utils/inputEventUtils";
import { judgeSpaceLanguage } from "@/utils/textUtils";
import RenderText from "./textRender/RenderText";
import MemoModal from "./modal/MemoModal";

import { Document, TranslationObj, UseStateGeneric } from "@/types/types";

type Props = {
  localDocument: Document | null,
  sentences: string[],
  isSelectedReading: boolean,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  readingNumberState: UseStateGeneric<number>,
}

function EditDocument(props: Props) {
  const { localDocument, sentences, isSelectedReading, setIsPlaying, readingNumberState } = props;
  const { open: showCenterModal, handleOpen, handleClose } = useModal();
  const { value: readingNumber, setValue: setReadingNumber  } = readingNumberState;

  const [words, setWords] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedWords, setSelectedWords] = useState('hello');

  // マウス処理
  const [startDragIndex, setStartDragIndex] = useState<number | null>(null);
  const [ oldIndex, setOldIndex ] = useState<number | null>(null);

  // タッチ処理
  const touchIndexRef = useRef<number | null>(null);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const [selectedWordsIndexes, setSelectedWordsIndexes] = useState<number[]>([]);
  
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

  const listenText = async (sentenceIndex: number) => {
    if (!isSelectedReading) return;

    const voiceType = localStorage.getItem('voiceType') || 'standard';
    const voiceRate = localStorage.getItem('voiceRate') || '100';

    const newSentences = sentences.slice(sentenceIndex);
    const voice = getVoiceForLanguage(localDocument!.language, voiceType);

    await processAndSpeak(newSentences, voice, () => {
      setReadingNumber(sentenceIndex);
      setIsPlaying(true);
    }, () => setIsPlaying(false), () => {
      setReadingNumber(prevNumber => prevNumber + 1);
    }, voiceType, voiceRate);
  }

  const showMemoText = (translation: TranslationObj) => {
    const text = translation.indexes.map((i, index) => {
      
      if (!judgeSpaceLanguage(localDocument?.language)) {
        return words[i];
      }
      
      if (translation.indexes.length === index + 1) {
        return words[i];
      }
      return words[i] + ' ';
    });
    return text.join('');
  }

  return (
    <> 
      <RenderText
        handleClick={
        (index: number) => handleClick(
          showCenterModal, 
          isSelectedReading, 
          index, 
          localDocument, 
          words, 
          setSelectedWordsIndexes, 
          setSelectedWords, 
          handleOpen
        )}
        handleMouseDown={
        () => handleMouseDown(
          showCenterModal, 
          isSelectedReading, 
          setIsDragging, 
          setSelectedWordsIndexes
        )}
        handleMouseMove={
        (index: number) => handleMouseMove({
          showCenterModal, 
          isDragging, 
          index, 
          localDocument, 
          setSelectedWordsIndexes, 
          startDragIndex, 
          setStartDragIndex, 
          oldIndex, 
          setOldIndex
        })}
        handleMouseUp={
        () => handleMouseUp(
          showCenterModal, 
          setIsDragging, 
          setStartDragIndex, 
          selectedWordsIndexes, 
          handleOpen, 
          localDocument, 
          words, 
          setSelectedWords,
        )}
        handleTouchStart={
        (index: number) => handleTouchStart(
          index, 
          setSelectedWordsIndexes, 
          touchIndexRef, 
          timerId,
          showCenterModal,
          isSelectedReading,
          setIsDragging,
          setStartDragIndex,
          setTimerId,
        )}
        handleTouchMove={
        (e: React.TouchEvent<HTMLSpanElement>) => handleTouchMove(
          e,
          touchIndexRef,
          startDragIndex,
          setStartDragIndex,
          oldIndex,
          setOldIndex,
          showCenterModal,
          isDragging,
          localDocument,
          setSelectedWordsIndexes,
        )}
        handleTouchEnd={
        () => handleTouchEnd(
          touchIndexRef,
          showCenterModal,
          setIsDragging,
          setStartDragIndex,
          selectedWordsIndexes,
          handleOpen,
          localDocument,
          words,
          setSelectedWords,
          timerId,
          setTimerId,
        )}
        sentences={sentences}
        isSelectedReading={isSelectedReading}
        words={words}
        listenText={listenText}
        showMemoText={showMemoText}
        selectedWordsIndexes={selectedWordsIndexes}
        readingNumber={readingNumber}
      />
      <MemoModal 
        selectedWordsIndexes={selectedWordsIndexes} 
        setSelectedWordsIndexes={setSelectedWordsIndexes}
        selectedWords={selectedWords} 
        showCenterModal={showCenterModal}
        handleClose={handleClose}
        setPlaying={setIsPlaying}
        setReadingNumber={setReadingNumber}
      />
    </>
  );
}

export default React.memo(EditDocument);


import React, { useEffect, useState } from "react";
import { GrobalStore } from "@/store/grobalStore";
import { m_plus_rounded_1c } from "@/store/fontStore";
import { judgeSpaceLanguage } from "@/utils/helper";
import TranslateModal from "./modal/TranslateModal";
import { Document } from "@/types/types";
import { Tooltip } from "@mui/material";

type Props = {
  document: Document | null,
  sentences: string[],
}

function TranslateDocument(props: Props) {
  const { document, sentences } = props;
  const { showCenterModal, flipCenterModal, 
          selectedWordsIndexes, setSelectedWordsIndexes, 
          readingNumber } = GrobalStore();

  const [words, setWords] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedWords, setSelectedWords] = useState('hello');
  const [startDragIndex, setStartDragIndex] = useState<number | null>(null);
  const [ oldIndex, setOldIndex ] = useState<number | null>(null);

  // ドラッグ中に通ったblock (clickでも)
  

  // 単語用 -> sentencesからさらに分割
  useEffect(() => {
    if (document === null) return;

    let tempWords: string[];
    if (judgeSpaceLanguage(document.language)) {
      tempWords = sentences.map((s) => s.split(" ")).flat();
    } else {
      tempWords = sentences.map((s) => s.split("")).flat();
    }
    setWords(tempWords);
  }, [sentences]);
  
  // 単語編集処理
  const handleClick = (index: number) => {
    if (showCenterModal) return;

    const translation = document!.translations.find(translation => translation.indexes.includes(index));
    if (translation) {
      setSelectedWordsIndexes(translation.indexes);
      setSelectedWords(translation.indexes.map((i) => words[i]).join(' '));
    } else {
      setSelectedWordsIndexes([index]);
      setSelectedWords( words[index]);
    }
    flipCenterModal();
  };

  const handleMouseDown = () => {
    if (showCenterModal) return;
    setIsDragging(true);
    setSelectedWordsIndexes([]);
  };
  
  const handleMouseMove = (index: number) => {
    if (showCenterModal || !isDragging) return;

    if (startDragIndex === null) {
      setStartDragIndex(index);
    } else {
      if (oldIndex === index) return;
      
      setOldIndex(index);
      const newIndexes = [];
      const minIndex = Math.min(startDragIndex, index);
      const maxIndex = Math.max(startDragIndex, index);

      for (let i = minIndex; i <= maxIndex; i++) {
        const translation = document!.translations.find(translation => translation.indexes.includes(i));
        if (translation) {
          console.log("unblock: " + translation.indexes);
        }
        newIndexes.push(i);
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
      if (document?.language === 'ja' || document?.language === 'zh') {
        setSelectedWords(selectedWordsIndexes.map((i) => words[i]).join(''));
      } else {
        setSelectedWords(selectedWordsIndexes.map((i) => words[i]).join(' '));
      }
    }
  };

  return (
      <RenderText 
      sentences={sentences}
      readingNumber={readingNumber}
      document={document!}
      handleClick={handleClick}
      handleMouseMove={handleMouseMove}
      handleMouseDown={handleMouseDown}
      handleMouseUp={handleMouseUp}
      selectedWordsIndexes={selectedWordsIndexes}
      selectedWords={selectedWords}
    />
  );
}

export default React.memo(TranslateDocument);


interface RenderTextProps {
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
                            bg-slate-200 dark:bg-slate-900/50`}
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
                  className={`select-none cursor-pointer ${document.language !== 'ja' && document.language !== 'zh' ? 'p-0.5' : ''} ${selectedWordsIndexes.includes(captureIndex) ? "bg-blue-300 dark:bg-blue-500" : "bg-transparent"}`}
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

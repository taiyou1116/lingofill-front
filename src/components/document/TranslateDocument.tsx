import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { m_plus_rounded_1c } from "@/store/fontStore";
import { Document } from "@/types/types";
import { GrobalStore } from "@/store/grobalStore";
import TranslateModal from "./modal/TranslateModal";
import { judgeSpaceLanguage } from "@/utils/helper";

type Props = {
  document: Document | null,
  sentences: string[],
}
function TranslateDocument(props: Props) {
  const { document, sentences } = props;
  const { showCenterModal, flipCenterModal, selectedWordsIndexes, setSelectedWordsIndexes, readingNumber } = GrobalStore();

  // ドラッグ処理(熟語処理)
  const [words, setWords] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedWords, setSelectedWords] = useState('hello');
  const [startDragIndex, setStartDragIndex] = useState<number | null>(null); // ドラッグ開始インデックス 

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
      const newIndexes = [];
      const minIndex = Math.min(startDragIndex, index);
      const maxIndex = Math.max(startDragIndex, index);

      for (let i = minIndex; i <= maxIndex; i++) {
        
        // translationでスクロールしてもClick操作同様に振る舞う 
        // ブロックに触れたらその時点でhandleMouseUp
        const translation = document!.translations.find(translation => translation.indexes.includes(i));
        if (translation) {
          handleMouseUp();
          return;
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
    <div className="overflow-y-auto max-h-[calc(100vh-200px)] p-3 rounded-md bg-white dark:bg-slate-600 dark:text-slate-300">
      {(() => {
        let globalIndex = 0;

        return sentences.map((sentence, sentenceIndex) => (
          <React.Fragment key={sentenceIndex}>
            <span className={`break-all  ${ sentenceIndex === readingNumber ? ' bg-yellow-600/50' : '' }`} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
              {(document?.language === 'ja' || document?.language === 'zh' ? sentence.split('') : sentence.split(' ')).map((word) => {
                // この時点での globalIndex の値を captureIndex として保存
                const captureIndex = globalIndex;
                const translation = document!.translations.find(translation => translation.indexes.includes(captureIndex));
                
                if (translation && translation.indexes[0] === captureIndex) {
                  globalIndex++;
                  return (
                    <span
                      key={captureIndex}
                      onClick={() => handleClick(captureIndex)} // captureIndex を使用
                      onMouseMove={() => handleMouseMove(captureIndex)} // captureIndex を使用
                      className={`select-none py-0.5 px-1 mx-0.5 cursor-pointer rounded-md bg-slate-200 dark:bg-slate-900/50 text-sm`}
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
                      key={captureIndex}
                      onClick={() => handleClick(captureIndex)} // captureIndex を使用
                      onMouseMove={() => handleMouseMove(captureIndex)} // captureIndex を使用
                      className={`select-none cursor-pointer ${document?.language !== 'ja' && document?.language !== 'zh' ? 'p-0.5' : ''} ${selectedWordsIndexes.includes(captureIndex) ? "bg-blue-300 dark:bg-blue-500" : "bg-transparent"}`}
                    >
                      {word}
                    </span>
                  )
                } 
                globalIndex++;
              })}
            </span>
          </React.Fragment>
        ));
      })()}
      <TranslateModal selectedWordsIndexes={selectedWordsIndexes} selectedWords={selectedWords} />
    </div>
  );
}

export default React.memo(TranslateDocument);

import React, { useEffect, useState } from "react";
import { GrobalStore } from "@/store/grobalStore";
import { judgeSpaceLanguage } from "@/utils/helper";
import { Document } from "@/types/types";
import RenderText from "./RenderText";

type Props = {
  document: Document | null,
  sentences: string[],
  isSelectedReading: boolean,
}

function TranslateDocument(props: Props) {
  const { document, sentences, isSelectedReading } = props;
  const { showCenterModal, flipCenterModal, 
          selectedWordsIndexes, setSelectedWordsIndexes, 
          readingNumber } = GrobalStore();

  const [words, setWords] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedWords, setSelectedWords] = useState('hello');
  const [startDragIndex, setStartDragIndex] = useState<number | null>(null);
  const [ oldIndex, setOldIndex ] = useState<number | null>(null);
  
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
    if (showCenterModal || isSelectedReading) return;

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
    if (showCenterModal || isSelectedReading) return;
    setIsDragging(true);
    setSelectedWordsIndexes([]);
  };

  const handleMouseMove = (index: number) => {
    if (showCenterModal || !isDragging) return;
  
    if (startDragIndex === null) {
      // ドラッグ開始時にtranslation.indexesにindexが含まれているかチェック
      const startTranslation = document!.translations.find(t => t.indexes.includes(index));
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
        const translation = document!.translations.find(t => t.indexes.includes(i));
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
      doc={document!}
      handleClick={handleClick}
      handleMouseMove={handleMouseMove}
      handleMouseDown={handleMouseDown}
      handleMouseUp={handleMouseUp}
      selectedWordsIndexes={selectedWordsIndexes}
      selectedWords={selectedWords}
      isSelectedReading={isSelectedReading}
    />
  );
}

export default React.memo(TranslateDocument);

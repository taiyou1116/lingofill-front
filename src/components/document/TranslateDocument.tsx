import React, { memo, useState } from "react";
import { useStore } from "@/store/store";
import { Tooltip } from "@mui/material";
import { m_plus_rounded_1c } from "@/store/fontStore";
import { Document } from "@/types/types";
import TranslateModalMemo from "./TranslateModal";

const MemoizedDocumentComponent = memo(TranslateDocument);

type Props = {
  words: string[] | undefined,
}

function TranslateDocumentMemo(props: Props) {
  const { words } = props;

  const {showCenterModal, flipCenterModal, document, selectedWordsIndexes, setSelectedWordsIndexes} = useStore((store) => ({
    showCenterModal: store.showCenterModal,
    flipCenterModal: store.flipCenterModal,
    document:        store.document,
    selectedWordsIndexes: store.selectedWordsIndexes,
    setSelectedWordsIndexes: store.setSelectedWordsIndexes,
  }));

  return (
    <div>
      <MemoizedDocumentComponent 
        words={words}
        showCenterModal={showCenterModal}
        flipCenterModal={flipCenterModal}
        document={document}
        selectedWordsIndexes={selectedWordsIndexes}
        setSelectedWordsIndexes={setSelectedWordsIndexes}
      />
    </div>
  );
}

export default TranslateDocumentMemo;

type TranslateDocumentType = {
  words: string[] | undefined,
  showCenterModal: boolean,
  flipCenterModal: () => void,
  document: Document | null,
  selectedWordsIndexes: number[],
  setSelectedWordsIndexes: (selectedWordsIndexes: number[]) => void,
}

function TranslateDocument(props: TranslateDocumentType) {
  const { words, showCenterModal, flipCenterModal, document, selectedWordsIndexes, setSelectedWordsIndexes } = props;

  // ドラッグ処理(熟語処理)
  const [isDragging, setIsDragging] = useState(false);
  const [selectedWords, setSelectedWords] = useState('hello');
  const [startDragIndex, setStartDragIndex] = useState<number | null>(null); // ドラッグ開始インデックス 
  
  // 単語編集処理
  const handleClick = (index: number) => {
    if (showCenterModal) return;

    const translation = document!.translations.find(translation => translation.indexes.includes(index));
    if (translation) {
      setSelectedWordsIndexes(translation.indexes);
      setSelectedWords(translation.indexes.map((i) => words![i]).join(' '));
    } else {
      setSelectedWordsIndexes([index]);
      setSelectedWords( words![index]);
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
      setSelectedWords(selectedWordsIndexes.map((i) => words![i]).join(' '));
    }
  };

  return (
    <div className="break-all overflow-y-auto max-h-[calc(100vh-200px)] p-3 rounded-md bg-white dark:bg-slate-600 dark:text-slate-300" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      {words?.map((word, index) => {
        // すでに日本語訳されているか確認
        const translation = document!.translations.find(translation => translation.indexes.includes(index));

        // 単語 or 熟語の一文字目か確認
        if (translation && translation.indexes[0] === index) {
          return (
            <span
              key={index}
              onClick={() => handleClick(index)}
              onMouseMove={() => handleMouseMove(index)}
              className={`select-none py-0.5 px-1 mx-0.5 cursor-pointer rounded-md bg-slate-200 dark:bg-slate-900 text-sm`}
            >
              <Tooltip
                key={index} 
                title={
                <div className={` text-sm ${m_plus_rounded_1c.className}`}>
                  <div className=' memo-output'>{ translation.memo }</div>
                </div>}
              >
                <span>{ translation.translatedText }</span>
              </Tooltip>
            </span>
          );
        } else if (!translation) {
          // 翻訳されていない単語、または熟語の2番目以降の単語をスキップ
          return (
            <span
              key={index}
              onClick={() => handleClick(index)}
              onMouseMove={() => handleMouseMove(index)}
              className={`select-none cursor-pointer ${ document?.language !== 'ja' && document?.language !== 'zh' ? 'p-0.5' : '' } ${selectedWordsIndexes.includes(index) ? "bg-blue-300 dark:bg-blue-500" : "bg-transparent"}`}
            >
              {word}
            </span>
          );
        }
      })}
      <div>
        <TranslateModalMemo
          selectedWordsIndexes={selectedWordsIndexes}
          selectedWords={selectedWords}
        />
      </div>
    </div>
  )
}
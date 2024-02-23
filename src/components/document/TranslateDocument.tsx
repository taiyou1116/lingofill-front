import React, { useState } from "react";
import { useStore } from "@/store/store";
import TranslateModal from "./TranslateModal";

type TranslateDocumentType = {
  words: string[] | undefined,
}

function TranslateDocument(props: TranslateDocumentType) {
  const { words } = props;
  
  const {showCenterModal, flipCenterModal, document} = useStore((store) => ({
    showCenterModal: store.showCenterModal,
    flipCenterModal: store.flipCenterModal,
    document:        store.document,
  }));

  // ドラッグ処理(熟語処理)
  const [selectedWordsIndexes, setSelectedWordsIndexes] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // 単語編集処理
  const handleClick = (index: number) => {
    if (showCenterModal) return;

    const translation = document!.translations.find(translation => translation.indexes.includes(index));
    if (translation) {
      setSelectedWordsIndexes(translation.indexes);
    } else {
      setSelectedWordsIndexes([index]);
    }
    flipCenterModal();
  };

  // 熟語編集処理(Down Move Up)
  const handleMouseDown = () => {
    if (showCenterModal) return;
    setIsDragging(true);
    setSelectedWordsIndexes([]);
  };
  
  const handleMouseMove = (index: number) => {
    if (showCenterModal || !isDragging) return;

    setSelectedWordsIndexes((prev) => {
      if (prev.includes(index)) return prev;

      const firstSelectedIndex = prev[0];
      const lastSelectedIndex = prev[prev.length - 1];

      // 選択されている単語があり、新しいインデックスが隣接していない場合は何も変更しない
      if (prev.length > 0 && Math.abs(lastSelectedIndex - index) !== 1 && Math.abs(firstSelectedIndex - index) !== 1) {
        return prev;
      }
      return firstSelectedIndex > index ? [index, ...prev] : [...prev, index];
    });
  };

  const handleMouseUp = () => {
    if (showCenterModal) return;
    setIsDragging(false);
    if (selectedWordsIndexes.length >= 2) {
      flipCenterModal();
    }
  };

  return (
    <div className="break-all select-none" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
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
              className={`py-0.5 px-2 cursor-pointer bg-slate-200 rounded-md`}
            >
              {translation.translatedText}
            </span>
          );
        } else if (!translation) {
          // 翻訳されていない単語、または熟語の2番目以降の単語をスキップ
          return (
            <span
              key={index}
              onClick={() => handleClick(index)}
              onMouseMove={() => handleMouseMove(index)}
              className={`p-0.5 cursor-pointer ${selectedWordsIndexes.includes(index) ? "bg-yellow-200" : "bg-transparent"}`}
            >
              {word}
            </span>
          );
        }
      })}

      <div>
        <TranslateModal 
          words={words}
          selectedWordIndexes={selectedWordsIndexes}
        />
      </div>
    </div>
  )
}

export default TranslateDocument
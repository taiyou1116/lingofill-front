import React, { useState } from "react";
import { useStore } from "@/store/store";
import { TranslationObj } from "@/types/types";

type TranslateDocumentType = {
    words: string[] | undefined,
    translations: TranslationObj[],
    setSelectedWordsIndexes: React.Dispatch<React.SetStateAction<number[]>>,
    selectedWordsIndexes: number[],
}

function TranslateDocument(props: TranslateDocumentType) {
  const { words, translations, selectedWordsIndexes, setSelectedWordsIndexes} = props;
    // store
  const showCenterModal = useStore((store) => store.showCenterModal);
  const flipCenterModal = useStore((store) => store.flipCenterModal);
  
  // ドラッグ処理(熟語処理)
  const [isDragging, setIsDragging] = useState(false);
  
    // 単語をクリックして編集
  const handleClick = (index: number) => {
    if (showCenterModal) return;

    const translation = translations.find(translation => translation.indexes.includes(index));
    if (translation) {
      setSelectedWordsIndexes(translation.indexes);
    } else {
      setSelectedWordsIndexes([index]);
    }
    // ここでModalを開く
    flipCenterModal();
  };

    const handleMouseDown = () => {
        if (showCenterModal) return;
        setIsDragging(true);
        setSelectedWordsIndexes([]);
      };
    
      const handleMouseMove = (index: number) => {
        if (showCenterModal) return;
        if (!isDragging) return;
        setSelectedWordsIndexes((prev) => {
          // 重複選択を避けるために新しいインデックスだけを追加
          return prev.includes(index) ? prev : [...prev, index];
        });
      };
    
      const handleMouseUp = () => {
        if (showCenterModal) return;
        setIsDragging(false);
        if (selectedWordsIndexes.length >= 2) {
          // ここでModalを開く
          flipCenterModal();
        }
      };

  return (
    <div className="break-all" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      {words?.map((word, index) => {
        // すでに日本語訳されているか確認
        const translation = translations.find(translation => translation.indexes.includes(index));

        // 単語、熟語の一文字目か確認
        if (translation && translation.indexes[0] === index) {
          return (
            <span
              key={index}
              onClick={() => handleClick(index)} // 熟語選択のロジックが必要
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
    </div>
  )
}

export default TranslateDocument
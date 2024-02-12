"use client"
import ModalCenterComponent from "@/components/ModalCenterComponent";
import { useStore } from "@/store/store";
import { TranslationObj } from "@/types/types";
import React, { useState } from "react";

function SentenceComponent() {
  const text = useStore((store) => store.text);
  // 英単語s
  const words = text.split(" ");
  // store
  const showCenterModal = useStore((store) => store.showCenterModal);
  const flipCenterModal = useStore((store) => store.flipCenterModal);
  
  // ドラッグ処理(熟語処理)
  const [isDragging, setIsDragging] = useState(false);
  const [selectedWordsIndexes, setSelectedWordsIndexes] = useState<number[]>([]);
  // 翻訳管理(日本語化された単語)
  const [translations, setTranslations] = useState<TranslationObj[]>([]);

  const handleTranslasiton = (selectedWordIndexes: number[], userInput: string) => {
    const newTranslation = userInput;
  
    // translationsが未定義の場合は空の配列を使用
    let updatedTranslations = translations ? [...translations] : [];
    
    // 複数のindexesに対応するために、既存の翻訳を検索するロジックを調整
    const existingTranslationIndexes = selectedWordIndexes.map(index => 
      updatedTranslations.findIndex(translation => translation.indexes.includes(index))
    ).filter(index => index !== -1);

    if (existingTranslationIndexes.length > 0) {
      // 既存の翻訳を更新（複数のindexesが存在する場合は、最初に見つかったものを更新）
      const firstExistingIndex = existingTranslationIndexes[0];
      updatedTranslations[firstExistingIndex] = {
        ...updatedTranslations[firstExistingIndex],
        translatedText: newTranslation,
      };
    } else {
      // 新しい翻訳を追加
      updatedTranslations.push({
        indexes: selectedWordIndexes,
        translatedText: newTranslation,
      });
    }
    setTranslations(updatedTranslations);
  };

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
    <div className="p-5 break-all" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      {words.map((word, index) => {
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
      <div>
        <ModalCenterComponent 
          words={words}
          selectedWordIndexes={selectedWordsIndexes}
          onSaveTranslation={handleTranslasiton}
        />
      </div>
    </div>
  );
}

export default SentenceComponent
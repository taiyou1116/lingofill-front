"use client"
import ModalCenterComponent from "@/components/ModalCenterComponent";
import { useStore } from "@/store/store";
import { TranslationObj } from "@/types/types";
import React, { useState } from "react";
import TranslateDocument from "./TranslateDocument";

function DocumentComponent() {
  const text = useStore((store) => store.document?.text);
  // 英単語s
  const words = text?.split(" ");
  // store
  const selectedmode = useStore((store) => store.selectedmode);
  
  // // ドラッグ処理(熟語処理)
  // const [isDragging, setIsDragging] = useState(false);
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

  return (
    <div className=" h-full p-5">
      { selectedmode === 'edit' 
      ?
        <TranslateDocument 
          words={words}
          translations={translations}
          selectedWordsIndexes={selectedWordsIndexes}
          setSelectedWordsIndexes={setSelectedWordsIndexes}
        />
      :
        <div className=" h-full">
          <textarea
            className=" resize-none h-full w-full p-1 border-2"
            placeholder="原文を入力 Ctrl + V" 
          />
        </div>
      }

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

export default DocumentComponent
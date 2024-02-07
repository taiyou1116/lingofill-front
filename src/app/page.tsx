"use client"
import ModalCenterComponent from "@/components/ModalCenterComponent";
import { useStore } from "@/store/store";
import { translationObj } from "@/types/types";
import React, { useState } from "react";

export default function Home() {
  const allWords = "In the realm of software development, a significant paradigm shift has been observed towards embracing cloud-native technologies. This transition is not merely a trend but a strategic move to leverage the inherent scalability, resilience, and flexibility offered by cloud platforms. As organizations migrate their infrastructures and applications to the cloud, they unlock new avenues for innovation and efficiency. This evolution is pivotal for staying competitive in today's fast-paced digital landscape, where the ability to rapidly adapt and respond to market demands is crucial for success.";
  const words = allWords.split(" ");

  // store
  const flipCenterModal = useStore((store) => store.flipCenterModal);
  const setSelectedWordIndex = useStore((store) => store.setSelectedWordIndex);

  // 一時状態管理
  const [isDragging, setIsDragging] = useState(false);
  const [selectedWords, setSelectedWords] = useState<number[]>([]);

  // 翻訳管理
  const [translations, setTranslations] = useState<translationObj[]>([]);

  const handleTranslasiton = (index: number, event: string) => {
    const newTransition = event;
  
    // translationsが未定義の場合は空の配列を使用
    let updatedTranslations = translations ? [...translations] : [];
  
    // 既存の訳を探す
    const existingTranslationIndex = updatedTranslations.findIndex(translation => translation.indexes.includes(index));
  
    if (existingTranslationIndex !== -1) {
      // 既存の訳を更新
      updatedTranslations[existingTranslationIndex] = {
        ...updatedTranslations[existingTranslationIndex],
        translationedText: newTransition,
      };
    } else {
      // 新しい訳を追加
      updatedTranslations.push({
        indexes: [index],
        translationedText: newTransition,
      });
    }
    setTranslations(updatedTranslations);
  };

  // 単語を編集(クリック)
  const handleClick = (index: number) => {
    setSelectedWords(current => [...current, index]);
    // ここでModalを開く => ModalでhandleInputChange関数実行
    flipCenterModal();
    setSelectedWordIndex(index);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
    setSelectedWords([]);
  };

  const handleMouseMove = (index: number) => {
    if (!isDragging) return;
    setSelectedWords((prev) => {
      // 重複選択を避けるために新しいインデックスだけを追加
      return prev.includes(index) ? prev : [...prev, index];
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="p-5 break-all" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      {words.map((word, index) => {
        // すでに日本語訳されているか確認
        const translation = translations.find(translation => translation.indexes.includes(index));
        return (
          <span
            key={index}
            onClick={() => handleClick(index)}
            onMouseMove={() => handleMouseMove(index)}
            className={`p-0.5 cursor-pointer ${selectedWords.includes(index) ? "bg-yellow-200" : "bg-transparent"}`}
          >
            { translation 
            ? 
              translation.translationedText
            : 
              word 
            }
          </span>
        );
      })}
      <div>
        <ModalCenterComponent 
          onSaveTranslation={(index, translation) => handleTranslasiton(index, translation)}
        />
      </div>
    </div>
  );
}


"use client"
import ModalCenterComponent from "@/components/ModalCenterComponent";
import { useStore } from "@/store/store";
import { Document, TranslationObj } from "@/types/types";
import React, { useState } from "react";
import TranslateDocument from "./TranslateDocument";

function DocumentComponent() {
  const text = useStore((store) => store.document?.text);
  // 英単語s
  const words = text?.split(" ");
  // store
  const selectedmode = useStore((store) => store.selectedmode);
  const document = useStore((store) => store.document);
  const setDocument = useStore((store) => store.setDocument);

  // 一回このcomponentで監視用documentを作る。保存の時にsetDocumentすればいいのかも
  
  // // ドラッグ処理(熟語処理)
  const [selectedWordsIndexes, setSelectedWordsIndexes] = useState<number[]>([]);
  // 翻訳管理(日本語化された単語)
  const [translations, setTranslations] = useState<TranslationObj[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const d: Document = {
      title: document!.title,
      text: e.target.value,
    }
    console.log(d.text);
    setDocument(d);
  }

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

  const renderContentByMode = () => {
    if (document === null) {
      return (
        <div>テキストを選択もしくは作成してください。</div>
      )
    }

    switch (selectedmode) {
      case 'edit':
        return (
          <TranslateDocument 
            words={words}
            translations={translations}
            selectedWordsIndexes={selectedWordsIndexes}
            setSelectedWordsIndexes={setSelectedWordsIndexes}
          />
        );
        case 'preview':
        return (
          <div className=" h-full">
            preview
          </div>
        );
      case 'input':
        return (
          <div className=" h-full">
            <textarea
              className=" resize-none h-full w-full p-1 border-2"
              placeholder="原文をペースト (Ctrl + V)" 
              value={document?.text}
              onChange={handleChange}
            />
          </div>
        );
      default:
        return <div>不明なモードです。</div>;
    }
  }

  return (
    <div className=" h-full p-5">
      { renderContentByMode() }

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
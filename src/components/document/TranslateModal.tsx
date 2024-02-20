"use client"

import { useStore } from '@/store/store';
import React, { useState } from 'react'
import "../../app/globals.css";
import { handleCloseModal } from '@/utils/modal';
import { Document } from '@/types/types';
import ModalCenterComponent from '../ModalCenter';

type TranslateModalProps = {
  words: string[] | undefined,
  selectedWordIndexes: number[],
}

function TranslateModal(props: TranslateModalProps) {
  const { words, selectedWordIndexes } = props;

  const flipCenterModal = useStore((store) => store.flipCenterModal);
  const setDocuments = useStore((store) => store.setDocuments);
  const document = useStore((store) => store.document);
  const documents = useStore((store) => store.documents);
  
  const [userInput, setUserInput] = useState('');

  // 日本語化ボタン
  const handleSaveButton = () => {
    handleTranslation(selectedWordIndexes, userInput);
    handleCloseModal(flipCenterModal);
  }

  const handleTranslation = (selectedWordIndexes: number[], userInput: string) => {
    const newTranslation = userInput;
  
    // translationsが未定義の場合は空の配列を使用
    let updatedTranslations = document!.translations ? [...document!.translations] : [];
    
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

    // documentを変更する
    // とりま汚いけど、あとで直す
    if (!document) return;

    const updatedDocument: Document = { ...document, 
      translations: updatedTranslations,
      isSynced: false 
    };
    console.log(updatedTranslations);
    const updatedDocuments: Document[] = documents.map((doc) =>
      doc.sortKey === document!.sortKey ? updatedDocument : doc
    );
    setDocuments(updatedDocuments);
  };

  return (
    <ModalCenterComponent>
        <div className=' w-full'>
          <div>翻訳</div>
          <div className=' w-full flex justify-center items-center gap-3'>
            { selectedWordIndexes.map((index) => {
              return <span key={index}>{words![index]}</span>
            }) } 
            →
            <input 
              type='text' 
              placeholder='日本語' 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className=' border border-stone-900 p-1 rounded-sm w-1/3 modal-center-input'/>
          </div>
        </div>
        <div className=' w-full h-full flex flex-col gap-1'>
          <div>メモ</div>
          <textarea 
            placeholder='' 
            className=' border p-1 w-full h-2/3 resize-none rounded-sm border-stone-900' />
        </div>
        <button 
          className=' bg-sky-400 px-4 py-2 rounded-md'
          onClick={handleSaveButton}
        >
          保存する
        </button>
    </ModalCenterComponent>
  )
}

export default TranslateModal
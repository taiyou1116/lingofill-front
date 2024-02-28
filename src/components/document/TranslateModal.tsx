"use client"

import { useStore } from '@/store/store';
import React, { useEffect, useState } from 'react'
import "../../app/globals.css";
import { handleCloseModal } from '@/utils/modal';
import { Document } from '@/types/types';
import ModalCenterComponent from '../ModalCenter';
import { convertTextToSpeech, translateText } from '@/utils/request';
import { ContentPaste, StarBorder, Translate, VolumeUp } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

type TranslateModalProps = {
  selectedWordsIndexes: number[],
  selectedWords: string,
}

function TranslateModal(props: TranslateModalProps) {
  const { selectedWordsIndexes, selectedWords } = props;

  const {flipCenterModal, document, setDocuments, documents, setDocument} = useStore((store) => ({
    flipCenterModal: store.flipCenterModal,
    document:        store.document,
    setDocuments:    store.setDocuments,
    documents:       store.documents,
    setDocument:     store.setDocument,
  }));
  
  const [userInputTranslation, setUserInputTranslation] = useState('');
  const [userInputMemo, setUserInputMemo] = useState('');
  const [translatedWords, setTranslatedWords] = useState('');

  useEffect(() => {
    const translateTextAsync = async () => {
      const ward = await translateText(selectedWords);
      setTranslatedWords(ward!);

      // 表示, memoがあれば最初から入れておく
      const translation = document!.translations.find(translation => translation.indexes.includes(selectedWordsIndexes[0]));
      if (translation === undefined) {
        setUserInputTranslation('');
        setUserInputMemo('');
      } else {
        setUserInputTranslation(translation.translatedText);
        setUserInputMemo(translation.memo);
      }
    }
    translateTextAsync();
  }, [selectedWords])

  // 日本語化ボタン
  const handleSaveButton = () => {
    handleTranslation(selectedWordsIndexes, userInputTranslation, userInputMemo);
    handleCloseModal(flipCenterModal);
  }

  let audio: undefined | HTMLAudioElement;

  // 読み上げ
  const listenText = async (text: string) => {
    try {
      if (audio !== undefined) {
        audio.pause();
        audio.currentTime = 0;
      }
      audio = await convertTextToSpeech(text);
    } catch(err) {
      console.error(err);
    }
  }

  const handleTranslation = (selectedWordIndexes: number[], userInput: string, userInputMemo: string) => {
    const newTranslation = userInput;
    const newMemo = userInputMemo;
  
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
        memo: newMemo,
      };
    } else {
      // 新しい翻訳を追加
      updatedTranslations.push({
        indexes: selectedWordIndexes,
        translatedText: newTranslation,
        memo: newMemo,
      });
    }

    // documentを変更する
    // とりま汚いけど、あとで直す
    if (!document) return;

    const updatedDocument: Document = { ...document, 
      translations: updatedTranslations,
      isSynced: false 
    };
    const updatedDocuments: Document[] = documents.map((doc) =>
      doc.sortKey === document!.sortKey ? updatedDocument : doc
    );
    setDocuments(updatedDocuments);
    setDocument(updatedDocument);
  };

  return (
    <ModalCenterComponent>
        <div className=' w-full'>
          <div className=' w-full flex flex-col justify-center items-center gap-3'>
            <div className=' flex gap-3 items-center justify-center'>
              <span className='selectedWordsContainer'>
                <Tooltip title='読み上げ' className=' mr-2 cursor-pointer' onClick={() => listenText(selectedWords)}>
                  <VolumeUp style={{fontSize: 20}}/>
                </Tooltip>
                { selectedWords }
              </span>
              <span className='selectedWordsContainer bg-gray-200 dark:bg-gray-900 p-1'>
                <Translate style={{fontSize: 20}}/> { translatedWords }
              </span>
            </div>
            ↓
            <div className=' flex w-full gap-3 justify-center items-center'>
              <input 
              type='text' 
              placeholder='どのように表示する？' 
              value={userInputTranslation}
              onChange={(e) => setUserInputTranslation(e.target.value)}
              className=' border border-gray-900 p-1 w-1/3 modal-center-input rounded-md dark:bg-gray-800 dark:border-gray-400 dark:text-gray-100'
            />
              <button onClick={() => setUserInputTranslation(selectedWords)} className=' flex items-center text-xs bg-gray-800 text-gray-300 dark:bg-gray-200 rounded-md px-1 py-1 dark:text-gray-800'>
                <ContentPaste style={{fontSize: 20}} />原文
              </button>
              <button onClick={() => setUserInputTranslation(translatedWords)}  className=' flex items-center text-xs bg-gray-800 text-gray-300 dark:bg-gray-200 rounded-md px-1 py-1 dark:text-gray-800'>
                <ContentPaste style={{fontSize: 20}} />翻訳
              </button>
              <Tooltip title='お気に入り登録'>
                <StarBorder className=' cursor-pointer'/>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className=' w-full h-full flex flex-col gap-1'>
          <div className=' flex gap-1 items-center'>
            <button onClick={() => setUserInputMemo(selectedWords)} className=' flex items-center text-xs bg-gray-800 text-gray-300 dark:bg-gray-200 rounded-md px-1 py-1 dark:text-gray-800'>
              <ContentPaste style={{fontSize: 20}} />原文をメモに
            </button>
            <button onClick={() => setUserInputMemo(translatedWords)}  className=' flex items-center text-xs bg-gray-800 text-gray-300 dark:bg-gray-200 rounded-md px-1 py-1 dark:text-gray-800'>
              <ContentPaste style={{fontSize: 20}} />翻訳をメモに
            </button>
          </div>
          <textarea 
            placeholder='メモをここに入力（例：文脈、用法、訳文など）'
            className=' border p-1 h-full w-full resize-none rounded-md border-stone-900 dark:bg-gray-800 dark:border-gray-400 dark:text-gray-100' 
            value={userInputMemo}
            onChange={(e) => setUserInputMemo(e.target.value)}
          />
        </div>
        <button 
          className='px-2 py-1 md:px-4 md:py-2 bg-gray-800 text-gray-200 rounded-md dark:bg-white dark:text-black'
          onClick={handleSaveButton}
        >
          保存する
        </button>
    </ModalCenterComponent>
  )
}

export default TranslateModal
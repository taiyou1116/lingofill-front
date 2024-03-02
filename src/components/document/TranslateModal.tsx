"use client"

import { useStore } from '@/store/store';
import React, { memo, useEffect, useRef, useState } from 'react'
import "../../app/globals.css";
import { handleCloseModal } from '@/utils/modal';
import { Document } from '@/types/types';
import { convertTextToSpeech, getVoiceForLanguage, translateText } from '@/utils/request';
import { ContentPaste, Save, StarBorder, Translate, VolumeUp } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import ModalCenterMemo from '../ModalCenter';

const MemoizedDocumentComponent = memo(TranslateModal);

type Props = {
  selectedWordsIndexes: number[],
  selectedWords: string,
}

function TranslateModalMemo(props: Props) {
  const { selectedWordsIndexes, selectedWords } = props;
  const {flipCenterModal, document, setDocuments, documents, setDocument} = useStore((store) => ({
    flipCenterModal: store.flipCenterModal,
    document:        store.document,
    setDocument:     store.setDocument,
    documents:       store.documents,
    setDocuments:    store.setDocuments,
  }));

  return (
    <div>
      <MemoizedDocumentComponent 
        selectedWordsIndexes={selectedWordsIndexes}
        selectedWords={selectedWords}
        flipCenterModal={flipCenterModal}
        document={document}
        setDocument={setDocument}
        documents={documents}
        setDocuments={setDocuments}
      />
    </div>
  );
}

export default TranslateModalMemo;

type TranslateModalProps = {
  selectedWordsIndexes: number[],
  selectedWords: string,
  flipCenterModal: () => void,
  document: Document | null,
  setDocument: (document: Document | null) => void,
  documents: Document[],
  setDocuments: (documents: Document[]) => void,
}

function TranslateModal(props: TranslateModalProps) {
  const { selectedWordsIndexes, selectedWords, flipCenterModal, document, setDocument, documents, setDocuments } = props;
  
  const [userInputTranslation, setUserInputTranslation] = useState('');
  const [userInputMemo, setUserInputMemo] = useState('');
  const [translatedWords, setTranslatedWords] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* selectedWordsが更新されたら
    - 選んだワードの翻訳 
    - ブロック、メモがすでにある場合は格納 
  */
  useEffect(() => {
    if (document === null) return;
    const translateTextAsync = async () => {
      const translatedText = await translateText(selectedWords, document.language, document.translateLanguage);
      if (translatedText === undefined) return;
      setTranslatedWords(translatedText);
    }
    
    const translation = document.translations.find(translation => translation.indexes.includes(selectedWordsIndexes[0]));
    if (translation === undefined) {
      setUserInputTranslation('');
      setUserInputMemo('');
    } else {
      setUserInputTranslation(translation.translatedText);
      setUserInputMemo(translation.memo);
    }
    translateTextAsync();
  }, [selectedWords])

  // amazon Pollyで読み上げ
  const listenText = async (text: string) => {
    try {
      if (audioRef.current !== null) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const voice = getVoiceForLanguage(document!.language);
      audioRef.current = await convertTextToSpeech(text, voice);
      audioRef.current.play();
    } catch(err) {
      console.error(err);
    }
  }

  const deleteBlock = () => {
    if (!document) return;

    // 選択された単語のインデックスを含まない翻訳をフィルタリング
    const updatedTranslations = document.translations.filter(
      (translation) => !translation.indexes.includes(selectedWordsIndexes[0])
    );
    const updatedDocument = {
      ...document,
      translations: updatedTranslations,
      isSynced: false,
    };
    const updatedDocuments = documents.map((doc) =>
      doc.sortKey === document!.sortKey ? updatedDocument : doc
    );
    setDocuments(updatedDocuments);
    setDocument(updatedDocument);
  }

  const handleSaveButton = () => {
    handleTranslation(selectedWordsIndexes, userInputTranslation, userInputMemo);
    handleCloseModal(flipCenterModal);
  }

  const handleTranslation = (selectedWordIndexes: number[], userInput: string, userInputMemo: string) => {
    if (!document) return;
    // translationsのコピーを作成（不変性を保持）
    let updatedTranslations = [...(document.translations ?? [])];

    // 選択された単語のインデックスに基づく既存の翻訳を検索
    const existingTranslationIndex = updatedTranslations.findIndex(translation =>
      selectedWordIndexes.some(index => translation.indexes.includes(index))
    );

    if (existingTranslationIndex !== -1) {
      // 既存の翻訳を更新
      updatedTranslations[existingTranslationIndex] = {
        ...updatedTranslations[existingTranslationIndex],
        translatedText: userInput,
        memo: userInputMemo,
      };
    } else {
      // 新しい翻訳を追加
      updatedTranslations.push({
        indexes: selectedWordIndexes,
        translatedText: userInput,
        memo: userInputMemo,
      });
    }

    // 更新されたドキュメントオブジェクトを作成
    const updatedDocument: Document = {
      ...document,
      translations: updatedTranslations,
      isSynced: false,
    };

    // documents 配列を更新
    const updatedDocuments = documents.map(doc =>
      doc.sortKey === document.sortKey ? updatedDocument : doc
    );

    setDocuments(updatedDocuments);
    setDocument(updatedDocument);
  };

  return (
    <ModalCenterMemo>
        <div className=' w-full'>
          <div className=' w-full flex flex-col justify-center items-center gap-3'>
            <div className=' flex gap-3 items-center justify-center'>
              <span className={`selectedWordsContainer `}>
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
              placeholder='ブロックの表示' 
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
        <div className=' flex gap-3'>
          <button 
            className='px-4 py-1 md:px-4 md:py-2 bg-gray-800 text-gray-200 rounded-md dark:bg-white dark:text-black'
            onClick={handleSaveButton}
          >
            <div className=' flex gap-1 items-center'><Save />保存する</div>
          </button>
          <button 
            className=' text-gray-400 rounded-md '
            onClick={deleteBlock}
          >
            ブロックを取り消す
          </button>
        </div>
    </ModalCenterMemo>
  )
}
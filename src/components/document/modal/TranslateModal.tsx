"use client"

import { useStore } from '@/store/store';
import React, { memo, useEffect, useState } from 'react'
import "../../../app/globals.css";
import { Document } from '@/types/types';
import { translateText } from '@/utils/request';
import ModalCenterMemo from '../../ModalCenter';
import ReadingButton from './ReadingButton';
import InputBlock from './InputBlock';
import InputMemo from './InputMemo';
import SaveButton from './SaveButton';
import DeleteBlockButton from './DeleteBlockButton';

const MemoizedDocumentComponent = memo(TranslateModal);

type Props = {
  selectedWordsIndexes: number[],
  selectedWords: string,
  audioRef: React.MutableRefObject<HTMLAudioElement>,
}

function TranslateModalMemo(props: Props) {
  const { selectedWordsIndexes, selectedWords, audioRef } = props;
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
        audioRef={audioRef}
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
  audioRef: React.MutableRefObject<HTMLAudioElement>,
}

function TranslateModal(props: TranslateModalProps) {
  const { selectedWordsIndexes, selectedWords, document, setDocument, documents, setDocuments, audioRef } = props;
  
  const [userInputTranslation, setUserInputTranslation] = useState('');
  const [userInputMemo, setUserInputMemo] = useState('');
  const [translatedWords, setTranslatedWords] = useState('');

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

  return (
    <ModalCenterMemo>
        <div className=' w-full'>
          <div className=' w-full flex flex-col justify-center items-center gap-3'>
            <div className=' flex gap-3 items-center justify-center'>
              <span className={`selectedWordsContainer `}>
                <ReadingButton 
                  selectedWords={selectedWords}
                  ln={document!.language}
                  audioStream={audioRef.current}
                />
                { selectedWords }
              </span>
              <span className='selectedWordsContainer bg-gray-200 dark:bg-gray-900 p-1'>
                <ReadingButton 
                  selectedWords={translatedWords}
                  ln={document!.translateLanguage}
                  audioStream={audioRef.current}
                />
                { translatedWords }
              </span>
            </div>
            ↓
            <InputBlock 
              selectedWords={selectedWords}
              translatedWords={translatedWords}
              userInputTranslation={userInputTranslation}
              setUserInputTranslation={setUserInputTranslation}
            />
          </div>
        </div>
        <InputMemo 
          selectedWords={selectedWords}
          translatedWords={translatedWords}
          userInputMemo={userInputMemo}
          setUserInputMemo={setUserInputMemo}
        />
        <div className=' flex gap-3'>
          <SaveButton 
            selectedWordsIndexes={selectedWordsIndexes}
            userInputTranslation={userInputTranslation}
            userInputMemo={userInputMemo}
            document={document}
            setDocument={setDocument}
            documents={documents}
            setDocuments={setDocuments}
          />
          <DeleteBlockButton 
            document={document}
            setDocument={setDocument}
            documents={documents}
            setDocuments={setDocuments}
            selectedWordsIndexes={selectedWordsIndexes}
          />
        </div>
    </ModalCenterMemo>
  )
}
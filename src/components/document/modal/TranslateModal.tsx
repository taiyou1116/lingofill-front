"use client"

import React, { useEffect, useState } from 'react'
import "../../../app/globals.css";
import { splitTextToSegments, translateText } from '@/utils/request';
import ReadingButton from './ReadingButton';
import InputBlock from './InputBlock';
import InputMemo from './InputMemo';
import SaveButton from './SaveButton';
import DeleteBlockButton from './DeleteBlockButton';
import { GrobalStore } from '@/store/grobalStore';
import ModalCenter from './ModalCenter';

type TranslateModalProps = {
  selectedWordsIndexes: number[],
  selectedWords: string,
}

function TranslateModal(props: TranslateModalProps) {
  const { selectedWordsIndexes, selectedWords } = props;
  const { document, setDocument, documents, setDocuments } = GrobalStore();
  
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
    <ModalCenter>
        <div className=' w-full'>
          <div className=' w-full flex flex-col justify-center items-center gap-3'>
            <div className=' flex gap-3 items-center justify-center'>
              <span className={`selectedWordsContainer `}>
                <ReadingButton 
                  sentences={splitTextToSegments(selectedWords)}
                  ln={document!.language}
                  shouldIncrement={false}
                />
                { selectedWords }
              </span>
              <span className='selectedWordsContainer bg-gray-200 dark:bg-gray-900 p-1'>
                <ReadingButton 
                  sentences={splitTextToSegments(translatedWords)}
                  ln={document!.translateLanguage}
                  shouldIncrement={false}
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
    </ModalCenter>
  )
}

export default React.memo(TranslateModal);
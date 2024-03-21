"use client"

import React, { useEffect, useState } from 'react'
import { GrobalStore } from '@/store/grobalStore';
import { splitTextToSegments } from '@/utils/helper';
import { getTranslation } from '@/utils/request';
import { Formality } from '@aws-sdk/client-translate';
import InputMemo from './InputMemo';
import SaveButton from './SaveButton';
import InputBlock from './InputBlock';
import ModalCenter from './ModalCenter';
import DeleteBlockButton from './DeleteBlockButton';
import ReadAndCopyContainer from './ReadAndCopyContainer';
import "../../../app/globals.css";
import { handleCloseModal } from '@/utils/modal';
import { useTranslation } from 'react-i18next';

type TranslateModalProps = {
  selectedWordsIndexes: number[],
  selectedWords: string,
}

function TranslateModal(props: TranslateModalProps) {
  const { selectedWordsIndexes, selectedWords } = props;
  const { document, setDocument, documents, setDocuments, translationExpression, flipCenterModal } = GrobalStore();
  const { t } = useTranslation();
  
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
      const translatedText = await getTranslation(selectedWords, document.language, document.translateLanguage, translationExpression as Formality );
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
              <ReadAndCopyContainer 
                sentences={splitTextToSegments(selectedWords, document?.language)}
                ln={document!.language}
                shouldIncrement={false}
                words={selectedWords}
              />
              <ReadAndCopyContainer 
                sentences={splitTextToSegments(translatedWords, document?.translateLanguage)}
                ln={document!.translateLanguage}
                shouldIncrement={false}
                words={translatedWords}
                className='bg-gray-200 dark:bg-gray-900'
              />
            </div>
            ↓
            <InputBlock 
              userInputTranslation={userInputTranslation}
              setUserInputTranslation={setUserInputTranslation}
            />
          </div>
        </div>
        <InputMemo 
          userInputMemo={userInputMemo}
          setUserInputMemo={setUserInputMemo}
          selectedWords={selectedWords}
          ln={document?.translateLanguage}
        />
        <div className=' flex gap-3 w-full items-center justify-center'>
          <SaveButton 
            selectedWordsIndexes={selectedWordsIndexes}
            userInputTranslation={userInputTranslation}
            userInputMemo={userInputMemo}
            document={document}
            setDocument={setDocument}
            documents={documents}
            setDocuments={setDocuments}
            selectedWords={selectedWords}
          />
          <DeleteBlockButton 
            document={document}
            setDocument={setDocument}
            documents={documents}
            setDocuments={setDocuments}
            selectedWordsIndexes={selectedWordsIndexes}
          />
          <button onClick={() => handleCloseModal(flipCenterModal)} >{t('document.modal.closeModal')}</button>
        </div>
    </ModalCenter>
  )
}

export default React.memo(TranslateModal);
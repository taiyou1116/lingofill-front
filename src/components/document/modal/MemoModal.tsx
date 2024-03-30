"use client"

import React, { useEffect, useState } from 'react'
import { GrobalStore } from '@/store/grobalStore';
import { useTranslation } from 'react-i18next';

import { splitTextToSegments } from '@/utils/textUtils';
import { getTranslation } from '@/utils/request';
import { Formality } from '@aws-sdk/client-translate';

import Button from '@/components/ui/Button';
import InputMemo from './InputMemo';
import SaveButton from './SaveButton';
import ModalCenter from './ModalCenter';
import DeleteBlockButton from './DeleteBlockButton';
import ReadAndCopyContainer from './ReadAndCopyContainer';

import "../../../app/globals.css";

type TranslateModalProps = {
  selectedWordsIndexes: number[],
  setSelectedWordsIndexes: (indexes: number[]) => void,
  selectedWords: string,
  showCenterModal: boolean,
  handleClose: () => void,
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  setReadingNumber: React.Dispatch<React.SetStateAction<number>>,
}

function TranslateModal(props: TranslateModalProps) {
  const { selectedWordsIndexes, setSelectedWordsIndexes, selectedWords, showCenterModal, handleClose, setPlaying, setReadingNumber } = props;
  const { document } = GrobalStore();
  const { t } = useTranslation();
  
  const [userInputMemo, setUserInputMemo] = useState('');
  const [translatedWords, setTranslatedWords] = useState('');

  useEffect(() => {
    if (document === null) return;

    const translationExpression = localStorage.getItem('translationExpression');

    const translateTextAsync = async () => {
      const translatedText = await getTranslation(selectedWords, 
                                                  document.language, 
                                                  document.translateLanguage, 
                                                  translationExpression as Formality );
      if (translatedText === undefined) return;
      setTranslatedWords(translatedText);
    }
    
    const translation = document.translations.find(translation => translation.indexes.includes(selectedWordsIndexes[0]));

    if (translation === undefined) {
      setUserInputMemo('');
    } else {
      setUserInputMemo(translation.memo);
    }
    translateTextAsync();
  }, [selectedWords])

  const closeModal = () => {
    setSelectedWordsIndexes([]);
    handleClose();
  }

  return (
    <ModalCenter
      showCenterModal={showCenterModal}
      closeModal={closeModal}
    >
      <div className=' w-full'>
        <div className=' w-full flex flex-col justify-center items-center gap-3 dark:text-gray-300'>
          <div className=' flex gap-3 items-center justify-center'>
            <ReadAndCopyContainer 
              sentences={splitTextToSegments(selectedWords, document?.language)}
              ln={document!.language}
              shouldIncrement={false}
              words={selectedWords}
              setIsPlaying={setPlaying}
              setReadingNumber={setReadingNumber}
            />
            <ReadAndCopyContainer 
              sentences={splitTextToSegments(translatedWords, document?.translateLanguage)}
              ln={document!.translateLanguage}
              shouldIncrement={false}
              words={translatedWords}
              className='bg-gray-200 dark:bg-gray-900'
              setIsPlaying={setPlaying}
              setReadingNumber={setReadingNumber}
            />
          </div>
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
          userInputMemo={userInputMemo}
          closeModal={closeModal}
          selectedWordsIndexes={selectedWordsIndexes}
        />
        <DeleteBlockButton 
          closeModal={closeModal}
          selectedWordsIndexes={selectedWordsIndexes}
        />
        <Button
          onClick={closeModal}
        >
          {t('document.modal.closeModal')}
        </Button>
      </div>
    </ModalCenter>
  )
}

export default React.memo(TranslateModal);
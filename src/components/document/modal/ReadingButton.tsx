
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getVoiceForLanguage, processAndSpeak } from '@/utils/audioUtils';

import { Tooltip } from '@mui/material'
import { VolumeUp } from '@mui/icons-material'

type Props = {
  sentences: string[],
  ln: string,
  shouldIncrement: boolean,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  setReadingNumber: React.Dispatch<React.SetStateAction<number>>,
}

function ReadingButton(props: Props) {
  const { sentences, ln, shouldIncrement, setIsPlaying, setReadingNumber } = props;

  const { t } = useTranslation();

  const listenTexts = async (selectedWords: string[]) => {
    const voiceType = localStorage.getItem('voiceType') || 'standard';
    const voiceRate = localStorage.getItem('voiceRate') || '100';
    
    const voice = getVoiceForLanguage(ln, voiceType);

    await processAndSpeak(selectedWords, voice, () => {
      if (shouldIncrement === true) {
        setReadingNumber(0);
      }
      setIsPlaying(true);
    }, () => setIsPlaying(false), () => {
      if (shouldIncrement === true) {
        setReadingNumber(prevNumber => prevNumber + 1);
      }
    }, voiceType, voiceRate);
  }

  return (
    <Tooltip 
      title={t('document.modal.readingButton.readAloud')} 
      className=' mr-0.5 cursor-pointer dark:text-gray-300 hover:text-gray-500' 
      onClick={() => listenTexts(sentences)}
    >
      <VolumeUp style={{fontSize: 20}}/>
    </Tooltip>
  )
}

export default React.memo(ReadingButton);
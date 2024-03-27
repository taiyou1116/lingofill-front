
import React from 'react';
import { GrobalStore } from '@/store/grobalStore';
import { useTranslation } from 'react-i18next';
import { getVoiceForLanguage, processAndSpeak } from '@/utils/audioUtils';
import { Tooltip } from '@mui/material'
import { VolumeUp } from '@mui/icons-material'

type Props = {
  sentences: string[],
  ln: string,
  shouldIncrement: boolean,
}

function ReadingButton(props: Props) {
  const { sentences, ln, shouldIncrement } = props;
  const { setIsPlaying, setReadingNumber, voiceType, voiceRate } = GrobalStore();

  const { t } = useTranslation();

  const listenTexts = async (selectedWords: string[]) => {
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

import React from 'react';
import { GrobalStore } from '@/store/grobalStore';
import { useTranslation } from 'react-i18next';
import { getVoiceForLanguage, processAndSpeak } from '@/utils/helper';
import { Tooltip } from '@mui/material'
import { VolumeUp } from '@mui/icons-material'

type Props = {
  sentences: string[],
  ln: string,
  shouldIncrement: boolean,
}

function ReadingButton(props: Props) {
  const { sentences, ln, shouldIncrement } = props;
  const { setIsPlaying, setReadingNumber } = GrobalStore();

  const { t } = useTranslation();

  const listenTexts = async (selectedWords: string[]) => {
    const voice = getVoiceForLanguage(ln);
    await processAndSpeak(selectedWords, voice, () => {
      if (shouldIncrement === true) {
        setReadingNumber(0);
      }
      setIsPlaying(true);
    }, () => setIsPlaying(false), () => {
      if (shouldIncrement === true) {
        plusOne();
      }
    });
  }

  const plusOne = () => {
    setReadingNumber(prevNumber => prevNumber + 1);
  };

  return (
    <Tooltip title={t('document.modal.readingButton.readAloud')} className=' mr-0.5 cursor-pointer' onClick={() => listenTexts(sentences)}>
      <VolumeUp style={{fontSize: 20}} className=' dark:text-gray-300' />
    </Tooltip>
  )
}

export default React.memo(ReadingButton);
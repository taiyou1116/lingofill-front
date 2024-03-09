
import React from 'react';
import { GrobalStore } from '@/store/grobalStore';
import { useTranslation } from 'react-i18next';
import { getVoiceForLanguage, processAndSpeak } from '@/utils/helper';
import { ContentCopy, VolumeUp } from '@mui/icons-material'
import { Tooltip } from '@mui/material'

type Props = {
  sentences: string[],
  ln: string,
  shouldIncrement: boolean,

  words: string,
  className?: string,
}

function ReadAndCopyContainer(props: Props) {
  const { sentences, ln, shouldIncrement, words, className } = props;
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
    <div>
      <Tooltip title={t('document.modal.readingButton.readAloud')} className=' mr-0.5 cursor-pointer' onClick={() => listenTexts(sentences)}>
        <VolumeUp style={{fontSize: 20}} className='hover:text-gray-300 dark:text-gray-300 dark:hover:text-gray-500' />
      </Tooltip>
      <Tooltip title={t('document.modal.readingButton.copy')} className=' cursor-pointer' onClick={() => navigator.clipboard.writeText(words)}>
        <ContentCopy style={{fontSize: 20}} className='hover:text-gray-300 dark:text-gray-300 dark:hover:text-gray-500' />
      </Tooltip>
      <span className={`selectedWordsContainer p-1 ${className}`}>
        { words }
      </span>
    </div>
    
  )
}

export default React.memo(ReadAndCopyContainer);
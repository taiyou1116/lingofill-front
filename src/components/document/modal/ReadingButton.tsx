import { getVoiceForLanguage, processAndSpeak, splitTextToSegments } from '@/utils/request';
import { VolumeUp } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react';
import { useTranslation } from 'react-i18next';


type Props = {
  selectedWords: string,
  ln: string,
}

function ReadingButton(props: Props) {
  const { selectedWords, ln } = props;
  const { t } = useTranslation();

  const listenTexts = async (text: string) => {
    const textSegments = splitTextToSegments(text);
    const voice = getVoiceForLanguage(ln);
    await processAndSpeak(textSegments, voice);
  }

  return (
    <Tooltip title={t('document.modal.readingButton.readAloud')} className=' mr-2 cursor-pointer' onClick={() => listenTexts(selectedWords)}>
      <VolumeUp style={{fontSize: 20}} className=' dark:text-gray-300' />
    </Tooltip>
  )
}

export default React.memo(ReadingButton);
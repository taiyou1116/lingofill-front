import { convertTextToSpeech, getVoiceForLanguage, processAndSpeak, splitTextToSegments } from '@/utils/request';
import { VolumeUp } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next';


type Props = {
  selectedWords: string,
  ln: string,
}

function ReadingButton(props: Props) {
  const { selectedWords, ln } = props;
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const listenTexts = async (text: string) => {
    // const text = "ここに長い文章を入れます...";
    const textSegments = splitTextToSegments(text);
    const voice = getVoiceForLanguage(ln);
    processAndSpeak(textSegments, voice);
  }
  

  // amazon Pollyで読み上げ
  const listenText = async (text: string) => {
    try {
      if (audioRef.current !== null) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const voice = getVoiceForLanguage(ln);
      audioRef.current = await convertTextToSpeech(text, voice);
      audioRef.current.play();
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <Tooltip title={t('document.modal.readingButton.readAloud')} className=' mr-2 cursor-pointer' onClick={() => listenTexts(selectedWords)}>
      <VolumeUp style={{fontSize: 20}}/>
    </Tooltip>
  )
}

export default ReadingButton
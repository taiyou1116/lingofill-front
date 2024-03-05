import { GrobalStore } from '@/store/grobalStore';
import { getVoiceForLanguage, processAndSpeak, splitTextToSegments } from '@/utils/request';
import { VolumeUp } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  selectedWords: string[],
  ln: string,
}

function ReadingButton(props: Props) {
  const { selectedWords, ln } = props;
  const { setIsPlaying } = GrobalStore();

  const { t } = useTranslation();
  const [ number, setNumber ] = useState(0);

  const listenTexts = async (selectedWords: string[]) => {
    for (let i of selectedWords) {
      console.log("セグメント: " + i);
    }

    const voice = getVoiceForLanguage(ln);
    await processAndSpeak(selectedWords, voice, () => {
      setNumber(0);
      setIsPlaying(true)
    }, () => setIsPlaying(false), () => plusOne());
  }

  // コールバック関数を定義, 数値を足していく, 数値がwords[index]と合うところbg変える
  const plusOne = () => {
    setNumber(prevNumber => prevNumber + 1);
  };

  // number の変更を監視
  useEffect(() => {
    console.log(number);
  }, [number]);

  return (
    <Tooltip title={t('document.modal.readingButton.readAloud')} className=' mr-2 cursor-pointer' onClick={() => listenTexts(selectedWords)}>
      <VolumeUp style={{fontSize: 20}} className=' dark:text-gray-300' />
    </Tooltip>
  )
}

export default React.memo(ReadingButton);
import { getVoiceForLanguage, processAndSpeak, splitTextToSegments } from '@/utils/request';
import { VolumeUp } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next';


type Props = {
  selectedWords: string,
  ln: string,
  audioStream: HTMLAudioElement,
}

function ReadingButton(props: Props) {
  const { selectedWords, ln, audioStream } = props;
  const { t } = useTranslation();

  const listenTexts = async (text: string) => {
    const textSegments = splitTextToSegments(text);
    const voice = getVoiceForLanguage(ln);
    await processAndSpeak(textSegments, voice, audioStream);
  }

  return (
    <Tooltip title={t('document.modal.readingButton.readAloud')} className=' mr-2 cursor-pointer' onClick={() => listenTexts(selectedWords)}>
      <VolumeUp style={{fontSize: 20}}/>
    </Tooltip>
  )
}

export default ReadingButton
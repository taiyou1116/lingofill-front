
import React from 'react'
import { useTranslation } from 'react-i18next';
import { stopAudio } from '@/utils/audioUtils';

import { StopCircle, VolumeMute, VolumeUp } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { UseStateGeneric } from '@/types/types';

type Props = {
  isSelectedReadingState: UseStateGeneric<boolean>,
  isPlayingState: UseStateGeneric<boolean>,
  setReadingNumber: React.Dispatch<React.SetStateAction<number>>
}

function ListenAudio(props: Props) {
  const { isSelectedReadingState, isPlayingState, setReadingNumber } = props;
  const { value: isSelectedReading, setValue: setIsSelectedReading } = isSelectedReadingState;
  const { value: isPlaying, setValue: setIsPlaying } = isPlayingState;
  const { t } = useTranslation();

  const TooltipClass = ` 
    cursor-pointer p-1 hover:rounded hover:bg-gray-200 
    dark:text-gray-300 dark:hover:bg-gray-800 `
    ;
  
  const StopReading = () => {
    setIsPlaying(false);
    stopAudio();
    setReadingNumber(-1);
  }

  return (
    <div className="bg-white border dark:border-gray-900 dark:bg-gray-900 rounded-lg p-1">
      { (!isSelectedReading)
      ?
        <Tooltip
          title={t('document.header.aloud.onAloud')} 
          className={TooltipClass}
          onClick={() => setIsSelectedReading(true)}
        >
          <VolumeMute style={{ fontSize: 25 }} />
        </Tooltip>
      :
        (!isPlaying)
        ? 
          <Tooltip 
            title={t('document.header.aloud.offAloud')} 
            className={TooltipClass}
            onClick={() => setIsSelectedReading(false)}
          >
            <VolumeUp style={{ fontSize: 25 }} />
          </Tooltip>
        :
          <Tooltip title='止める' className=' cursor-pointer' onClick={StopReading}>
            <StopCircle style={{fontSize: 20}} className=' dark:text-gray-300' />
          </Tooltip>
      }
    </div>
  )
}

export default ListenAudio

import React from 'react'
import { useTranslation } from 'react-i18next';
import { GrobalStore } from '@/store/grobalStore';

import { stopAudio } from '@/utils/helper';

import { StopCircle, VolumeMute, VolumeUp } from '@mui/icons-material'
import { Tooltip } from '@mui/material'


type Props = {
  isSelectedReading: boolean,
  setIsSelectedReading: React.Dispatch<React.SetStateAction<boolean>>,
}

function ListenAudio(props: Props) {
  const { isSelectedReading, setIsSelectedReading } = props;
  const { isPlaying, setIsPlaying, setReadingNumber } = GrobalStore();
  const { t } = useTranslation();
  
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
          className=" cursor-pointer p-1 hover:rounded 
                    dark:text-gray-300 
                    hover:bg-gray-200 
                    dark:hover:bg-gray-800" 
          onClick={() => setIsSelectedReading(true)}
        >
          <VolumeMute style={{ fontSize: 25 }} />
        </Tooltip>
      :
        (!isPlaying)
        ? 
          <Tooltip 
            title={t('document.header.aloud.offAloud')} 
            className=" cursor-pointer p-1 rounded-md
                      dark:text-gray-300 
                      bg-gray-300 
                      dark:bg-gray-600" 
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
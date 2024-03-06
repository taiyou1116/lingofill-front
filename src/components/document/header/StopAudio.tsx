import { GrobalStore } from '@/store/grobalStore'
import { stopAudio } from '@/utils/helper'
import { StopCircle } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'

function StopAudio() {
  const { setIsPlaying, setReadingNumber } = GrobalStore();
  

  const StopReading = () => {
    setIsPlaying(false);
    stopAudio();
    setReadingNumber(-1);
  }

  return (
    <div>
      <Tooltip title='止める' className=' cursor-pointer' onClick={StopReading}>
        <StopCircle style={{fontSize: 20}} className=' dark:text-gray-300' />
      </Tooltip>
    </div>
  )
}

export default StopAudio
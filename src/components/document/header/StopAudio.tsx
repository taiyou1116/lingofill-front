import { GrobalStore } from '@/store/grobalStore'
import { stopAudio } from '@/utils/request'
import { StopCircle } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'

function StopAudio() {
  const { setIsPlaying } = GrobalStore();

  const StopReading = () => {
    setIsPlaying(false);
    stopAudio();
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
import { stopAudio } from '@/utils/request'
import { StopCircle } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'

function StopAudio() {

  return (
    <div>
      <Tooltip title='止める' className=' cursor-pointer' onClick={stopAudio}>
        <StopCircle style={{fontSize: 20}} className=' dark:text-gray-300' />
      </Tooltip>
    </div>
  )
}

export default StopAudio
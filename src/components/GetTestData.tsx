import { GET } from '@/utils/request'
import React from 'react'

function GetTestData() {
  return (
    <div>
      <button onClick={GET}>データ取得</button>
    </div>
  )
}

export default GetTestData
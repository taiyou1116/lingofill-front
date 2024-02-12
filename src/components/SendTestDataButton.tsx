"use client"
import { POST } from '@/utils/request';
import React from 'react';

type Props = {
  username: string,
}

function SendTestDataButton(props: Props) {
  const { username } = props;
 
  return ( 
    <button 
      onClick={() => POST(username)}
      className=' bg-white rounded-lg py-2 px-4'
    >
      保存する
    </button>
  )
}

export default SendTestDataButton;
"use client"
import { postText } from '@/utils/request';
import React from 'react';

type Props = {
  username: string,
}

function SendTestDataButton(props: Props) {
  const { username } = props;
 
  return ( 
    <button 
      onClick={() => postText(username)}
      className=' bg-white rounded-lg py-2 px-4 hover:border border-slate-800'
    >
      テキストを保存する
    </button>
  )
}

export default SendTestDataButton;
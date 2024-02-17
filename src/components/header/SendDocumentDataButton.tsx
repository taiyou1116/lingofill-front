"use client"
import { postText } from '@/utils/request';
import React from 'react';

type Props = {
  username: string,
  title: string,
  text: string,
}

function SendDocumentDataButton(props: Props) {
  const { username, title, text } = props;
 
  return ( 
    <button 
      onClick={() => postText(username, title, text)}
      className=' bg-white rounded-lg py-2 px-4 hover:border border-slate-800'
    >
      テキストを保存する
    </button>
  )
}

export default SendDocumentDataButton;
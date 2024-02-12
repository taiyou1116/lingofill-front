"use client"
import { POST } from '@/utils/request';
import React from 'react';

function SendTestDataButton() {
 
  return <button onClick={POST}>テストデータを送る</button>;
}

export default SendTestDataButton;
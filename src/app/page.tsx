"use client"

import { useState } from "react";

export default function Home() {
  // テスト
  const allWords = "In the realm of software developmentdddddjjj jjjjjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdddddddddddddddddsfdfdfdfdfddddd dddddddddddddddddddddddddddddddddddd ddddddddddddd dddddddddddddddddddd";
  const words = allWords.split(" ");
  // 透明な単語のインデックスを追跡するための状態
  const [transparentIndexes, setTransparentIndexes] = useState<number[]>([]);

  const handleWordClick = (index: number) => {
    // クリックされた単語のインデックスを透明なインデックスリストに追加
    setTransparentIndexes(current => [...current, index]);
  }

  return (
    <div className=" p-5 break-all">
      {words.map((word, index) => (
        <span 
          key={index} 
          onClick={() => handleWordClick(index)} 
          style={{
            marginRight: '5px', 
            cursor: 'pointer',
            // 透明な単語のスタイル適用
            color: transparentIndexes.includes(index) ? 'transparent' : 'inherit'
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

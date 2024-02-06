"use client"

import { useState } from "react";

export default function Home() {
  // テスト
  const allWords = "In the realm of software development, a significant paradigm shift has been observed towards embracing cloud-native technologies. This transition is not merely a trend but a strategic move to leverage the inherent scalability, resilience, and flexibility offered by cloud platforms. As organizations migrate their infrastructures and applications to the cloud, they unlock new avenues for innovation and efficiency. This evolution is pivotal for staying competitive in today's fast-paced digital landscape, where the ability to rapidly adapt and respond to market demands is crucial for success.";
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

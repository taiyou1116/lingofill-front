"use client"

import { useState } from "react";

export default function Home() {
  // テスト
  const allWords = "In the realm of software development, a significant paradigm shift has been observed towards embracing cloud-native technologies. This transition is not merely a trend but a strategic move to leverage the inherent scalability, resilience, and flexibility offered by cloud platforms. As organizations migrate their infrastructures and applications to the cloud, they unlock new avenues for innovation and efficiency. This evolution is pivotal for staying competitive in today's fast-paced digital landscape, where the ability to rapidly adapt and respond to market demands is crucial for success.";
  const words = allWords.split(" ");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedWords, setSelectedWords] = useState<number[]>([]);

  const handleWordClick = (index: number) => {
    setSelectedWords(current => [...current, index]);
  }

  const handleMouseDown = () => {
    setIsDragging(true);
    setSelectedWords([]);
  };

  const handleMouseMove = (index: number) => {
    if (!isDragging) return;
    setSelectedWords((prev) => {
      // 重複選択を避けるために新しいインデックスだけを追加
      return prev.includes(index) ? prev : [...prev, index];
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    selectedWords.map((n) => {
      console.log(words[n]);
    })
  };

  return (
    <div className=" p-5 break-all" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      {words.map((word, index) => (
        <span 
          key={index} 
          onClick={() => handleWordClick(index)} 
          onMouseMove={() => handleMouseMove(index)}
          style={{
            marginRight: '5px', 
            cursor: 'pointer',
            // 透明な単語のスタイル適用
            // color: transparentIndexes.includes(index) ? 'transparent' : 'inherit'
            backgroundColor: selectedWords.includes(index) ? 'yellow' : 'transparent',
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

"use client"

import { useState } from "react";

export default function Home() {
  // テスト
  const allWords = "In the realm of software development, a significant paradigm shift has been observed towards embracing cloud-native technologies. This transition is not merely a trend but a strategic move to leverage the inherent scalability, resilience, and flexibility offered by cloud platforms. As organizations migrate their infrastructures and applications to the cloud, they unlock new avenues for innovation and efficiency. This evolution is pivotal for staying competitive in today's fast-paced digital landscape, where the ability to rapidly adapt and respond to market demands is crucial for success.";
  const words = allWords.split(" ");

  // 一時的な状態を管理
  const [isDragging, setIsDragging] = useState(false);
  // 選ばれているものを可視化するだけ
  const [selectedWords, setSelectedWords] = useState<number[]>([]);

  // 日本語のオブジェクト
  type japaneseArray = {
    indexes: number[],
    transition: String,
  };

  const [jaArray, setJaArray] = useState<japaneseArray[]>([]);
  const [editIndex, setEditIndex] = useState<number>();

  // 日本語の状態を決める
  const handleInputChange = (index: number, transition: React.ChangeEvent<HTMLInputElement>) => {
    const jaA: japaneseArray = {
      indexes: [index],
      transition: transition.target.value,
    }
    setJaArray(current => [...current, jaA]);
  }

  const handleWordClick = (index: number) => {
    setSelectedWords(current => [...current, index]);
    setEditIndex(index);
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
          className={` p-0.5 cursor-pointer ${selectedWords.includes(index) ? 'bg-yellow-200' : ' bg-transparent'} `}
        >
          { editIndex === index 
          ? 
            <input 
              type="text"
              onChange={(e) => handleInputChange(index, e)}
            />
          : 
            word
          }
        </span>
      ))}
    </div>
  );
}

"use client"

import { useState } from "react";

export default function Home() {
  // テスト
  const allWords = "In the realm of software developmentdddddjjj jjjjjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdddddddddddddddddsfdfdfdfdfddddd dddddddddddddddddddddddddddddddddddd ddddddddddddd dddddddddddddddddddd";
  const words = allWords.split(" ");
  const [currentWords, setCurrentWords] = useState(words);

  const handleWordClick = (index: number) => {
    const arrayWords: string[] = [];
    currentWords.map((word, i) => {
      if (i === index) {
        arrayWords[i] = " ";
      } else {
        arrayWords[i] = word;
      }
    })
    setCurrentWords(arrayWords);
  }

  return (
    <div className=" p-5 break-all">
      {currentWords.map((word, index) => (
        <span key={index} onClick={() => handleWordClick(index)} style={{marginRight: '5px', cursor: 'pointer'}}>
          {word}
        </span>
      ))}
    </div>
  );
}

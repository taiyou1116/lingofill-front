"use client"

import { useState } from "react";

export default function Home() {
  // テスト
  const allWords = "In the realm of software developmentddddddddddddddddddddddsfdfdfdfdfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd";
  const words = allWords.split(" ");
  const [currentWords, setCurrentWords] = useState(words);

  const handleWordClick = (index: number) => {
    const arrayWords: string[] = [];
    const newWords = currentWords.map((word, i) => {
      if (i === index) {
        arrayWords[i] = " ";
      } else {
        arrayWords[i] = word;
      }
    })
    setCurrentWords(arrayWords);
  }

  return (
    <main>
      <div className=" p-5">
        {currentWords.map((word, index) => (
          <span key={index} onClick={() => handleWordClick(index)} style={{marginRight: '5px', cursor: 'pointer'}}>
            {word}
          </span>
        ))}
      </div>
    </main>
  );
}

"use client"

import React from 'react';
import "../../globals.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../../../aws-exports";
import { useStore } from "@/store/store";
import { useEffect } from "react";
import { getTitles } from "@/utils/request";
import { getCurrentUser } from "aws-amplify/auth";
import DocumentMemoComponent from '@/components/document/Document';

Amplify.configure(awsExports);

function Home() {
  const {setDocuments, setTheme, username, setUsername, selectedWordsIndexes, setSelectedWordsIndexes, showCenterModal} = useStore((store) => ({
    setDocuments:            store.setDocuments,
    setTheme:                store.setTheme,
    username:                store.username,
    setUsername:             store.setUsername,
    selectedWordsIndexes:    store.selectedWordsIndexes,
    setSelectedWordsIndexes: store.setSelectedWordsIndexes,
    showCenterModal:         store.showCenterModal,
  }));

  // '/home'でリロードしたときにgetCurrentUserでログイン処理
  useEffect(() => {
    const fetchData = async () => {
      if (username === '') {
        const user = await getCurrentUser();
        setUsername(user.username);
      } else {
        const data = await getTitles(username);
        setDocuments(data);
      }
    };
    fetchData();
  }, [setDocuments, username, setUsername])

  // テーマを決める
  useEffect(() => {
    const getTheme = () => {
      const theme = localStorage.getItem('theme');
      if (theme === null) {
        localStorage.setItem('theme', 'light');
        return;
      }
      setTheme(theme);
    }
    getTheme();
  }, [setTheme])

  // 翻訳indexをリセット
  const resetSelectedWordsIndexes = () => {
    if (showCenterModal) return;
    if (selectedWordsIndexes.length !== 0) {
      setSelectedWordsIndexes([]);
    }
  }

  return (
    <div className=" h-full" onMouseDown={resetSelectedWordsIndexes} >
      <DocumentMemoComponent />
    </div>
  )
};

export default Home;
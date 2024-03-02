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

import i18n from "@/i18n";
import { I18nextProvider } from "react-i18next";

Amplify.configure(awsExports);

function Home() {
  const {setDocuments, username, setUsername, selectedWordsIndexes, setSelectedWordsIndexes, showCenterModal} = useStore((store) => ({
    setDocuments:            store.setDocuments,
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

  // 翻訳indexをリセット
  const resetSelectedWordsIndexes = () => {
    if (showCenterModal) return;
    if (selectedWordsIndexes.length !== 0) {
      setSelectedWordsIndexes([]);
    }
  }

  return (
    <div className=" h-full" onMouseDown={resetSelectedWordsIndexes} >
      <I18nextProvider i18n={i18n} defaultNS={"translation"}>
        <DocumentMemoComponent />
      </I18nextProvider>
    </div>
  )
};

export default Home;
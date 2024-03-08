"use client"

import React from 'react';
import "../../globals.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../../../aws-exports";
import { useEffect } from "react";

import i18n from "@/i18n";
import { I18nextProvider } from "react-i18next";
import { changeLanguage } from 'i18next';
import DocumentComponent from '@/components/document/Document';
import { GrobalStore } from '@/store/grobalStore';

Amplify.configure(awsExports);

function Home() {
  const { selectedWordsIndexes, setSelectedWordsIndexes, showCenterModal, setLanguage} = GrobalStore();


  // 言語選択 localStorageから取得
  useEffect(() => {
    const ln = localStorage.getItem('language');
    if (ln !== null) {
      changeLanguage(ln);
      setLanguage(ln);
    } else {
      localStorage.setItem('language', 'ja');
    }
    
  }, [setLanguage])

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
        <DocumentComponent />
      </I18nextProvider>
    </div>
  )
};

export default Home;
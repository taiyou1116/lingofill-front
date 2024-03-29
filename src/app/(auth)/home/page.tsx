
"use client"

import React, { useEffect } from "react";
import { useGetLocalStorage } from "@/hooks/hooks";

import { Amplify } from "aws-amplify";
import awsExports from "../../../aws-exports";
import i18n from "@/i18n";
import { I18nextProvider } from "react-i18next";
import { changeLanguage } from 'i18next';
import DocumentComponent from '@/components/document/Document';

import "@aws-amplify/ui-react/styles.css";
import "../../globals.css"

Amplify.configure(awsExports);

function Home() {

  const { value: ln } = useGetLocalStorage('language', 'ja');
  useGetLocalStorage('rate', '100');
  useGetLocalStorage('voiceType', 'standard');
  useGetLocalStorage('translationExpression', 'NULL');

  useEffect(() => {
    changeLanguage(ln);
  }, [ln])

  return (
    <div className=" h-full" >
      <I18nextProvider i18n={i18n} defaultNS={"translation"}>
        <DocumentComponent />
      </I18nextProvider>
    </div>
  )
};

export default Home;
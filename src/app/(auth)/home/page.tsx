"use client"

import DocumentComponent from "@/components/document/Document"
import "../../globals.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../../../aws-exports";
import { useStore } from "@/store/store";
import { useEffect } from "react";
import { getTitles } from "@/utils/request";
import { getCurrentUser } from "aws-amplify/auth";

Amplify.configure(awsExports);

const Home = () => {
  const {setDocuments, setTheme, username, setUsername} = useStore((store) => ({
    setDocuments: store.setDocuments,
    setTheme:     store.setTheme,
    username:     store.username,
    setUsername:  store.setUsername,
  }));

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

  return (
    <div className=" h-full">
      <DocumentComponent />
    </div>
  )
};

export default Home;
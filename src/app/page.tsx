"use client"

import "./globals.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import { useStore } from "@/store/store";

Amplify.configure(awsExports);

const MyApp = () => {
  const router = useRouter();
  const {setUsername, setTheme} = useStore((store) => ({
    setUsername:  store.setUsername,
    setTheme:     store.setTheme,
  }));

  async function currentAuthenticatedUser() {
    try {
      const { username } = await getCurrentUser();
      return username;
    } catch (err) {
      console.log("getCurrentUserエラー: " + err);
    }
  }

  useEffect(() => {
    async function handleAutoSignIn() {
      try {
        const username = await currentAuthenticatedUser();
        if (username !== undefined) {
          setUsername(username);
          router.replace('/home');
        } else {
          router.replace('/doc');
        }
      } catch (error) {
        console.log("エラー" + error);
      }
    }

    handleAutoSignIn();
  }, [setUsername, router]);

  return (
    <div>リダイレクト中...</div>
  )
};
export default MyApp;
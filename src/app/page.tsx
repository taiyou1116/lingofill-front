"use client"

import "./globals.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { autoSignIn, getCurrentUser } from "aws-amplify/auth";
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
      console.log(`The username: ${username}`);
      return username;
    } catch (err) {
      console.log("getCurrentUserエラー" + err);
    }
  }

  async function handleAutoSignInn() {
    try {
      const signInOutput = await autoSignIn();
      // handle sign-in steps
    } catch (error) {
      console.log("エラ〜" + error);
    }
  }

  useEffect(() => {
    async function handleAutoSignIn() {
      try {
        // await handleAutoSignInn();
        const username = await currentAuthenticatedUser();
        if (username !== undefined) {
          setUsername(username);
          router.push('/home');
        } else {
          router.push('/doc');
        }
      } catch (error) {
        console.log("エラー" + error);
      }
    }

    handleAutoSignIn();
  }, []);

  return null;
};
export default MyApp;
"use client"

import "../globals.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../../aws-exports";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import { useStore } from "@/store/store";
import { Box, LinearProgress } from "@mui/material";

Amplify.configure(awsExports);

const MyApp = () => {
  const router = useRouter();
  const {setUsername} = useStore((store) => ({
    setUsername:  store.setUsername,
  }));

  useEffect(() => {
    async function handleAutoSignIn() {
      try {
        const {username} = await getCurrentUser();
        if (username !== undefined) {
          setUsername(username);
          router.replace('/home');
        } else {
          router.replace('/doc');
        }
      } catch (error) {
        console.log("エラー" + error);
        router.replace('/doc');
      }
    }

    handleAutoSignIn();
  }, [setUsername, router]);

  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center gap-2">
      <div className=" dark:text-gray-200">Loading</div>
      <Box sx={{ width: '30%' }}>
        <LinearProgress />
      </Box>
    </div>
  )
};
export default MyApp;
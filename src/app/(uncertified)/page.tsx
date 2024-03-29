
"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/hooks/hooks";

import { Amplify } from "aws-amplify";
import awsExports from "../../aws-exports";

import { Box, LinearProgress } from "@mui/material";
import "@aws-amplify/ui-react/styles.css";
import "../globals.css";

Amplify.configure(awsExports);

const MyApp = () => {
  const router = useRouter();
  const username = useGetUser();

  useEffect(() => {
    (username === '') 
    ? router.replace('/doc')
    : router.replace('/home')
  }, [username, router]);

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
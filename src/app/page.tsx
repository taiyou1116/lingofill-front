"use client"

import "./globals.css";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

Amplify.configure(awsExports);

const App = () => {
  return (
    <Authenticator.Provider>
      <MyApp />
    </Authenticator.Provider>
  );
};

export default App;

const MyApp = () => {
  const { route } = useAuthenticator((context) => [context.route]);
  const router = useRouter();

  useEffect(() => {
    if (route === "authenticated") {
      router.push('/home');
    } else {
      router.push('/doc');
    }
  }, [route, router])

  return (
    <div className=" h-full">
      <Authenticator socialProviders={['google']}/>
    </div>
  )
};
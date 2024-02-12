"use client"

import SentenceComponent from "@/components/SentenceComponent"
import "./globals.css";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
import SendTestDataButton from "@/components/SendTestDataButton";
import GetTestData from "@/components/GetTestData";
Amplify.configure(awsExports);

const App = () => {
  return (
    <Authenticator.Provider>
      <MyApp />
    </Authenticator.Provider>
  );
};

const MyApp = () => {
  const { route } = useAuthenticator((context) => [context.route]);

  return (
    <div>
      { route === "authenticated"
      ?
        <GetTestData />
        // <SendTestDataButton />
        // <SentenceComponent />
      : 
        <div className=' py-5'>
          <Authenticator socialProviders={['google']}/>
        </div>
      }
    </div>
  )
};

export default App;
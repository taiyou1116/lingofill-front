"use client"

import DocumentComponent from "@/components/document/DocumentComponent"
import "./globals.css";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
import { useStore } from "@/store/store";
import { useEffect } from "react";
import { getTexts } from "@/utils/request";
import { Document } from "@/types/types";

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
  const { route, user, } = useAuthenticator((context) => [context.route]);

  const setUsername = useStore((store) => store.setUsername);
  const setDocuments = useStore((store) => store.setDocuments);

  useEffect(() => {
    if (route === "authenticated") {
      setUsername(user.username);
      
      // texts更新(場所かえるかも)
      const getTextsAsync = async () => {
        const data = await getTexts(user.username);
        const newDocuments: Document[] = data.map((d: any) => ({
          title: d.title.S, 
          text: d.text.S,
        }));
        
        // setDocumentsを呼び出してdocuments状態を更新
        setDocuments(newDocuments);
      }
      getTextsAsync();
    }
  }, [setUsername, route, user, setDocuments])

  return (
    <div className=" h-full">
      { route === "authenticated"
      ?
        <DocumentComponent />
      : 
        <div className=' py-5'>
          <Authenticator socialProviders={['google']}/>
        </div>
      }
    </div>
  )
};
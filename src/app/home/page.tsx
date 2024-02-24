"use client"

import DocumentComponent from "@/components/document/Document"
import "../globals.css";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../../aws-exports";
import { useStore } from "@/store/store";
import { useEffect } from "react";
import { getTitles } from "@/utils/request";

Amplify.configure(awsExports);

const App = () => {
  return (
    <Authenticator.Provider>
      <Home />
    </Authenticator.Provider>
  );
};

const Home = () => {
  const { route, user, } = useAuthenticator((context) => [context.route]);

  const {setUsername, setDocuments, setTheme} = useStore((store) => ({
    setUsername:  store.setUsername,
    setDocuments: store.setDocuments,
    setTheme:     store.setTheme,
  }));

  useEffect(() => {
    if (route === "authenticated") {
      setUsername(user.username);
      
      // title, sortKey取得(場所かえるかも)
      const getTextsAsync = async () => {
        const data = await getTitles(user.username);
        setDocuments(data);
      }
      getTextsAsync(); 
    }
  }, [setUsername, route, user, setDocuments])

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
      { route === "authenticated"
      ?
        <DocumentComponent />
      : 
        <div className=' py-5'>
          {/*  Authenticatorがuser情報を持つ */}
          <Authenticator socialProviders={['google']}/>
        </div>
      }
    </div>
  )
};

export default App;
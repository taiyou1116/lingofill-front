"use client"

import SentenceComponent from "@/components/SentenceComponent"
import "./globals.css";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
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

  console.log(route);

  return (
    <div>
      { route === "authenticated"
      ?
        <SentenceComponent />
      : 
        <div className=' py-5'>
          <Authenticator>
            {({ signOut, user }) => (
              <div>
                  <p>Welcome {user!.username}</p>
                  
                  <button onClick={signOut}>Sign out</button>
              </div>
            )}
          </Authenticator>
        </div>
      }
    </div>
  )
};

export default App;
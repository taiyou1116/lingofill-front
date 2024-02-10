"use client"

import SentenceComponent from "@/components/SentenceComponent"
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function Home() {
  return (
    <div>
      <SentenceComponent />
      <Authenticator>
            {({ signOut, user }) => (
                <div>
                    <p>Welcome {user!.username}</p>
                    <button onClick={signOut}>Sign out</button>
                </div>
            )}
        </Authenticator>
    </div>
  )
}


"use client"

import React from 'react'
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import amplifyconfig from '../../amplifyconfiguration.json';
import { Amplify } from "aws-amplify";

Amplify.configure(amplifyconfig);

function page() {
  return (
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
  )
}

export default page
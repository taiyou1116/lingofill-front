"use client"

import React from 'react'
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import amplifyconfig from '../../amplifyconfiguration.json';
import { Amplify } from "aws-amplify";

Amplify.configure(amplifyconfig);

function Acount() {
  return (
    <div className=' py-5'>
      <Authenticator>
        {({ signOut, user }) => (
          <div className=' flex items-center justify-center'>
            <div>
              {/* ユーザー詳細 */}
              <p>email:  {user!.signInDetails?.loginId}</p>
              <p>name:  { user!.username }</p>
              
              <button 
                onClick={signOut}
                className=' bg-red-500 py-2 px-4 rounded-lg'
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </Authenticator>
    </div>
  )
}

export default Acount
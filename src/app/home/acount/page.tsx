"use client"

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import awsExports from "../../../aws-exports";

Amplify.configure(awsExports);

function Acount() {
  return (
    <div className=' py-5'>
      <Authenticator socialProviders={['google']}>
        {({ signOut, user }) => (
          <div className=' flex items-center justify-center'>
            <div>
              {/* ユーザー詳細 */}
              <p>email:  {user!.signInDetails?.loginId}</p>
              <p>name:  { user!.username }</p>
              {/* お気に入り */}
              
              <button 
                onClick={signOut}
                className=' bg-red-500 py-2 px-4 rounded-lg'
              >
                サインアウト
              </button>
            </div>
          </div>
        )}
      </Authenticator>
    </div>
  )
}

export default Acount
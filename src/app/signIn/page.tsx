import React from 'react'
import { Authenticator } from '@aws-amplify/ui-react';

function page() {
  return (
    <div>
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
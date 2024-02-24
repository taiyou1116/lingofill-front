"use client"

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import amplifyconfig from '../../amplifyconfiguration.json';
import { Amplify } from "aws-amplify";

Amplify.configure(amplifyconfig);

function Login() {
  return (
    <div className=' py-5'>
      <Authenticator socialProviders={['google']} />
    </div>
  )
}

export default Login
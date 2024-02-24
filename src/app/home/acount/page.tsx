"use client"

import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import awsExports from "../../../aws-exports";
import { signOut } from 'aws-amplify/auth';

Amplify.configure(awsExports);

function Acount() {

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <div className=' py-5'>
      <button onClick={handleSignOut}>サインアウト</button>
    </div>
  )
}

export default Acount
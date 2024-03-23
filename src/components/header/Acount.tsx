"use client"

import '@aws-amplify/ui-react/styles.css';
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

function Acount() {
  const router = useRouter();
  async function handleSignOut() {
    try {
      await signOut();
      router.replace('/');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <button onClick={handleSignOut}>サインアウト</button>
  )
}

export default Acount
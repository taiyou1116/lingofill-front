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
    <div className=' py-5'>
      <button onClick={handleSignOut}>サインアウト</button>
    </div>
  )
}

export default Acount

"use client"

import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';

import '@aws-amplify/ui-react/styles.css';

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
    <Button onClick={handleSignOut}>サインアウト</Button>
  )
}

export default Acount
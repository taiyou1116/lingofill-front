
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { oswald } from '@/store/fontStore'

function HomeLink() {

  // tailwindcss classes
  const linkClass = 'flex items-center cursor-pointer rounded-lg pr-3 hover:bg-gray-200 dark:bg-gray-500 dark:hover:bg-gray-600 border-2 border-black'
  
  return (
    <Link href={"/home"} className={linkClass}>
      <Image src="LF.svg" width="40" height="40" alt='ロゴ' />
      <h1 className={` text-xl ${oswald.className}`}>
        Lingo Fill
      </h1> 
    </Link>
  )
}

export default HomeLink
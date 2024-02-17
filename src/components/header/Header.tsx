/** 上部ヘッダー 
 * サイドバーの開閉, アカウント情報, textがあれば(ユーザーログイン & テキストを開いている)テキストの保存
*/

"use client"

import { AccountCircle, Reorder } from "@mui/icons-material";
import { useStore } from '@/store/store';
import { oswald } from '@/store/fontStore';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip } from '../Tooltip';
import SendDocumentDataButton from './SendDocumentDataButton';
import ThreeWayToggle from './ThreeWayToggle';

function HeaderComponent() {
  // store
  const flipShowSidebar = useStore((store) => store.flipShowSidebar);
  const document = useStore((store) => store.document);
  const username = useStore((store) => store.username);

  return (
    <div className="header-bg-height bg-cyan-500 flex items-center justify-between shadow-xl">
      <div className='flex items-center pl-4 gap-5'>
        <button onClick={flipShowSidebar}>
          <Reorder style={{fontSize: 35}} />
        </button>
        <Link href={"/"} className=' flex items-center cursor-pointer border-2 border-black rounded-lg pr-3'>
          <Image src="LF.svg" width="40" height="40" alt='ロゴ' />
          <h1 className={` text-xl ${oswald.className}`}>
            Lingo Fill
          </h1> 
        </Link>
        { document ? <ThreeWayToggle /> : "" }
      </div>
      <div 
        className=' flex px-10 gap-10 items-center'
      >
        <div>
          { document ?
            <SendDocumentDataButton 
              username={username}
              title={document.title}
              text={document.text}
            /> : "" 
          }
        </div>
        <Link href={'/acount'}>
          <Tooltip tooltipText="アカウント">
            <AccountCircle style={{fontSize: 35}} />
          </Tooltip>
        </Link>
      </div>
    </div>
  )
}

export default HeaderComponent
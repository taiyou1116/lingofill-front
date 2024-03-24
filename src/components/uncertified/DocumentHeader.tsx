
import { oswald } from '@/store/fontStore'
import Image from 'next/image'

type Props = {
  setLogin: (login: boolean) => void,

  titleClass?: string,
  buttonClass?: string,
  lingoFill?: string,
}

function DocumentHeader( props: Props) {
  const { setLogin, titleClass, buttonClass, lingoFill } = props;

  const transferHomeRoute = () => {
    window.open('https://main.d5yypxcoba5g4.amplifyapp.com/', '_blank');
  }

  return (
    <div className="header-bg-height flex items-center justify-between shadow-md px-10 bg-white dark:bg-gray-600">
      <div className=" flex items-center">
        <Image src="LF.svg" width="60" height="60" alt='ロゴ' />
        <h1 className={` ${titleClass} ${oswald.className} `}>{ lingoFill } </h1>
      </div>
      <div className=" flex items-center gap-3">
        <button 
          className={`bg-gray-200 rounded-md text-gray-800 ${buttonClass}`} 
          onClick={transferHomeRoute}>
          ログイン済みの方
        </button>
        <button 
          className={` bg-blue-500 dark:bg-blue-800 rounded-md dark:text-white ${buttonClass}`} 
          onClick={() => setLogin(true)}>
          初めての方
        </button>
      </div>
    </div>
  )
}

export default DocumentHeader

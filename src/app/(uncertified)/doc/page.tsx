"use client"

import "../../globals.css";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import { oswald } from "@/store/fontStore";
import Image from "next/image";
import { CloudUpload, Comment, Description, DevicesOther, Language, Launch, Psychology, RecordVoiceOver, Translate } from "@mui/icons-material";
import { Amplify } from "aws-amplify";
import awsExports from "../../../aws-exports";
import { Divider } from "@mui/material";
import { useWindowSize } from "@/hooks/hooks";

Amplify.configure(awsExports);

function Doc() {
  const [login, setLogin] = useState(false);

  const deviceSize = useWindowSize();

  const transferHomeRoute = () => {
    window.open('https://main.d5yypxcoba5g4.amplifyapp.com/', '_blank');
  }

  const divideUI = () => {
    if (deviceSize.width <= 768) {
      return(
        <div>
          <div className="header-bg-height flex items-center justify-between shadow-md px-10 bg-white dark:bg-gray-600">
            <div className=" flex items-center">
              <Image src="LF.svg" width="60" height="60" alt='ロゴ' />
              <h1 className={` text-2xl ${oswald.className} `}>Lingo Fill</h1>
            </div>
            <div className=" flex items-center gap-3">
              <button 
                className=" bg-gray-200 rounded-md py-2 px-3 text-gray-800" 
                onClick={transferHomeRoute}>
                ログイン済みの方
              </button>
              <button 
                className=" bg-blue-500 dark:bg-blue-800 rounded-md py-3 px-5 dark:text-white" 
                onClick={() => setLogin(true)}>
                初めての方
              </button>
            </div>
          </div>
          <div className=" flex flex-col justify-center items-center">
            <h1 className=" text-7xl text-blue-500">
              Lingo Fillとは
            </h1>
            <div className=" flex flex-col pt-12 px-6 gap-5">
              <div className=" flex flex-col gap-5 dark:text-gray-300">
                <div className=" font-bold text-lg">シンプルな長文専用の言語学習サービスです。</div>
                <div>あなただけの言語学習テキストを簡単に作成できます。</div>
                <div className=" grid grid-cols-2 gap-3">
                  <div className=" flex items-center gap-1"><Language /> 多言語対応</div>
                  <div className=" flex items-center gap-1"><Translate /> 高速で正確な翻訳</div>
                  <div className=" flex items-center gap-1"><Psychology /> AIによる補完</div>
                  <div className=" flex items-center gap-1"><RecordVoiceOver /> 自然な音声読み上げ</div>
                  <div className=" flex items-center gap-1"><Comment /> 自分だけのメモの作成</div>
                  <div className=" flex items-center gap-1"><CloudUpload /> 無制限のテキスト保存</div>
                  <div className=" flex items-center gap-1"><DevicesOther /> 多端末での共有</div>
                </div>
              </div>
            </div>
            <Image src="/lingo_fill.png" width="720" height="450" alt='ロゴ' />
          </div>
          <Divider className=" mt-16"/>
          <div className=" flex flex-col justify-center items-center mt-16 gap-3">

            <h1 className=" text-5xl text-blue-500"><Description style={{ fontSize: 40 }} />使い方</h1>
            <div className=" font-extrabold text-lg">①アカウントの作成</div>
            <div><span className=" font-extrabold">[始めての方]</span>からアカウントを作成もしくは、Googleでサインインします。</div>
            <Image src="/signin.png" width="720" height="450" alt='ロゴ' />

            <div className=" font-extrabold text-lg mt-20">②新規テキストの作成</div>
            <div>(1)新規テキストボタンをクリックします。</div>
            <div>(2)テキストの名前をつけたら作成します。</div>
            <Image src="/create_text.png" width="720" height="450" alt='ロゴ' />

            <div className=" font-extrabold text-lg mt-20">③文章の入力</div>
            <div>(1)インターネット上から好きな文章をコピー(Command + C)します。</div>
            <div>(2)そのまま先ほど作成した空のテキストにペースト(Command + V)します。</div>
            <Image src="/paste.png" width="720" height="450" alt='ロゴ' />

            <div className=" font-extrabold text-lg mt-20">④学習する</div>
            <div>- 単語をタップ、熟語をスクロール選択して意味を確認します。</div>
            <div>- 用法、他の意味を知りたい場合はAIに使い方を聞きます。</div>
            <div>- 読み上げを使用して聞き取れないところを反復して聞きます。</div>
            <div>- メモを作成して、単語の用法、意味を保存しておきます。</div>
            <Image src="/modal.png" width="720" height="450" alt='ロゴ' />
          </div>
        </div>
      )
    } else {
      return(
        <div>
          <div className="header-bg-height flex items-center justify-between shadow-md px-10 bg-white dark:bg-gray-600">
            <div className=" flex items-center">
              <Image src="LF.svg" width="60" height="60" alt='ロゴ' />
              <h1 className={` text-2xl ${oswald.className} `}>Lingo Fill</h1>
            </div>
            <div className=" flex items-center gap-3">
              <button 
                className=" bg-gray-200 rounded-md py-2 px-3 text-gray-800" 
                onClick={transferHomeRoute}>
                ログイン済みの方
              </button>
              <button 
                className=" bg-blue-500 dark:bg-blue-800 rounded-md py-3 px-5 dark:text-white" 
                onClick={() => setLogin(true)}>
                初めての方
              </button>
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <div className=" flex flex-col pt-12 px-6 gap-5">
              <h1 className=" text-7xl text-blue-500">
                Lingo Fillとは
              </h1>
              <div className=" flex flex-col gap-5 dark:text-gray-300">
                <div className=" font-bold text-lg">シンプルな長文専用の言語学習サービスです。</div>
                <div>あなただけの言語学習テキストを簡単に作成できます。</div>
                <div className=" grid grid-cols-2 gap-3">
                  <div className=" flex items-center gap-1"><Language /> 多言語対応</div>
                  <div className=" flex items-center gap-1"><Translate /> 高速で正確な翻訳</div>
                  <div className=" flex items-center gap-1"><Psychology /> AIによる補完</div>
                  <div className=" flex items-center gap-1"><RecordVoiceOver /> 自然な音声読み上げ</div>
                  <div className=" flex items-center gap-1"><Comment /> 自分だけのメモの作成</div>
                  <div className=" flex items-center gap-1"><CloudUpload /> 無制限のテキスト保存</div>
                  <div className=" flex items-center gap-1"><DevicesOther /> 多端末での共有</div>
                </div>
              </div>
            </div>
            <Image src="/lingo_fill.png" width="720" height="450" alt='ロゴ' />
          </div>
          <Divider className=" mt-16"/>
          <div className=" flex flex-col justify-center items-center mt-16">
            <h1 className=" text-5xl text-blue-500"><Description style={{ fontSize: 40 }} />使い方</h1>
            <div className=" flex flex-col gap-2">
              <div className=" flex items-center justify-between gap-3">
                <div className=" flex pt-16 px-6 gap-5">
                  <div className=" flex flex-col gap-5 dark:text-gray-300">
                    <div className=" font-extrabold text-lg">①アカウントの作成</div>
                    <div><span className=" font-extrabold">[始めての方]</span>からアカウントを作成もしくは、Googleでサインインします。</div>
                  </div>
                </div>
                <Image src="/signin.png" width="720" height="450" alt='ロゴ' />
              </div>
              <div className=" flex items-center justify-between gap-3">
                <div className=" flex pt-16 px-6 gap-5">
                  <div className=" flex flex-col gap-5 dark:text-gray-300">
                    <div className=" font-extrabold text-lg">②新規テキストの作成</div>
                    <div>(1)新規テキストボタンをクリックします。</div>
                    <div>(2)テキストの名前をつけたら作成します。</div>
                  </div>
                </div>
                <Image src="/create_text.png" width="720" height="450" alt='ロゴ' />
              </div>
              <div className=" flex items-center justify-between gap-3">
                <div className=" flex pt-16 px-6 gap-5">
                  <div className=" flex flex-col gap-5 dark:text-gray-300">
                    <div className=" font-extrabold text-lg">③文章の入力</div>
                    <div>(1)インターネット上から好きな文章をコピー(Command + C)します。</div>
                    <div>(2)そのまま先ほど作成した空のテキストにペースト(Command + V)します。</div>
                  </div>
                </div>
                <Image src="/paste.png" width="720" height="450" alt='ロゴ' />
              </div>
              <div className=" flex items-center justify-between gap-3">
                <div className=" flex pt-16 px-6 gap-5">
                  <div className=" flex flex-col gap-5 dark:text-gray-300">
                    <div className=" font-extrabold text-lg">④学習する</div> 
                    <div>- 単語をタップ、熟語をスクロール選択して意味を確認します。</div>
                    <div>- 用法、他の意味を知りたい場合はAIに使い方を聞きます。</div>
                    <div>- 読み上げを使用して聞き取れないところを反復して聞きます。</div>
                    <div>- メモを作成して、単語の用法、意味を保存しておきます。</div>
                  </div>
                </div>
                <Image src="/modal.png" width="720" height="450" alt='ロゴ' />
              </div>
            </div>
          </div> 
          <Divider className=" mt-16"/>
          <div className=" flex flex-col justify-center items-center mt-16">
            <h1 className=" text-5xl text-blue-500"><Language style={{ fontSize: 40 }} />多言語対応</h1>
            <div className=" flex items-center gap-3">
              <div className=" flex pt-16 px-6 gap-5">
                <div className=" flex flex-col gap-5 dark:text-gray-300">
                  <div>Lingo Fillはさまざまな言語に対応しています。</div>
                  <div>あなたの学びたい言語にも対応しているはずです。</div>
                  <div className=" text-sm">
                    対応言語: 日本語, English, Español, Français, Deutsch, Italiano, Português, Русский, عربي, 한국어, 中国語, हिंदी
                  </div>
                </div>
              </div>
              <Image src="/world.png" width="500" height="500" alt='ロゴ' />
            </div>
          </div> 
          <div className=" flex flex-col justify-center items-center mt-32">
            <h1 className=" text-5xl text-blue-500"><Translate style={{ fontSize: 40 }} />素早く正確な翻訳</h1>
            <div className=" flex items-center gap-3">
              <div className=" flex pt-16 px-6 gap-5">
                <div className=" flex flex-col gap-5 dark:text-gray-300">
                  <div>Lingo Fillはあなたの分からない単語、熟語を高速で翻訳します。</div>
                  <div>翻訳するには単語をクリック、熟語は複数選択するだけです。</div>
                </div>
              </div>
              <Image src="/translate.png" width="500" height="500" alt='ロゴ' />
            </div>
          </div> 
          <div className=" flex flex-col justify-center items-center mt-32">
            <h1 className=" text-5xl text-blue-500"><Psychology style={{ fontSize: 40 }} />AIによる補完</h1>
            <div className=" flex items-center gap-3">
              <div className=" flex pt-16 px-6 gap-5">
                <div className=" flex flex-col gap-5 dark:text-gray-300">
                  <div>Lingo Fillは、AIによる補完を提供します。</div>
                  <div>用法、意味の分からない単語、熟語は積極的にAIを使います。</div>
                </div>
              </div>
              <Image src="/wandering-mind.svg" width="500" height="500" alt='ロゴ' />
            </div>
          </div> 
          <div className=" flex flex-col justify-center items-center mt-32">
            <h1 className=" text-5xl text-blue-500"><RecordVoiceOver style={{ fontSize: 40 }} />音声読み上げ</h1>
            <div className=" flex items-center gap-3">
              <div className=" flex pt-16 px-6 gap-5">
                <div className=" flex flex-col gap-5 dark:text-gray-300">
                  <div>Lingo Fillは自然な音声を文章の好きな箇所から繰り返し聞くことができます。</div>
                  {/* <div></div> */}
                </div>
              </div>
              <Image src="/speaker-1.svg" width="500" height="500" alt='ロゴ' />
            </div>
          </div> 
          <div className=" flex flex-col justify-center items-center mt-32">
            <h1 className=" text-5xl text-blue-500"><Comment style={{ fontSize: 40 }} />自分だけのメモの作成</h1>
            <div className=" flex items-center gap-3">
              <div className=" flex pt-16 px-6 gap-5">
                <div className=" flex flex-col gap-5 dark:text-gray-300">
                  <div>Lingo Fillは、用法、意味のメモをすぐに作成できます。</div>
                  <div>単語、熟語の意味、用法などは分からなくてもAIが教えてくれます。</div>
                </div>
              </div>
              <Image src="/Taking-Notes-2.svg" width="500" height="500" alt='ロゴ' />
            </div>
          </div> 
          <div className=" flex flex-col justify-center items-center mt-32">
            <h1 className=" text-5xl text-blue-500 pb-10"><CloudUpload style={{ fontSize: 40 }} />無制限のテキスト保存</h1>
            <div className=" flex items-center gap-3">
              <div className=" flex pt-16 px-6 gap-5">
                <div className=" flex flex-col gap-5 dark:text-gray-300">
                  <div>Lingo Fillは、制限のないのテキスト保存が可能です。</div>
                  <div>オンライン上で保存するためあなたのデバイスを圧迫しません。</div>
                </div>
              </div>
              <Image src="/2108272.png" width="500" height="500" alt='ロゴ' />
            </div>
          </div> 
          <div className=" flex flex-col justify-center items-center mt-32">
            <h1 className=" text-5xl text-blue-500"><DevicesOther style={{ fontSize: 40 }} />多端末での共有</h1>
            <div className=" flex items-center gap-3">
              <div className=" flex pt-16 px-6 gap-5">
                <div className=" flex flex-col gap-5 dark:text-gray-300">
                  <div>Lingo Fillは、アカウントごとにオンライン上でテキストを保管します。</div>
                  <div>同じアカウントを共有することで、友達と同じテキストを共有します。</div>
                </div>
              </div>
              <Image src="/the-cloud.svg" width="500" height="500" alt='ロゴ' />
            </div>
          </div> 
        </div>
      )
    }
  }

  return (
    <div>
      { login 
      ?
        <Authenticator socialProviders={['google']} >
          <div className=" w-screen h-screen text-gray-300 flex flex-col gap-5 items-center justify-center">
            <button onClick={transferHomeRoute} className=" bg-lime-600 py-4 px-8"><Launch /> 学習ページへ</button>
            <button onClick={() => setLogin(false)}>ドキュメントへ</button>
          </div>
        </Authenticator>
      : 
        <div>{divideUI()}</div>
      }
    </div>
  )
}

export default Doc
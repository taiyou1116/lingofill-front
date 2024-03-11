"use client"

import "../../globals.css";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import { oswald } from "@/store/fontStore";
import Image from "next/image";
import { CheckCircle } from "@mui/icons-material";
import { Amplify } from "aws-amplify";
import awsExports from "../../../aws-exports";;

Amplify.configure(awsExports);

function Doc() {
  const [login, setLogin] = useState(false);

  return (
    <div>
      { login 
      ?
        <Authenticator socialProviders={['google']} />
      : 
        <div>
          <div className="header-bg-height flex items-center justify-between shadow-md px-10 bg-white dark:bg-gray-600">
            <div className=" flex items-center">
              <Image src="LF.svg" width="60" height="60" alt='ロゴ' />
              <h1 className={` text-2xl ${oswald.className} `}>Lingo Fill</h1>
            </div>
            <button 
              className=" bg-blue-500 dark:bg-blue-800 rounded-md py-3 px-5 text-white" 
              onClick={() => setLogin(true)}>
              今すぐはじめる
            </button>
          </div>

          <div className=" flex">
            <div className=" flex flex-col pt-12 px-6 gap-5">
              <h1 className=" text-7xl text-blue-500">
                Lingo Fillとは
              </h1>
              <div className=" flex flex-col gap-5 dark:text-gray-300">
                Lingo Fillを使えばあなただけの言語学習テキストを簡単に作成できます
                <div className=" grid grid-cols-2 gap-3">
                  <div><CheckCircle /> 多言語対応</div>
                  <div><CheckCircle /> 音声読み上げ</div>
                  <div><CheckCircle /> 無制限のテキスト保存</div>
                  <div><CheckCircle /> 自由なブロック表示</div>
                  <div><CheckCircle /> スタイリッシュなUI</div>
                  <div><CheckCircle /> AIによる補完</div>
                  <div><CheckCircle /> 多端末での共有</div>
                </div>
              </div>
            </div>
            <Image src="/lingo-fill-test.png" width="800" height="800" alt='ロゴ' />
          </div>

          <div className=" flex flex-col justify-center items-center mt-32">
            <h1 className=" text-5xl text-blue-500">多言語対応</h1>
            <div className=" flex">
              <div className=" flex pt-16 px-6 gap-5">
                <div className=" flex flex-col gap-5 dark:text-gray-300">
                  Lingo Fillはさまざまな言語に対応しています。
                  あなたの学びたい言語にも対応しているはずです。
                  <div className=" grid grid-cols-2 gap-3">
                    <div><CheckCircle /> 多言語対応</div>
                    <div><CheckCircle /> 音読機能</div>
                    <div><CheckCircle /> 無制限のテキスト保存</div>
                    <div><CheckCircle /> 自由なブロック表示</div>
                  </div>
                </div>
              </div>
              <Image src="/lingo-fill-test.png" width="800" height="800" alt='ロゴ' />
            </div>
          </div> 
          <div className=" flex flex-col justify-center items-center mt-32">
            <h1 className=" text-5xl text-blue-500">音声読み上げ</h1>
            <div className=" flex">
              <div className=" flex pt-16 px-6 gap-5">
                <div className=" flex flex-col gap-5 dark:text-gray-300">
                  Lingo Fillは、AIにより強化された音声を好きな箇所で何度でも繰り返し聴くことができます
                  <div className=" grid grid-cols-2 gap-3">
                    <div><CheckCircle /> 多言語対応</div>
                    <div><CheckCircle /> 音読機能</div>
                    <div><CheckCircle /> 無制限のテキスト保存</div>
                    <div><CheckCircle /> 自由なブロック表示</div>
                  </div>
                </div>
              </div>
              <Image src="/lingo-fill-test.png" width="800" height="800" alt='ロゴ' />
            </div>
          </div> 
          <div className=" flex flex-col justify-center items-center mt-32">
            <h1 className=" text-5xl text-blue-500">無制限のテキスト保存</h1>
            <div className=" flex">
              <div className=" flex pt-16 px-6 gap-5">
                <div className=" flex flex-col gap-5 dark:text-gray-300">
                  Lingo Fillは、あなたの作成したオリジナルテキストを厳重に保管します。また、無制限のテキスト保存が可能です。
                  <div className=" grid grid-cols-2 gap-3">
                    <div><CheckCircle /> 多言語対応</div>
                    <div><CheckCircle /> 音読機能</div>
                    <div><CheckCircle /> 無制限のテキスト保存</div>
                    <div><CheckCircle /> 自由なブロック表示</div>
                  </div>
                </div>
              </div>
              <Image src="/lingo-fill-test.png" width="800" height="800" alt='ロゴ' />
            </div>
          </div> 
          <div className=" flex flex-col justify-center items-center mt-32">
            <h1 className=" text-5xl text-blue-500">自由なブロック表示</h1>
            <div className=" flex">
              <div className=" flex pt-16 px-6 gap-5">
                <div className=" flex flex-col gap-5 dark:text-gray-300">
                  Lingo Fillは、暗記したい単語、熟語を好きなようにカスタマイズして表示できます。例えば、母国語に翻訳して表示したり、空白にして音声によるリスニングにも使えます。
                  <div className=" grid grid-cols-2 gap-3">
                    <div><CheckCircle /> 多言語対応</div>
                    <div><CheckCircle /> 音読機能</div>
                    <div><CheckCircle /> 無制限のテキスト保存</div>
                    <div><CheckCircle /> 自由なブロック表示</div>
                  </div>
                </div>
              </div>
              <Image src="/lingo-fill-test.png" width="800" height="800" alt='ロゴ' />
            </div>
          </div> 
          <div className=" flex flex-col justify-center items-center mt-32">
            <h1 className=" text-5xl text-blue-500">スタイリッシュなUI</h1>
            <div className=" flex">
              <div className=" flex pt-16 px-6 gap-5">
                <div className=" flex flex-col gap-5 dark:text-gray-300">
                  Lingo Fillは、ライトモード、ダークモードをあなたのシステムに合わせて自動的に変更します。ボタンにはツールチップを表示しユーザーフレンドリーなUIを提供します。
                  <div className=" grid grid-cols-2 gap-3">
                    <div><CheckCircle /> 多言語対応</div>
                    <div><CheckCircle /> 音読機能</div>
                    <div><CheckCircle /> 無制限のテキスト保存</div>
                    <div><CheckCircle /> 自由なブロック表示</div>
                  </div>
                </div>
              </div>
              <Image src="/lingo-fill-test.png" width="800" height="800" alt='ロゴ' />
            </div>
          </div> 
          <div className=" flex flex-col justify-center items-center mt-32">
            <h1 className=" text-5xl text-blue-500">多端末での共有</h1>
            <div className=" flex">
              <div className=" flex pt-16 px-6 gap-5">
                <div className=" flex flex-col gap-5 dark:text-gray-300">
                  Lingo Fillは、サーバーでテキストを保管します。そのため、PCで作成したテキストを旅先でスマートフォンを使用し操作することが可能です。
                  <div className=" grid grid-cols-2 gap-3">
                    <div><CheckCircle /> 多言語対応</div>
                    <div><CheckCircle /> 音読機能</div>
                    <div><CheckCircle /> 無制限のテキスト保存</div>
                    <div><CheckCircle /> 自由なブロック表示</div>
                  </div>
                </div>
              </div>
              <Image src="/lingo-fill-test.png" width="800" height="800" alt='ロゴ' />
            </div>
          </div> 
          <div className=" flex flex-col justify-center items-center mt-32">
            <h1 className=" text-5xl text-blue-500">AIによる補完</h1>
            <div className=" flex">
              <div className=" flex pt-16 px-6 gap-5">
                <div className=" flex flex-col gap-5 dark:text-gray-300">
                  Lingo Fillは、GPT4による補完を提供します。使い方の分からない単語、熟語を自動的にAIが補完し表示します。
                  <div className=" grid grid-cols-2 gap-3">
                    <div><CheckCircle /> 多言語対応</div>
                    <div><CheckCircle /> 音読機能</div>
                    <div><CheckCircle /> 無制限のテキスト保存</div>
                    <div><CheckCircle /> 自由なブロック表示</div>
                  </div>
                </div>
              </div>
              <Image src="/lingo-fill-test.png" width="800" height="800" alt='ロゴ' />
            </div>
          </div> 
        </div>
      }
    </div>
  )
}

export default Doc
"use client"

import "../../globals.css";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import Image from "next/image";
import { CloudUpload, Comment, Description, DevicesOther, Language, Launch, MoneyOff, Psychology, RecordVoiceOver, Translate } from "@mui/icons-material";
import { Amplify } from "aws-amplify";
import awsExports from "../../../aws-exports";
import { Divider } from "@mui/material";
import { useWindowSize } from "@/hooks/hooks";
import DocumentUsage from "@/components/uncertified/DocumentUsage";
import DocumentDetails from "@/components/uncertified/DocumentDetails";
import DocumentHeader from "@/components/uncertified/DocumentHeader";
import DocumentOverview from "@/components/uncertified/DocumentOverview";
import DocumentDetailsMobile from "@/components/uncertified/DocumentDetailsMobile";

Amplify.configure(awsExports);

function Doc() {
  const [login, setLogin] = useState(false);
  const transferHomeRoute = () => {
    window.open('https://www.lingo-fill.com/', '_blank');
  }
  const deviceSize = useWindowSize();

  const divideUI = () => {
    if (deviceSize.width <= 425) {
      return(
        <div className=" dark:text-gray-300">
          <DocumentHeader 
            setLogin={setLogin}
            buttonClass=" text-sm px-3 py-2"
          />
          <div className=" flex flex-col justify-center items-center">
            <h1 className=" text-3xl text-blue-500">
              Lingo Fillとは
            </h1>
            <div className=" flex flex-col pt-12 px-6 gap-5">
              <DocumentOverview className=" text-sm"/>
            </div>
            <Image src="/lingo_fill.png" width="720" height="450" alt='ロゴ' />
          </div>

          <Divider className=" mt-16"/>

          <div className=" flex flex-col justify-center items-center mt-16 gap-3">
            <h1 className=" text-base text-blue-500"><Description style={{ fontSize: 40 }} />使い方</h1>

            <div className=" font-extrabold">①アカウントの作成</div>
            <div className="flex flex-col gap-1 text-sm">
              <div><span className=" font-extrabold">[始めての方]</span>からアカウントを作成もしくは、Googleでサインインします。</div>
            </div>
            <Image src="/signin.png" width="720" height="450" alt='ロゴ' />

            <div className=" font-extrabold mt-20">②新規テキストの作成</div>
            <div className="flex flex-col gap-1 text-sm">
              <div>(1)新規テキストボタンをクリックします。</div>
              <div>(2)テキストの名前をつけたら作成します。</div>
            </div>
            <Image src="/create_text.png" width="720" height="450" alt='ロゴ' />

            <div className=" font-extrabold mt-20">③文章の入力</div>
            <div className="flex flex-col gap-1 text-sm">
              <div>(1)インターネット上から好きな文章をコピー(Command + C)します。</div>
              <div>(2)そのまま先ほど作成した空のテキストにペースト(Command + V)します。</div>
            </div>
            <Image src="/paste.png" width="720" height="450" alt='ロゴ' />

            <div className=" font-extrabold mt-20">④学習する</div>
            <div className="flex flex-col gap-1 text-sm">
              <div>・ 単語をタップ、熟語をスクロール選択して意味を確認します。</div>
              <div>・ 用法、他の意味を知りたい場合はAIに使い方を聞きます。</div>
              <div>・ 読み上げを使用して聞き取れないところを反復して聞きます。</div>
              <div>・ メモを作成して、単語の用法、意味を保存しておきます。</div>
            </div>
            <Image src="/modal.png" width="720" height="450" alt='ロゴ' />
          </div>

          <Divider className=" mt-16"/>

          <DocumentDetailsMobile
            title={<><Language style={{ fontSize: 40 }} />多言語対応</>}
            text={<><div>Lingo Fillはさまざまな言語に対応しています。</div>
            <div>あなたの学びたい言語にも対応しているはずです。</div>
            <div className=" text-sm">
              対応言語: 日本語, English, Español, Français, Deutsch, Italiano, Português, Русский, عربي, 한국어, 中国語, हिंदी
            </div></>}
            img="/world.png"
          />
          <DocumentDetailsMobile
            title={<><Translate style={{ fontSize: 40 }} />素早く正確な翻訳</>}
            text={<><div>Lingo Fillはあなたの分からない単語、熟語を高速で翻訳します。</div>
            <div>翻訳するには単語をクリック、熟語は複数選択するだけです。</div></>}
            img="/translate.png"
          />
          <DocumentDetailsMobile
            title={<><Psychology style={{ fontSize: 40 }} />AIによる補完</>}
            text={<><div>Lingo Fillは、AIによる補完を提供します。</div>
            <div>用法、意味の分からない単語、熟語は積極的にAIを使います。</div></>}
            img="/wandering-mind.svg"
          />
          <DocumentDetailsMobile
            title={<><RecordVoiceOver style={{ fontSize: 40 }} />音声読み上げ</>}
            text={<><div>Lingo Fillは自然な音声を文章の好きな箇所から繰り返し聞くことができます。</div></>}
            img="/speaker-1.svg"
          />
          <DocumentDetailsMobile
            title={<><Comment style={{ fontSize: 40 }} />自分だけのメモの作成</>}
            text={<><div>Lingo Fillは、用法、意味のメモをすぐに作成できます。</div>
            <div>単語、熟語の意味、用法などは分からなくてもAIが教えてくれます。</div></>}
            img="/Taking-Notes-2.svg"
          />
          <DocumentDetailsMobile
            title={<><CloudUpload style={{ fontSize: 40 }} />無制限のテキスト保存</>}
            text={<><div>Lingo Fillは、制限のないのテキスト保存が可能です。</div>
            <div>オンライン上で保存するためあなたのデバイスを圧迫しません。</div></>}
            img="/2108272.png"
          />
          <DocumentDetailsMobile
            title={<><DevicesOther style={{ fontSize: 40 }} />多端末での共有</>}
            text={<><div>Lingo Fillは、アカウントごとにオンライン上でテキストを保管します。</div>
            <div>同じアカウントを共有することで、友達と同じテキストを共有します。</div></>}
            img="/the-cloud.svg"
          />
          <DocumentDetailsMobile
            title={<><MoneyOff style={{ fontSize: 40 }} />すべての機能が無料</>}
            text={<><div>Lingo Fillは、これらすべての機能が無料で使えます。</div>
            <div>使用してお金が発生することは一切ありません。</div></>}
            img="/no_money.svg"
          />
        </div>
      )
    } else if (deviceSize.width <= 768) {
      return(
        <div>
          <DocumentHeader 
            setLogin={setLogin}
            titleClass="text-2xl"
            buttonClass="px-3 py-2"
            lingoFill="Lingo Fill"
          />
          <div className=" flex flex-col justify-center items-center">
            <h1 className=" text-7xl text-blue-500">
              Lingo Fillとは
            </h1>
            <div className=" flex flex-col pt-12 px-6 gap-5">
              <DocumentOverview className="text-lg"/>
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
            <div className="flex flex-col gap-1">
              <div>(1)新規テキストボタンをクリックします。</div>
              <div>(2)テキストの名前をつけたら作成します。</div>
            </div>
            <Image src="/create_text.png" width="720" height="450" alt='ロゴ' />

            <div className=" font-extrabold text-lg mt-20">③文章の入力</div>
            <div className="flex flex-col gap-1">
              <div>(1)インターネット上から好きな文章をコピー(Command + C)します。</div>
              <div>(2)そのまま先ほど作成した空のテキストにペースト(Command + V)します。</div>
            </div>
            <Image src="/paste.png" width="720" height="450" alt='ロゴ' />

            <div className=" font-extrabold text-lg mt-20">④学習する</div>
            <div className="flex flex-col gap-1">
              <div>・ 単語をタップ、熟語をスクロール選択して意味を確認します。</div>
              <div>・ 用法、他の意味を知りたい場合はAIに使い方を聞きます。</div>
              <div>・ 読み上げを使用して聞き取れないところを反復して聞きます。</div>
              <div>・ メモを作成して、単語の用法、意味を保存しておきます。</div>
            </div>
            <Image src="/modal.png" width="720" height="450" alt='ロゴ' />
          </div>

          <Divider className=" mt-16"/>

          <DocumentDetailsMobile
            title={<><Language style={{ fontSize: 40 }} />多言語対応</>}
            text={<><div>Lingo Fillはさまざまな言語に対応しています。</div>
            <div>あなたの学びたい言語にも対応しているはずです。</div>
            <div className=" text-sm">
              対応言語: 日本語, English, Español, Français, Deutsch, Italiano, Português, Русский, عربي, 한국어, 中国語, हिंदी
            </div></>}
            img="/world.png"
          />
          <DocumentDetailsMobile
            title={<><Translate style={{ fontSize: 40 }} />素早く正確な翻訳</>}
            text={<><div>Lingo Fillはあなたの分からない単語、熟語を高速で翻訳します。</div>
            <div>翻訳するには単語をクリック、熟語は複数選択するだけです。</div></>}
            img="/translate.png"
          />
          <DocumentDetailsMobile
            title={<><Psychology style={{ fontSize: 40 }} />AIによる補完</>}
            text={<><div>Lingo Fillは、AIによる補完を提供します。</div>
            <div>用法、意味の分からない単語、熟語は積極的にAIを使います。</div></>}
            img="/wandering-mind.svg"
          />
          <DocumentDetailsMobile
            title={<><RecordVoiceOver style={{ fontSize: 40 }} />音声読み上げ</>}
            text={<><div>Lingo Fillは自然な音声を文章の好きな箇所から繰り返し聞くことができます。</div></>}
            img="/speaker-1.svg"
          />
          <DocumentDetailsMobile
            title={<><Comment style={{ fontSize: 40 }} />自分だけのメモの作成</>}
            text={<><div>Lingo Fillは、用法、意味のメモをすぐに作成できます。</div>
            <div>単語、熟語の意味、用法などは分からなくてもAIが教えてくれます。</div></>}
            img="/Taking-Notes-2.svg"
          />
          <DocumentDetailsMobile
            title={<><CloudUpload style={{ fontSize: 40 }} />無制限のテキスト保存</>}
            text={<><div>Lingo Fillは、制限のないのテキスト保存が可能です。</div>
            <div>オンライン上で保存するためあなたのデバイスを圧迫しません。</div></>}
            img="/2108272.png"
          />
          <DocumentDetailsMobile
            title={<><DevicesOther style={{ fontSize: 40 }} />多端末での共有</>}
            text={<><div>Lingo Fillは、アカウントごとにオンライン上でテキストを保管します。</div>
            <div>同じアカウントを共有することで、友達と同じテキストを共有します。</div></>}
            img="/the-cloud.svg"
          />
          <DocumentDetailsMobile
            title={<><MoneyOff style={{ fontSize: 40 }} />すべての機能が無料</>}
            text={<><div>Lingo Fillは、これらすべての機能が無料で使えます。</div>
            <div>使用してお金が発生することは一切ありません。</div></>}
            img="/no_money.svg"
          />
        </div>
      )
    } else {
      return(
        <div>
          <DocumentHeader 
            setLogin={setLogin}
            titleClass="text-2xl"
            buttonClass="px-3 py-2"
            lingoFill="Lingo Fill"
          />
          <div className=" flex justify-center items-center">
            <div className=" flex flex-col pt-12 px-6 gap-5">
              <h1 className=" text-7xl text-blue-500">
                Lingo Fillとは
              </h1>
              <DocumentOverview className="text-lg"/>
            </div>
            <Image src="/lingo_fill.png" width="720" height="450" alt='ロゴ' />
          </div>

          <Divider className=" mt-16"/>

          <div className=" flex flex-col justify-center items-center mt-16">
            <h1 className=" text-5xl text-blue-500"><Description style={{ fontSize: 40 }} />使い方</h1>
            <div className=" flex flex-col gap-2">
              <DocumentUsage 
                title="①アカウントの作成"
                text={<div><span className=" font-extrabold">[始めての方]</span>からアカウントを作成もしくは、Googleでサインインします。</div>}
                img="/signin.png"
              />
              <DocumentUsage 
                title="②新規テキストの作成"
                text={<><div>(1)新規テキストボタンをクリックします。</div>
                      <div>(2)テキストの名前をつけたら作成します。</div></>}
                img="/create_text.png"
              />
              <DocumentUsage 
                title="③文章の入力"
                text={<><div>(1)インターネット上から好きな文章をコピー(Command + C)します。</div>
                <div>(2)そのまま先ほど作成した空のテキストにペースト(Command + V)します。</div></>}
                img="/paste.png"
              />
              <DocumentUsage 
                title="④学習する"
                text={<><div>- 単語をタップ、熟語をスクロール選択して意味を確認します。</div>
                <div>- 用法、他の意味を知りたい場合はAIに使い方を聞きます。</div>
                <div>- 読み上げを使用して聞き取れないところを反復して聞きます。</div>
                <div>- メモを作成して、単語の用法、意味を保存しておきます。</div></>}
                img="/modal.png"
              />
            </div>
          </div> 

          <Divider className=" mt-16"/>

          <DocumentDetails 
            title={<><Language style={{ fontSize: 40 }} />多言語対応</>}
            text={<><div>Lingo Fillはさまざまな言語に対応しています。</div>
            <div>あなたの学びたい言語にも対応しているはずです。</div>
            <div className=" text-sm">
              対応言語: 日本語, English, Español, Français, Deutsch, Italiano, Português, Русский, عربي, 한국어, 中国語, हिंदी
            </div></>}
            img="/world.png"
          />
          <DocumentDetails 
            title={<><Translate style={{ fontSize: 40 }} />素早く正確な翻訳</>}
            text={<><div>Lingo Fillはあなたの分からない単語、熟語を高速で翻訳します。</div>
            <div>翻訳するには単語をクリック、熟語は複数選択するだけです。</div></>}
            img="/translate.png"
          />
          <DocumentDetails 
            title={<><Psychology style={{ fontSize: 40 }} />AIによる補完</>}
            text={<><div>Lingo Fillは、AIによる補完を提供します。</div>
            <div>用法、意味の分からない単語、熟語は積極的にAIを使います。</div></>}
            img="/wandering-mind.svg"
          />
          <DocumentDetails 
            title={<><RecordVoiceOver style={{ fontSize: 40 }} />音声読み上げ</>}
            text={<><div>Lingo Fillは自然な音声を文章の好きな箇所から繰り返し聞くことができます。</div></>}
            img="/speaker-1.svg"
          />
          <DocumentDetails 
            title={<><Comment style={{ fontSize: 40 }} />自分だけのメモの作成</>}
            text={<><div>Lingo Fillは、用法、意味のメモをすぐに作成できます。</div>
            <div>単語、熟語の意味、用法などは分からなくてもAIが教えてくれます。</div></>}
            img="/Taking-Notes-2.svg"
          />
          <DocumentDetails 
            title={<><CloudUpload style={{ fontSize: 40 }} />無制限のテキスト保存</>}
            text={<><div>Lingo Fillは、制限のないのテキスト保存が可能です。</div>
            <div>オンライン上で保存するためあなたのデバイスを圧迫しません。</div></>}
            img="/2108272.png"
          />
          <DocumentDetails 
            title={<><DevicesOther style={{ fontSize: 40 }} />多端末での共有</>}
            text={<><div>Lingo Fillは、アカウントごとにオンライン上でテキストを保管します。</div>
            <div>同じアカウントを共有することで、友達と同じテキストを共有します。</div></>}
            img="/the-cloud.svg"
          />
          <DocumentDetails
            title={<><MoneyOff style={{ fontSize: 40 }} />すべての機能が無料</>}
            text={<><div>Lingo Fillは、これらすべての機能が無料で使えます。</div>
            <div>使用してお金が発生することは一切ありません。</div></>}
            img="/no_money.svg"
          />
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
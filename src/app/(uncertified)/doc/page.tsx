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
import { useTranslation } from "react-i18next";

Amplify.configure(awsExports);

function Doc() {
  const [login, setLogin] = useState(false);
  const { t } = useTranslation();

  const transferHomeRoute = () => {
    window.open('https://www.lingo-fill.com/', '_blank');
  }
  const deviceSize = useWindowSize();

  const divideUI = () => {
    if (deviceSize.width <= 768) {
      return(
        <div className=" text-sm">
          <DocumentHeader 
            setLogin={setLogin}
            buttonClass="px-3 py-2"
          />
          <div className=" flex flex-col justify-center items-center">
            <h1 className=" text-4xl md:text-7xl text-blue-500">
              {t('explanation.WhatisLingoFill')}
            </h1>
            <div className=" flex flex-col pt-12 px-6 gap-5">
              <DocumentOverview className="text-sm md:text-lg"/>
            </div>
            <Image src="/lingo_fill.png" width="720" height="450" alt='ロゴ' />
          </div>

          <Divider className=" mt-16"/>

          <div className=" flex flex-col justify-center items-center mt-16 gap-3 dark:text-gray-300">
            <h1 className=" text-5xl text-blue-500"><Description style={{ fontSize: 40 }} />{t('explanation.How to use')}</h1>

            <div className=" font-extrabold text-lg">{t('explanation.createAccount.title')}</div>
            <div>{t('explanation.createAccount.one')}</div>
            <Image src="/signin.png" width="720" height="450" alt='ロゴ' />

            <div className=" font-extrabold text-lg mt-20">{t('explanation.createText.title')}</div>
            <div className="flex flex-col gap-1">
              <div>{t('explanation.createText.one')}</div>
              <div>{t('explanation.createText.two')}</div>
            </div>
            <Image src="/create_text.png" width="720" height="450" alt='ロゴ' />

            <div className=" font-extrabold text-lg mt-20">{t('explanation.inputText.title')}</div>
            <div className="flex flex-col gap-1">
              <div>{t('explanation.createText.one')}</div>
              <div>{t('explanation.createText.two')}</div>
            </div>
            <Image src="/paste.png" width="720" height="450" alt='ロゴ' />

            <div className=" font-extrabold text-lg mt-20">{t('explanation.learn.title')}</div>
            <div className="flex flex-col gap-1">
              <div>{t('explanation.learn.one')}</div>
              <div>{t('explanation.learn.two')}</div>
              <div>{t('explanation.learn.three')}</div>
              <div>{t('explanation.learn.four')}</div>
            </div>
            <Image src="/modal.png" width="720" height="450" alt='ロゴ' />
          </div>

          <Divider className=" mt-16"/>

          <DocumentDetailsMobile
            title={<><Language style={{ fontSize: 40 }} />{t('explanation.multilingualSupport.title')}</>}
            text=
              {<>
                <div>{t('explanation.multilingualSupport.one')}</div>
                <div>{t('explanation.multilingualSupport.two')}</div>
                <div className=" text-sm">{t('explanation.multilingualSupport.three')}</div>
              </>}
            img="/world.png"
          />
          <DocumentDetailsMobile
            title={<><Translate style={{ fontSize: 40 }} />{t('explanation.translation.title')}</>}
            text={<><div>{t('explanation.translation.one')}</div>
            <div>{t('explanation.translation.two')}</div></>}
            img="/translate.png"
          />
          <DocumentDetailsMobile
            title={<><Psychology style={{ fontSize: 40 }} />{t('explanation.ai.title')}</>}
            text={<><div>{t('explanation.ai.one')}</div>
            <div>{t('explanation.ai.two')}</div></>}
            img="/wandering-mind.svg"
          />
          <DocumentDetailsMobile
            title={<><RecordVoiceOver style={{ fontSize: 40 }} />{t('explanation.audio.title')}</>}
            text={<><div>{t('explanation.audio.one')}</div></>}
            img="/speaker-1.svg"
          />
          <DocumentDetailsMobile
            title={<><Comment style={{ fontSize: 40 }} />{t('explanation.memo.title')}</>}
            text={<><div>{t('explanation.memo.one')}</div>
            <div>{t('explanation.memo.two')}</div></>}
            img="/Taking-Notes-2.svg"
          />
          <DocumentDetailsMobile
            title={<><CloudUpload style={{ fontSize: 40 }} />{t('explanation.text.title')}</>}
            text={<><div>{t('explanation.text.one')}</div>
            <div>{t('explanation.text.two')}</div></>}
            img="/2108272.png"
          />
          <DocumentDetailsMobile
            title={<><DevicesOther style={{ fontSize: 40 }} />{t('explanation.share.title')}</>}
            text={<><div>{t('explanation.share.one')}</div>
            <div>{t('explanation.share.two')}</div></>}
            img="/the-cloud.svg"
          />
          <DocumentDetailsMobile
            title={<><MoneyOff style={{ fontSize: 40 }} />{t('explanation.free.title')}</>}
            text={<><div>{t('explanation.free.one')}</div>
            <div>{t('explanation.free.two')}</div></>}
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
                {t('explanation.WhatisLingoFill')}
              </h1>
              <DocumentOverview className="text-lg"/>
            </div>
            <Image src="/lingo_fill.png" width="720" height="450" alt='ロゴ' />
          </div>

          <Divider className=" mt-16"/>

          <div className=" flex flex-col justify-center items-center mt-16">
            <h1 className=" text-5xl text-blue-500"><Description style={{ fontSize: 40 }} />{t('explanation.How to use')}</h1>
            <div className=" flex flex-col gap-2">
              <DocumentUsage 
                title={t('explanation.createAccount.title')}
                text={<div>{t('explanation.createAccount.one')}</div>}
                img="/signin.png"
              />
              <DocumentUsage 
                title={t('explanation.createText.title')}
                text={<><div>{t('explanation.createText.one')}</div>
                <div>{t('explanation.createText.two')}</div></>}
                img="/create_text.png"
              />
              <DocumentUsage 
                title={t('explanation.inputText.title')}
                text={<><div>{t('explanation.createText.one')}</div>
                <div>{t('explanation.createText.two')}</div></>}
                img="/paste.png"
              />
              <DocumentUsage 
                title={t('explanation.learn.title')}
                text={<> <div>{t('explanation.learn.one')}</div>
                <div>{t('explanation.learn.two')}</div>
                <div>{t('explanation.learn.three')}</div>
                <div>{t('explanation.learn.four')}</div></>}
                img="/modal.png"
              />
            </div>
          </div> 

          <Divider className=" mt-16"/>

          <DocumentDetails 
            title={<><Language style={{ fontSize: 40 }} />{t('explanation.multilingualSupport.title')}</>}
            text={<><div>{t('explanation.multilingualSupport.one')}</div>
            <div>{t('explanation.multilingualSupport.two')}</div>
            <div className=" text-sm">{t('explanation.multilingualSupport.three')}</div></>}
            img="/world.png"
          />
          <DocumentDetails 
            title={<><Translate style={{ fontSize: 40 }} />{t('explanation.translation.title')}</>}
            text={<><div>{t('explanation.translation.one')}</div>
            <div>{t('explanation.translation.two')}</div></>}
            img="/translate.png"
          />
          <DocumentDetails 
            title={<><Psychology style={{ fontSize: 40 }} />{t('explanation.ai.title')}</>}
            text={<><div>{t('explanation.ai.one')}</div>
            <div>{t('explanation.ai.two')}</div></>}
            img="/wandering-mind.svg"
          />
          <DocumentDetails 
            title={<><RecordVoiceOver style={{ fontSize: 40 }} />{t('explanation.audio.title')}</>}
            text={<><div>{t('explanation.audio.one')}</div></>}
            img="/speaker-1.svg"
          />
          <DocumentDetails 
            title={<><Comment style={{ fontSize: 40 }} />{t('explanation.memo.title')}</>}
            text={<><div>{t('explanation.memo.one')}</div>
            <div>{t('explanation.memo.two')}</div></>}
            img="/Taking-Notes-2.svg"
          />
          <DocumentDetails 
            title={<><CloudUpload style={{ fontSize: 40 }} />{t('explanation.text.title')}</>}
            text={<><div>{t('explanation.text.one')}</div>
            <div>{t('explanation.text.two')}</div></>}
            img="/2108272.png"
          />
          <DocumentDetails 
            title={<><DevicesOther style={{ fontSize: 40 }} />{t('explanation.share.title')}</>}
            text={<><div>{t('explanation.share.one')}</div>
            <div>{t('explanation.share.two')}</div></>}
            img="/the-cloud.svg"
          />
          <DocumentDetails
            title={<><MoneyOff style={{ fontSize: 40 }} />{t('explanation.free.title')}</>}
            text={<><div>{t('explanation.free.one')}</div>
            <div>{t('explanation.free.two')}</div></>}
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
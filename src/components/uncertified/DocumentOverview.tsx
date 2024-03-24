
import { CloudUpload, Comment, DevicesOther, Language, Psychology, RecordVoiceOver, Translate } from '@mui/icons-material'
import React from 'react'

type Props = {
  className?: string,
}

function DocumentOverview(props: Props) {
  const { className } = props;

  // textlgをclassnameで
  return (
    <div className=" flex flex-col gap-5 dark:text-gray-300">
      <div className={`font-bold ${ className }`}>シンプルな長文専用の言語学習サービスです。</div>
      <div className={`${className}`}>あなただけの言語学習テキストを簡単に作成できます。</div>
      <div className={`grid grid-cols-2 gap-3 ${className}`} >
        <div className=" flex items-center gap-1"><Language /> 多言語対応</div>
        <div className=" flex items-center gap-1"><Translate /> 高速で正確な翻訳</div>
        <div className=" flex items-center gap-1"><Psychology /> AIによる補完</div>
        <div className=" flex items-center gap-1"><RecordVoiceOver /> 自然な音声読み上げ</div>
        <div className=" flex items-center gap-1"><Comment /> 自分だけのメモの作成</div>
        <div className=" flex items-center gap-1"><CloudUpload /> 無制限のテキスト保存</div>
        <div className=" flex items-center gap-1"><DevicesOther /> 多端末での共有</div>
      </div>
    </div>
  )
}

export default DocumentOverview
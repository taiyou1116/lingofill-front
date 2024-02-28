import { m_plus_rounded_1c } from '@/store/fontStore';
import { TranslationObj } from '@/types/types';
import { VolumeUp } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

type Props = {
  words: string[] | undefined,
  translations: TranslationObj[],
}

function PreviewDocument(props: Props) {
  const { words, translations } = props;

  return (
    <div className="break-all overflow-y-auto max-h-[calc(100vh-200px)] p-3 rounded-md bg-white dark:bg-slate-600 dark:text-slate-300" >
      {words?.map((word, index) => {
        // すでに日本語訳されているか確認
        const translation = translations.find(translation => translation.indexes.includes(index));

        // 単語 or 熟語の一文字目か確認
        if (translation && translation.indexes[0] === index) {
          return (
            <Tooltip 
              key={index} 
              title={
              <div className={` text-sm ${m_plus_rounded_1c.className}`}>
                <div className=' memo-output'>{ translation.memo }</div>
              </div>}
            >
              <span className={`py-0.5 px-1 mx-0.5 cursor-pointer bg-slate-200 rounded-md dark:bg-slate-900 text-sm`}>
                {translation.translatedText}
              </span>
            </Tooltip>
          );
        } else if (!translation) {
          // 翻訳されていない単語、または熟語の2番目以降の単語をスキップ
          return (
            <span
              key={index}
              className={`p-0.5 cursor-pointer`}
            >
              {word}
            </span>
          );
        }
      })}
    </div>
  )
}

export default PreviewDocument
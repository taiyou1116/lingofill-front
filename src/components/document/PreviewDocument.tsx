import { TranslationObj } from '@/types/types';

type Props = {
  words: string[] | undefined,
  translations: TranslationObj[],
}

function PreviewDocument(props: Props) {
  const { words, translations } = props;

  return (
    <div>
      {words?.map((word, index) => {
        // すでに日本語訳されているか確認
        const translation = translations.find(translation => translation.indexes.includes(index));

        // 単語 or 熟語の一文字目か確認
        if (translation && translation.indexes[0] === index) {
          return (
            <span
              key={index}
              className={`py-0.5 px-2 cursor-pointer bg-slate-200 rounded-md`}
            >
              {translation.translatedText}
            </span>
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
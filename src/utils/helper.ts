import { Document, LanguageVoiceMap, VoiceType } from "@/types/types";
import { Predictions } from "@aws-amplify/predictions";
import { getAudio } from "./request";

export function createDate(timestamp: string) {
  const date = new Date(Number(timestamp));
  return date.toLocaleString();
}

export async function translateText(text: string, ln: string, translateLn : string) {
  try {
    const result = await Predictions.convert({
      translateText: {
        source: {
          text: text,
          language: ln,
        },
        targetLanguage: translateLn
      }
    });
    
    return result.text;
  } catch (err) {
    console.error(err);
  }
}

// 言語と音声セット 0 standard, 1 neural
// ロシア語、アラビア語はneural非対応
const languageVoiceMap: LanguageVoiceMap = {
  en: ['Salli', 'Salli'],
  ja: ['Mizuki', 'Kazuha'],
  es: ['Lupe', 'Lupe'],
  fr: ['Lea', 'Lea'],
  de: ['Vicki', 'Vicki'],
  it: ['Bianca', 'Bianca'],
  pt: ['Ines', 'Ines'],
  ru: ['Tatyana', ''],
  ar: ['Zeina', ''],
  ko: ['Seoyeon', 'Seoyeon'],
  zh: ['Zhiyu', 'Zhiyu'],
  hi: ['Aditi', 'Kajal'],
};

export function getVoiceForLanguage(languageCode: string, voiceType: VoiceType): string {
  if (voiceType === 'neural') {
    return languageVoiceMap[languageCode][1];
  } else {
    return languageVoiceMap[languageCode][0];
  }
}

let audioStream: HTMLAudioElement;
if (typeof window !== 'undefined') {
  // 実行環境がクライアントサイドの場合のみAudioオブジェクトを初期化
  audioStream = new Audio();
}

export { audioStream };

// translateDocumentでの再生(文章を1つずつ取得)
export async function processAndSpeak(
  textSegments: string[], voice: string, onPlay: () => void, onEnd: () => void, plusOne: () => void,
  voiceType: string, voiceRate: string,
  ) {
  onPlay();
  if (audioStream !== undefined) {
    if (!audioStream.paused) {
      audioStream.pause();
    }
  }
  
  for (const segment of textSegments) {
    try {
      // Amazon Pollyへのリクエストを送信して音声データを取得
      audioStream = await getAudio(segment, voice, voiceType, voiceRate + '%'); //初期値 standard 100%
      await playAudioStream(audioStream);
      plusOne();
    } catch (error) {
      console.error("Error processing text segment:", error);
    }
  }
  onEnd();
}

async function playAudioStream(audioStream: HTMLAudioElement) {
  return new Promise((resolve, reject) => {
    audioStream.onended = resolve;
    audioStream.onerror = reject;
    audioStream.play();
  });
}

export async function stopAudio() {
  if (audioStream !== undefined) {
    if (!audioStream.paused) {
      audioStream.pause();
    }
  }
}

/**スペースのある言語でtrueを返す */
export function judgeSpaceLanguage(ln: string | undefined) {
  if (ln === 'ja' || ln === 'zh') {
    return false;
  } else {
    return true;
  }
}

/**スペースのある言語か判別する @param text テキスト @param ln 言語 */
export function splitTextToSegments(text: string, ln: string | undefined) {
  if (judgeSpaceLanguage(ln)) {
    return text.split(/(?<=[.?!])\s+/);
  } else {
    return text.split(/(?<=[。!?])/);
  } 
}

/**表示したい文字数を指定 @param text 表示テキスト @param maxLength 指定の長さ */
export function truncateText(text: string | undefined, maxLength: number) {
  if (text && text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}

/**スペースのある言語か判別する @param text テキスト @param ln 言語 */
export function splitTextToSegment(text: string, ln: string): string[] {
  if (judgeSpaceLanguage(ln)) {
    return text.split('\n').reduce((acc, line, index, array) => {
      // 文の終わり（. ? !）で分割し、空ではない結果だけをフィルターする
      const sentences = line.match(/[^.!?]*[.!?]*/g)?.map(sentence => sentence.trim()).filter(sentence => sentence.length) || [];
  
      // 文ごとに結果に追加
      acc.push(...sentences);
  
      // 最後の行以外には改行を追加
      if (index < array.length - 1) {
        acc.push('\n');
      }
  
      return acc;
    }, [] as string[]);
  } else {
    return text.split('\n').reduce((acc, line, index, array) => {
      // 文の終わり（. ? !）で分割し、空ではない結果だけをフィルターする
      const sentences = line.match(/[^。!?]*[。!?]*/g)?.map(sentence => sentence.trim()).filter(sentence => sentence.length) || [];
  
      // 文ごとに結果に追加
      acc.push(...sentences);
  
      // 最後の行以外には改行を追加
      if (index < array.length - 1) {
        acc.push('\n');
      }
  
      return acc;
    }, [] as string[]);
  }
}

export function leaveTranslation(document: Document, selectedWordsIndexes: number[]) {
  // 選択された単語、熟語以外のtranslation
  const leaveTranslations = document.translations.filter(
    (translation) => (!selectedWordsIndexes.includes(translation.indexes[0])));

  // document, documentsも更新
  const newDocument = {
    ...document,
    translations: leaveTranslations,
    isSynced: false,
  };

  return newDocument;
}

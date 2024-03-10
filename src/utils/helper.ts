import { LanguageVoiceMap, VoiceType } from "@/types/types";
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
  en: ['Salli', 'Slli'],
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

export function judgeSpaceLanguage(ln: string | undefined) {
  if (ln === 'ja' || ln === 'zh') {
    return false;
  } else {
    return true;
  }
}

export function splitTextToSegments(text: string, ln: string | undefined) {
  if (judgeSpaceLanguage(ln)) {
    return text.split(/(?<=[.?!])\s+/);
  } else {
    return text.split(/(?<=[。!?])/);
  } 
}

export function truncateText(text: string | undefined, maxLength: number) {
  // テキストが指定された最大長より長い場合、指定された長さで切り取り、末尾に '...' を追加
  if (text && text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  // テキストが最大長以下の場合、そのまま返す
  return text;
}

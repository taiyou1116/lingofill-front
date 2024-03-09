import { LanguageVoiceMap } from "@/types/types";
import { Predictions } from "@aws-amplify/predictions";

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

// 言語と音声セット
const languageVoiceMap: LanguageVoiceMap = {
  en: 'Salli',
  ja: 'Mizuki',
  es: 'Lupe',
  fr: 'Lea',
  de: 'Vicki',
  it: 'Bianca',
  pt: 'Ines',
  ru: 'Tatyana',
  ar: 'Zeina',
  ko: 'Seoyeon',
  zh: 'Zhiyu',
  hi: 'Aditi'
};

export function getVoiceForLanguage(languageCode: string): string {
  return languageVoiceMap[languageCode];
}

export async function convertTextToSpeech(text: string, voice: string) {
  try {
    const result = await Predictions.convert({
      textToSpeech: {
        source: {
          text,
        },
        voiceId: voice // 声の種類を指定
      }
    });
    const audio = new Audio(result.speech.url);
    return audio;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

let audioStream: HTMLAudioElement;
if (typeof window !== 'undefined') {
  // 実行環境がクライアントサイドの場合のみAudioオブジェクトを初期化
  audioStream = new Audio();
}

export { audioStream };

// translateDocumentでの再生(文章を1つずつ取得)
export async function processAndSpeak(textSegments: string[], voice: string, onPlay: () => void, onEnd: () => void, plusOne: () => void ) {
  onPlay();
  if (audioStream !== undefined) {
    if (!audioStream.paused) {
      audioStream.pause();
    }
  }
  
  for (const segment of textSegments) {
    try {
      // Amazon Pollyへのリクエストを送信して音声データを取得
      audioStream = await convertTextToSpeech(segment, voice);
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

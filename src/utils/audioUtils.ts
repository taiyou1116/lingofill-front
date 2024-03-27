
import { LanguageVoiceMap, VoiceType } from "@/types/types";
import { getAudio } from "./request";

// 0: standard 
// 1: neural
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

/**言語からボイスを取得 @param languageCode 言語 @param voiceType 使用エンジン(default: standard) */
export function getVoiceForLanguage(languageCode: string, voiceType: VoiceType): string {
  if (voiceType === 'neural') {
    return languageVoiceMap[languageCode][1];
  } else {
    return languageVoiceMap[languageCode][0];
  }
}

let audioStream: HTMLAudioElement;
if (typeof window !== 'undefined') {
  audioStream = new Audio();
}

export { audioStream };

/**文章を取得して一文ずつ再生
 *  @param textSegments 文章 
 *  @param voice ボイス 
 *  @callback onPlay 再生前に発火するコールバック関数 
 *  @callback onEnd すべての再生後に発火するコールバック関数 
 *  @callback plusOne 終了時に発火するコールバック関数 
 *  @param engine 使用するエンジン
 *  @param voiceRate 再生速度
 * */
export async function processAndSpeak(
  textSegments: string[], voice: string, onPlay: () => void, onEnd: () => void, plusOne: () => void,
  engine: string, voiceRate: string,
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
      audioStream = await getAudio(segment, voice, engine, voiceRate + '%'); //初期値 standard 100%
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
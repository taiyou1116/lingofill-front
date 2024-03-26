import { Document, LanguageVoiceMap, VoiceType } from "@/types/types";
import { Predictions } from "@aws-amplify/predictions";
import { getAudio } from "./request";

/**タイムスタンプから日付に変更 @param timestamp タイムスタンプ */
export function createDate(timestamp: string) {
  const date = new Date(Number(timestamp));
  return date.toLocaleString();
}

/**テキストをtranslateLnに翻訳 @param text テキスト @param ln 言語 @param translateLn 翻訳言語 */
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

/**スペースのある言語でtrueを返す @param ln 言語 */
export function judgeSpaceLanguage(ln: string | undefined) {
  if (ln === 'ja' || ln === 'zh') {
    return false;
  } else {
    return true;
  }
}

/**string[]を一つのテキストにして返す @param ln 言語 @param nums インデックス配列 @params 全体の単語 */
export function returnTextFromLn(ln: string | undefined, nums: number[], words: string[]) {
  if (ln === 'ja' || ln === 'zh') {
    return nums.map((i) => words[i]).join('');
  } else {
    return nums.map((i) => words[i]).join(' ');
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

/**言語によってスプリットを変える @param ln 言語 */
function filterLanguage(ln: string) {
  if (judgeSpaceLanguage(ln)) {
    return /[^.!?]*[.!?]*/g;
  } else {
    return /[^。!?]*[。!?]*/g;
  }
}

/**スペースのある言語か判別する @param text テキスト @param ln 言語 */
export function splitTextToSegment(text: string, ln: string): string[] {
  return text.split('\n').reduce((acc, line, index, array) => {

    // 文の終わり（. ? !）で分割し、空ではない結果だけをフィルターする
    const sentences = line.match(filterLanguage(ln))?.map(sentence => sentence.trim()).filter(sentence => sentence.length) || [];

    // 文ごとに結果に追加
    acc.push(...sentences);

    // 最後の行以外には改行を追加
    if (index < array.length - 1) {
      acc.push('\n');
    }

    return acc;
  }, [] as string[]);
}

/**選択したTranslationを削除 @param document 現在のドキュメント @param selectedWordsIndexes 選択した単語のインデックス */
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

import { Document, TranslationObj } from "@/types/types";
import toast from "react-hot-toast";
import { Predictions } from "@aws-amplify/predictions";

export async function updateText
  (partition: string, sort: string, title: string, text: string, translations: TranslationObj[],language:string, translateLanguage: string, updatedAt: string) {
  try {
    const response = await fetch(`/api`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        partition: partition,
        sort: sort,
        title: title,
        text: text,
        isDelete: false,
        translations: translations,
        language: language,
        translateLanguage: translateLanguage,
        updatedAt: updatedAt,
      }),
    });

    if (!response.ok) {
      throw new Error("Response is not OK");
    }

    // const data = await response.json();
    toast.success("テキストを保存しました。");
  } catch (error) {
    console.error(error);
    toast.error("テキストの保存に失敗しました。インターネット環境を確かめて再度保存してください。");
    throw error;
  }
}

// sortKey, title取得
export async function getTitles(partition: string) {
  const baseUrl = 'http://localhost:3000/api/title';
  const url = new URL(baseUrl);
  url.searchParams.append('partition', partition);
  
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  const newDocuments: Document[] = data.map((d: any) => {
    return {
      sortKey: d.sortKey.S,
      title: d.title.S, 
      text: '',  
      isSynced: true,
      translations: [],
      language: '',
      translateLanguage: '',
      updatedAt: d.updatedAt.S,
    }
  });
  // sortKeyの大きい順に配列をソート
  const sortedDocuments = newDocuments.sort((a, b) => {
    return b.updatedAt.localeCompare(a.updatedAt);
  });

  return sortedDocuments;
}

export async function getText(partition: string, sortKey: string) {
  try {
    const baseUrl = 'http://localhost:3000/api/text';
    const url = new URL(baseUrl);
    url.searchParams.append('partition', partition);
    url.searchParams.append('sortKey', sortKey);
    
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    // 単一のドキュメントに対する変換処理
    const document: Document = {
      sortKey: data.sortKey.S,
      title: data.title.S,
      text: data.text.S,
      isSynced: true,
      isNew: false,
      isDelete: false,
      translations: data.translations && Array.isArray(data.translations.L) 
        ? data.translations.L.map((t: any) => ({
            indexes: t.M.indexes && Array.isArray(t.M.indexes.L)
              ? t.M.indexes.L.map((index: any) => parseInt(index.N, 10))
              : [],
            translatedText: t.M.translatedText ? t.M.translatedText.S : "",
            memo: t.M.memo ? t.M.memo.S : "",
          }))
        : [],
      language: data.language.S,
      translateLanguage: data.translateLanguage.S,
      updatedAt: data.updatedAt.S,
    };
    console.log(document);
    return document;

  } catch(error) {
    toast.error("テキストの取得に失敗しました。インターネット環境を確かめて再度テキストを開いてください。");
    throw error;
  }
}

export async function deleteText(partition: string, sort: string) {
  try {
    const response = await fetch(`/api/text`, {
      method: "DELETE", // HTTPメソッドをDELETEに変更
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        partition: partition,
        sort: sort,
      }),
    });

    if (!response.ok) {
      throw new Error("Response is not OK");
    }

    // 成功時の処理（応答データの使用がない場合、コメントアウトされた部分は不要）
    toast.success("テキストを削除しました。");
  } catch (error) {
    console.error(error);
    toast.error("テキストの削除に失敗しました。インターネット環境を確かめて再度試してください。");
    throw error; // エラーを再投げする場合、呼び出し元でキャッチする必要がある
  }
}

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

type LanguageVoiceMap = {
  [languageCode: string]: string;
}

// 言語と音声
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

export function splitTextToSegments(text: string) {
  // return text.split(/(?<=[\.|\?|!])/);
  return text.split(/(?<=[.?!])\s+/);
}
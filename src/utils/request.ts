import { Document, TranslationObj } from "@/types/types";
import toast from "react-hot-toast";

export async function updateText(partition: string, sort: string, title: string, text: string, translations: TranslationObj[]) {
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
        translations: translations,
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
    }
  });
  // sortKeyの大きい順に配列をソート
  const sortedDocuments = newDocuments.sort((a, b) => {
    return b.sortKey.localeCompare(a.sortKey);
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
      translations: data.translations && Array.isArray(data.translations.L) 
        ? data.translations.L.map((t: any) => ({
            indexes: t.M.indexes && Array.isArray(t.M.indexes.L)
              ? t.M.indexes.L.map((index: any) => parseInt(index.N, 10))
              : [],
            translatedText: t.M.translatedText ? t.M.translatedText.S : "",
            memo: t.M.memo ? t.M.memo.S : "",
          }))
        : [],
    };

    return document;

  } catch(error) {
    toast.error("テキストの取得に失敗しました。インターネット環境を確かめて再度テキストを開いてください。");
    throw error;
  }
}

export function createDate(timestamp: string) {
  const date = new Date(Number(timestamp));
  return date.toLocaleString();
}

// import { Predictions } from "@aws-amplify/predictions";

// export async function translateText(text: string) {
//     try {
//         const result = await Predictions.convert({
//             translateText: {
//                 source: {
//                     text: text,
//                     language: "en" // ソース言語
//                 },
//                 targetLanguage: "ja" // ターゲット言語
//             }
//         });

//         console.log(result.text); // 翻訳結果を表示
//         return result.text;
//     } catch (err) {
//         console.error(err);
//         return err;
//     }
// }
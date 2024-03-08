import { Document, TranslationObj } from "@/types/types";
import toast from "react-hot-toast";

export async function updateText(
  partition: string, sort: string, title: string, text: string, translations: TranslationObj[],language:string, translateLanguage: string, updatedAt: string
) {
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
  const baseUrl = '/api/title';
  const currentUrl = window.location.origin;
  const url = new URL(baseUrl, currentUrl);

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
    const baseUrl = '/api/text';
    const currentUrl = window.location.origin;
    const url = new URL(baseUrl, currentUrl);
    
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
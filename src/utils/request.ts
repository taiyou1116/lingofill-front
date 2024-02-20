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

    const data = await response.json();
    toast.success("テキストを保存しました。");
  } catch (error) {
    console.error(error);
    toast.error("テキストの保存に失敗しました。");
  }
}


export async function getTexts(partition: string) {
  const baseUrl = 'http://localhost:3000/api';
  const url = new URL(baseUrl);
  url.searchParams.append('partition', partition);
  
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  const newDocuments: Document[] = data.map((d: any) => {
    // translationsが存在し、期待される構造を持っているか確認
    const translations = d.translations && Array.isArray(d.translations.L) 
      ? d.translations.L.map((t: any) => ({
          indexes: t.M.indexes && Array.isArray(t.M.indexes.L)
            ? t.M.indexes.L.map((index: any) => parseInt(index.N, 10))
            : [],
          translatedText: t.M.translatedText ? t.M.translatedText.S : "",
        }))
      : [];

    return {
      sortKey: d.sortKey.S,
      title: d.title.S, 
      text: d.text.S,
      isSynced: true,
      translations: translations,
    };
  });
  return newDocuments;
}
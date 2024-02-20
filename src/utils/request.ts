import { TranslationObj } from "@/types/types";
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
  return data;
}
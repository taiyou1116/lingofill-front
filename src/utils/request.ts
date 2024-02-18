import toast from "react-hot-toast";

// export async function postText(username: string, title: string, text: string) {
//   try {
//     const response = await fetch("/api", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         partition: username,
//         sort: Date.now().toString(),
//         title: title,
//         text: text,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Response is not OK");
//     }

//     const data = await response.json();
//     toast.success('テキストを保存しました。');
//     return data.sort;
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function updateText(partition: string, sort: string, title: string, text: string) {
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
      }),
    });

    if (!response.ok) {
      throw new Error("Response is not OK");
    }

    const data = await response.json();
    toast.success("テキストが更新されました。");
  } catch (error) {
    console.error(error);
    toast.error("テキストの更新に失敗しました。");
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
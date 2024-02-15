
export async function postText(username: string, title: string, text: string) {
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        partition: username,
        sort: Date.now().toString(),
        title: title,
        text: text,
      }),
    });

    if (!response.ok) {
      throw new Error("Response is not OK");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
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
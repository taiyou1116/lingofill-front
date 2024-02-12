export async function GET() {
  const res = await fetch('/api', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json();
  console.log(data);
}

export async function POST() {
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pertition: 0,
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
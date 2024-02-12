import React from 'react';

function SendTestDataButton() {
  async function POST() {
    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ time: new Date().toISOString() }),
    })
   
    const data = await res.json();
    console.log(data);
   
    // return Response.json(data)
  }

  return <button onClick={POST}>テストデータを送る</button>;
}

export default SendTestDataButton;



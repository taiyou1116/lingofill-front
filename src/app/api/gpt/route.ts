import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_LINGO_FILL });

export async function GET(req: NextRequest) {

  const searchParams = req.nextUrl.searchParams;
  const text = searchParams.get('text');
  const ln = searchParams.get('ln');

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ 
        role: "system", 
        content: `
          あなたは優秀な言語学習メンターです。
          単語: ${ text }
          返す言語(あなたは${ln}が第一言語である人向けに解説します): ${ ln }

          意味の説明: 選択された単語や熟語の基本的な意味を提供し、可能であれば類義語や反義語も併せて示します。
          用例: 選択された単語や熟語が使われている様々な例文を提供します。これにより、学習者は様々な文脈での使い方を理解できます。
          文法情報: 選択されたテキストが含まれる文法的構造（例: 時制、名詞の数、動詞の活用など）に関する説明を提供します。
        ` }],
      model: "gpt-3.5-turbo",
      // gpt-4-turbo-preview
    });
    console.log(ln);
    const responseBody = JSON.stringify({
      response: completion.choices[0].message.content,
    })
  
    return new Response(responseBody, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
  } catch (err){
    console.error(err);
    return new Response(JSON.stringify({ err: "GPTAPIエラー" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
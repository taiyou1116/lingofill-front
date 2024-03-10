
import { Polly } from "@aws-sdk/client-polly";
import { NextRequest } from "next/server";
import { Readable } from "stream";

const pollyClient = new Polly({
  region: process.env.REGION as string,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY as string, 
    secretAccessKey: process.env.SECRET_KEY as string, 
  }
});

// ストリームをバッファに変換するユーティリティ関数
const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
};


export async function GET(req: NextRequest,) {
  const searchParams = req.nextUrl.searchParams;
  const text = searchParams.get('text')!;
  const voiceId = searchParams.get('voiceId')!; // sortKeyも取得
  const engine = searchParams.get('engine')!;
  const rate = searchParams.get('rate')!;

  try {
    const params = {
      Text: `<speak><prosody rate="${rate}">${text}</prosody></speak>`,
      OutputFormat: "mp3",
      VoiceId: voiceId,
      Engine: engine,
      TextType: "ssml",
    };

    const { AudioStream } = await pollyClient.synthesizeSpeech(params);
    if (AudioStream) {
      const buffer = await streamToBuffer(AudioStream as Readable);

      return new Response(buffer, {
        status: 200,
        headers: {
          "Content-Type": "audio/mpeg",
        },
      });
    } else {
      throw new Error("AudioStream is undefined");
    }
  } catch (error) {
    console.error("テキストから音声への変換に失敗しました", error);
    throw error;
  }
}
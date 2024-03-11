import { Formality, Translate, TranslateTextCommand } from "@aws-sdk/client-translate";
import { NextRequest } from "next/server";


const translateClient = new Translate({
    region: process.env.REGION as string,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY as string, 
        secretAccessKey: process.env.SECRET_KEY as string, 
    }
});

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const text = searchParams.get('text')!;
    const sourceLanguageCode = searchParams.get('sourceLanguageCode')!;
    const targetLanguageCode = searchParams.get('targetLanguageCode')!;
    const formality = searchParams.get('formality');

    const command = new TranslateTextCommand({
        Text: text,
        SourceLanguageCode: sourceLanguageCode,
        TargetLanguageCode: targetLanguageCode,
        Settings: {
          Formality: formality as Formality
        },
    });

    try {
        const response = await translateClient.send(command);
        return new Response(response.TranslatedText, {
            status: 200,
            headers: {
              "Content-Type": "audio/mpeg",
            },
        });
    } catch(err) {
        console.error("Error translating text:", err);
        throw err;
    }
}
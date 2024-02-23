import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { TranslationObj } from "@/types/types";

// DynamoDBクライアントの初期化
const client = new DynamoDBClient({ region: "ap-northeast-1" });

export async function PUT(req: NextRequest) {
  const data = await req.json();
  
  // DynamoDBに保存するアイテムの構成
  const item = {
    TableName: "lingo-fill-db",
    Item: {
      // DynamoDBの属性定義に従ってアイテムを構成
      "partitionKey": { S: data.partition },
      "sortKey": { S: data.sort },
      "title": { S: data.title },
      "text": { S: data.text },
      "translations": {
        L: data.translations.map((translation: TranslationObj) => ({
          M: {
            indexes: { L: translation.indexes.map(index => ({ N: index.toString() })) },
            translatedText: { S: translation.translatedText },
            memo: { S: translation.memo }
          }
        }))
      }
    }
  };

  try {
    // DynamoDBにアイテムを更新（または新規作成）
    await client.send(new PutItemCommand(item));
    return NextResponse.json({ message: "アイテムを更新しました" }, {
      status: 200,
    });
  } catch (error) {
    console.error("DynamoDBへのアイテム更新中にエラーが発生しました:", error);
    return NextResponse.json({ error: "サーバーエラー" }, {
      status: 500,
    });
  }
}
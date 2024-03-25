import { NextRequest, NextResponse } from "next/server";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { TranslationObj } from "@/types/types";
import client from "@/utils/dynamoDBClient";

// 変更内容ををサーバーへ
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
      "isDelete": { BOOL: false },
      "translations": {
        L: data.translations.map((translation: TranslationObj) => ({
          M: {
            indexes: { L: translation.indexes.map(index => ({ N: index.toString() })) },
            memo: { S: translation.memo }
          }
        }))
      },
      "language": { S: data.language },
      "translateLanguage": { S: data.translateLanguage },
      "updatedAt": { S: data.updatedAt },
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
import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

// DynamoDBクライアントの初期化
const client = new DynamoDBClient({ region: "ap-northeast-1" });

export async function POST(req: NextRequest) {
  const data = await req.json();

  // DynamoDBに保存するアイテムの構成
  const item = {
    TableName: "lingo-fill-db",
    Item: {
      // DynamoDBの属性定義に従ってアイテムを構成
      "partitionKey": { N: data.pertition.toString() },
      "sortKey": { N: data.pertition.toString() },
      "test": { S: "テストだよん" },
    }
  };

  try {
    // DynamoDBにアイテムを保存
    await client.send(new PutItemCommand(item));
    return NextResponse.json(({ message: "アイテムを保存しました" }), {
      status: 200,
    });
  } catch (error) {
    console.error("DynamoDBへのアイテム保存中にエラーが発生しました:", error);
    return NextResponse.json(({ error: "サーバーエラー" }), {
      status: 500,
    });
  }
}

// ユーザーリストを取得するAPI
export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      name: "山田 太郎",
    },
    {
      id: 2,
      name: "佐藤 次郎",
    },
  ]);
}
export const dynamic = 'force-static'
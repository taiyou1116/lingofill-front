import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";

// DynamoDBクライアントの初期化
const client = new DynamoDBClient({ region: "ap-northeast-1" });

export async function POST(req: NextRequest) {
  const data = await req.json();

  // DynamoDBに保存するアイテムの構成
  const item = {
    TableName: "lingo-fill-db",
    Item: {
      // DynamoDBの属性定義に従ってアイテムを構成
      "partitionKey": { S: data.partition },
      "sortKey": { S: data.sort },
      "test": { S: "テストだよん2" },
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



// ユーザーテキストを取得するAPI
export async function GET(req: NextRequest) {
  // クエリパラメータからpartitionKeyを取得
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('partition');
  console.log(req.nextUrl);
  console.log(query);
  if (!query) {
    return new Response(JSON.stringify({ error: "partitionKeyが必要です" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const params = {
    TableName: "lingo-fill-db",
    KeyConditionExpression: "#pk = :pk",
    ExpressionAttributeNames: {
      "#pk": "partitionKey",
    },
    ExpressionAttributeValues: {
      ":pk": { S: query },
    },
  };

  try {
    const { Items } = await client.send(new QueryCommand(params));
    return new Response(JSON.stringify(Items), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("DynamoDBからのアイテム取得中にエラーが発生しました:", error);
    return new Response(JSON.stringify({ error: "サーバーエラー" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// export const dynamic = 'force-static'
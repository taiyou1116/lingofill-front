import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient, GetItemCommand, UpdateItemCommand, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";

// DynamoDBクライアントの初期化
const client = new DynamoDBClient({ region: "ap-northeast-1" });

// ユーザーテキストを取得するAPI
export async function GET(req: NextRequest) {
  // クエリパラメータからpartitionKeyとsortKeyを取得
  const searchParams = req.nextUrl.searchParams;
  const partitionKey = searchParams.get('partition');
  const sortKey = searchParams.get('sortKey'); // sortKeyも取得

  if (!partitionKey || !sortKey) { // partitionKeyとsortKeyの両方が必要
    return new Response(JSON.stringify({ error: "partitionKeyとsortKeyが必要です" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const params = {
    TableName: "lingo-fill-db",
    Key: { // GetItemCommandにはKeyを指定
      "partitionKey": { S: partitionKey },
      "sortKey": { S: sortKey },
    },
  };

  try {
    const { Item } = await client.send(new GetItemCommand(params)); // GetItemCommandを使用
    return new Response(JSON.stringify(Item), { // 単一のアイテムを返す
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

// documentの削除
export async function DELETE(req: NextRequest) {
  const data = await req.json();

  // DynamoDBのUpdateItemコマンドパラメータ
  const params: UpdateItemCommandInput = {
    TableName: "lingo-fill-db",
    Key: {
      "partitionKey": { S: data.partition },
      "sortKey": { S: data.sort }
    },
    UpdateExpression: "set isDelete = :val",
    ExpressionAttributeValues: {
      ":val": { BOOL: true }
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    // DynamoDBのアイテムを論理削除
    await client.send(new UpdateItemCommand(params));
    return NextResponse.json({ message: "アイテムを論理削除しました" }, {
      status: 200,
    });
  } catch (error) {
    console.error("DynamoDBへのアイテム論理削除中にエラーが発生しました:", error);
    return NextResponse.json({ error: "サーバーエラー" }, {
      status: 500,
    });
  }
}
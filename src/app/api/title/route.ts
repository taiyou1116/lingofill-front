import { NextRequest } from "next/server";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "ap-northeast-1" });

// タイトル取得
export async function GET(req: NextRequest) {
  // クエリパラメータからpartitionKeyを取得
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('partition');
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
    ExpressionAttributeValues: {
      ":pk": { S: query },
      ":isDeleteFalse": { BOOL: false },
    },
    FilterExpression: "#isDelete = :isDeleteFalse",
    // titleとsortKeyのみを取得するようにProjectionExpressionを指定
    ProjectionExpression: "#title, #sortKey",
    // ProjectionExpressionで使用する属性名のエイリアスを定義
    ExpressionAttributeNames: {
      "#pk": "partitionKey",
      "#title": "title",
      "#sortKey": "sortKey",
      "#isDelete": "isDelete",
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
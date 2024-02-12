import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  return NextResponse.json({ data })
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
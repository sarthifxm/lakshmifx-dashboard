import { NextResponse } from "next/server";

let settings = {
  telegram: false,
  whatsapp: false,
};

export async function POST(req: Request) {
  const body = await req.json();
  settings = body;

  return NextResponse.json({ success: true, settings });
}

export async function GET() {
  return NextResponse.json({ success: true, settings });
}
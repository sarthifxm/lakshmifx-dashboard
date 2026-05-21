export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { myfxbookLogin } from "@/lib/myfxbook";

export async function POST() {
  try {
    const session = await myfxbookLogin();

    console.log("SESSION:", session);

    return NextResponse.json({
      success: true,
      session,
    });
  } catch (error: any) {
    console.error("CONNECT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
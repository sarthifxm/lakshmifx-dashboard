import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json({
      success: true,
      message: "Subscription API working",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
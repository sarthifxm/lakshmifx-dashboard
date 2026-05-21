import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { myfxbookLogout } from "@/lib/myfxbook";

export async function POST() {
  const cookieStore = await cookies();
  const cookieName = process.env.MYFXBOOK_COOKIE_NAME || "myfxbook_session";
  const session = cookieStore.get(cookieName)?.value;

  try {
    if (session) {
      await myfxbookLogout(session);
    }

    cookieStore.set(cookieName, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return NextResponse.json({
      success: true,
      message: "Disconnected from Myfxbook successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unable to log out from Myfxbook.",
      },
      { status: 500 }
    );
  }
}

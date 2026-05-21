import { NextResponse } from "next/server";

import {
  myfxbookLogin,
  myfxbookLogout,
  myfxbookGetAccounts,
} from "@/lib/myfxbook";

export async function POST() {
  try {
    const session = await myfxbookLogin();

    const accounts = await myfxbookGetAccounts(session);

    await myfxbookLogout(session);

    return NextResponse.json({
      success: true,
      accounts,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
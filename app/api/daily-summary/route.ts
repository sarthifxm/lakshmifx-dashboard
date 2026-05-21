import { NextResponse } from "next/server";

import {
  myfxbookLogin,
  myfxbookLogout,
  myfxbookGetAccounts,
  getDailyGain,
} from "@/lib/myfxbook";

export async function GET() {
  try {
    const session = await myfxbookLogin();

    const accounts = await myfxbookGetAccounts(session);

    const totalGain = getDailyGain(accounts);

    await myfxbookLogout(session);

    return NextResponse.json({
      success: true,
      totalAccounts: accounts.length,
      totalGain,
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
import { NextResponse } from "next/server";
import {
  myfxbookLogin,
  myfxbookGetAccounts,
  myfxbookGetOpenTrades,
} from "@/lib/myfxbook";

export async function GET() {
  try {
    const session = await myfxbookLogin();

    const accounts = await myfxbookGetAccounts(session);

    if (!accounts.length) {
      return NextResponse.json({
        trades: [],
      });
    }

    const accountId = accounts[0].id;

    const trades = await myfxbookGetOpenTrades(
      session,
      accountId
    );

    return NextResponse.json({
      success: true,
      trades,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        trades: [],
        error: error.message,
      },
      { status: 500 }
    );
  }
}
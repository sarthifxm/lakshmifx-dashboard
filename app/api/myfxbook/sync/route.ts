import { NextResponse } from "next/server";

import {
  myfxbookLogin,
  myfxbookGetAccounts,
  myfxbookLogout,
} from "@/lib/myfxbook";

export async function GET() {
  try {
    // Login
    const session = await myfxbookLogin();

    // Fetch accounts
    const accounts = await myfxbookGetAccounts(session);

    // Logout
    await myfxbookLogout(session);

    return NextResponse.json({
      success: true,
      accounts,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
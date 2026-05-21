import { NextResponse } from "next/server";

import {
  myfxbookLogin,
  myfxbookGetAccounts,
} from "@/lib/myfxbook";

export async function GET() {
  try {
    const session = await myfxbookLogin();

    const accounts =
      await myfxbookGetAccounts(session);

    console.log("========== MYFXBOOK RESPONSE ==========");
    console.log(JSON.stringify(accounts, null, 2));
    console.log("=======================================");

    return NextResponse.json(accounts);
  } catch (error: any) {
    console.error("MYFXBOOK ERROR:", error);

    return NextResponse.json(
      {
        error: true,
        message:
          error.message ||
          "Failed to load Myfxbook accounts",
      },
      {
        status: 500,
      }
    );
  }
}
import { NextResponse } from "next/server";

const EMAIL = process.env.MYFXBOOK_EMAIL!;
const PASSWORD = process.env.MYFXBOOK_PASSWORD!;

async function getSession() {
  const url = `https://www.myfxbook.com/api/login.json?email=${EMAIL}&password=${PASSWORD}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  const data = await response.json();

  return data.session;
}

async function getAccounts(session: string) {
  const response = await fetch(
    `https://www.myfxbook.com/api/get-my-accounts.json?session=${session}`,
    {
      cache: "no-store",
    }
  );

  return response.json();
}

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({
        success: false,
        error: "No session returned from Myfxbook",
      });
    }

    const accountData = await getAccounts(session);

    return NextResponse.json({
      success: true,
      data: accountData,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
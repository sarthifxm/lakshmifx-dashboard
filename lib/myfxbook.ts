const MYFXBOOK_API_BASE =
  process.env.MYFXBOOK_API_BASE || "https://www.myfxbook.com/api";

const MYFXBOOK_DEBUG = process.env.MYFXBOOK_DEBUG === "1";

export type MyfxbookBaseResponse = {
  error: boolean;
  message?: string;
};

export type MyfxbookSessionResponse = MyfxbookBaseResponse & {
  session?: string;
};

export type MyfxbookAccount = {
  id: number;
  name?: string;
  description?: string;
  accountId?: number;
  gain?: number;
  balance?: number;
  equity?: number;
  drawdown?: number;
  currency?: string;
  broker?: string;
  server?: string;
  leverage?: string;
  lastUpdateDate?: string;
};

export type MyfxbookAccountsResponse = MyfxbookBaseResponse & {
  accounts?: MyfxbookAccount[];
};

export type MyfxbookTrade = {
  ticket?: number;
  openTime?: string;
  action?: string;
  symbol?: string;
  openPrice?: number;
  currentPrice?: number;
  sl?: number;
  tp?: number;
  profit?: number;
  lots?: number;
  accountId?: number;
};

export type MyfxbookOpenTradesResponse = MyfxbookBaseResponse & {
  trades?: MyfxbookTrade[];
};

type QueryParams = Record<
  string,
  string | number | boolean | undefined | null
>;

function buildUrl(path: string, params?: QueryParams): string {
  const base = MYFXBOOK_API_BASE.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const url = new URL(`${base}${cleanPath}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  if (MYFXBOOK_DEBUG) {
    url.searchParams.append("debug", "1");
  }

  return url.toString();
}

async function fetchMyfxbook<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
      },
    });

    const rawText = await response.text();

    console.log("========== MYFXBOOK RESPONSE ==========");
    console.log(rawText);
    console.log("=======================================");

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status} - ${response.statusText}`
      );
    }

    // Myfxbook sometimes returns HTML instead of JSON
    if (
      rawText.startsWith("<!DOCTYPE html>") ||
      rawText.startsWith("<html")
    ) {
      throw new Error(
        "Myfxbook returned HTML instead of JSON. API may be blocked by Cloudflare."
      );
    }

    try {
      return JSON.parse(rawText) as T;
    } catch {
      throw new Error(
        `Failed to parse JSON response: ${rawText}`
      );
    }
  } catch (error: any) {
    throw new Error(
      error?.message || "Unknown Myfxbook request error"
    );
  }
}

export function handleMyfxbookResponse<
  T extends MyfxbookBaseResponse
>(data: T, fallbackMessage: string): T {
  if (!data || typeof data !== "object") {
    throw new Error(
      "Myfxbook returned empty or invalid response."
    );
  }

  if (data.error) {
    const message =
      data.message?.trim() || fallbackMessage;

    if (/invalid session/i.test(message)) {
      throw new Error(
        "Myfxbook session is invalid. Please login again."
      );
    }

    if (/session required/i.test(message)) {
      throw new Error(
        "Myfxbook session missing."
      );
    }

    if (/required fields missing/i.test(message)) {
      throw new Error(
        "Required Myfxbook fields missing."
      );
    }

    if (/login/i.test(message)) {
      throw new Error(
        `Myfxbook login failed: ${message}`
      );
    }

    throw new Error(message);
  }

  return data;
}

export async function myfxbookLogin(): Promise<string> {
  const email = process.env.MYFXBOOK_EMAIL?.trim();
  const password = process.env.MYFXBOOK_PASSWORD?.trim();

  console.log("EMAIL:", email);
  console.log("PASSWORD:", password);

  if (!email || !password) {
    throw new Error(
      "Missing MYFXBOOK_EMAIL or MYFXBOOK_PASSWORD in .env"
    );
  }

  const url = buildUrl("/login.json", {
    email,
    password,
  });

  console.log("LOGIN URL:", url);

  const data =
    await fetchMyfxbook<MyfxbookSessionResponse>(
      url
    );

  console.log("LOGIN RESPONSE:", data);

  handleMyfxbookResponse(
    data,
    "Myfxbook login failed."
  );

  if (!data.session) {
    throw new Error(
      "No session returned from Myfxbook."
    );
  }

  return decodeURIComponent(data.session);
}
export async function myfxbookGetAccounts(
  session: string
): Promise<MyfxbookAccount[]> {
  if (!session) {
    throw new Error(
      "Missing Myfxbook session."
    );
  }

  const url = buildUrl(
    "/get-my-accounts.json",
    {
      session,
    }
  );

  const data =
    await fetchMyfxbook<MyfxbookAccountsResponse>(
      url
    );

  handleMyfxbookResponse(
    data,
    "Failed to fetch Myfxbook accounts."
  );

  return data.accounts || [];
}

export async function myfxbookGetOpenTrades(
  session: string,
  accountId: string | number
): Promise<MyfxbookTrade[]> {
  if (!session) {
    throw new Error(
      "Missing Myfxbook session."
    );
  }

  if (!accountId) {
    throw new Error(
      "Missing Myfxbook account ID."
    );
  }

  const url = buildUrl(
    "/get-open-trades.json",
    {
      session,
      id: accountId,
    }
  );

  const data =
    await fetchMyfxbook<MyfxbookOpenTradesResponse>(
      url
    );

  handleMyfxbookResponse(
    data,
    "Failed to fetch open trades."
  );

  return data.trades || [];
}

export async function myfxbookLogout(
  session: string
): Promise<boolean> {
  if (!session) return false;

  try {
    const url = buildUrl("/logout.json", {
      session,
    });

    const data = await fetchMyfxbook<MyfxbookBaseResponse>(url);

    handleMyfxbookResponse(data, "Logout failed.");

    return true;
  } catch (error) {
    console.error("Logout Error:", error);
    return false;
  }
}

// ✅ PUT THIS OUTSIDE ANY FUNCTION (IMPORTANT)
export function getDailyGain(accounts: any[]) {
  if (!accounts || accounts.length === 0) return 0;

  return accounts.reduce((sum, acc) => {
    return sum + (acc.gain || 0);
  }, 0);
}

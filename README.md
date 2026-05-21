# Forex Investor Dashboard Starter

A ready-to-copy Next.js starter for an investor portal with client login, dashboard UI, Myfxbook integration stub, Telegram messaging helper, WhatsApp Cloud API helper, and Supabase schema.

## Quick start

1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local`.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

## Setup order

1. Create a Supabase project and paste keys into `.env.local`.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Create one test user in Supabase Auth.
4. Test `/login`.
5. Test `/dashboard`.
6. Add Myfxbook email and password to `.env.local`.
7. Call `/api/myfxbook/sync` to confirm account fetch.
8. Add Telegram bot token and chat ID.
9. Add WhatsApp Cloud API access token, phone number ID, and verify token.

## Important notes

- Myfxbook API uses session-based login. Keep credentials server-side only.
- WhatsApp outbound business messaging should use approved templates.
- Telegram is best for instant trade alerts and private channel updates.
- MT5 direct integration is not included in this starter because it depends on your broker or bridge provider.
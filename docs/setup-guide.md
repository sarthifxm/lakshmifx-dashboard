# Setup Guide

## 1. Supabase
- Create a new project.
- Go to Project Settings -> API.
- Copy URL and anon key into `.env.local`.
- Use the SQL editor to run `supabase/schema.sql`.

## 2. Myfxbook
- Put your Myfxbook login email and password in `.env.local`.
- Test account sync from `GET /api/myfxbook/sync`.
- Replace sample dashboard cards with data from the returned account JSON.

## 3. Telegram
- Create a bot with BotFather.
- Copy bot token into `.env.local`.
- Add bot to your group or channel.
- Find your chat ID and store it.
- Use `sendTelegramMessage()` whenever a trade opens or closes.

## 4. WhatsApp
- Create a Meta developer app.
- Enable WhatsApp Cloud API.
- Add test recipients first.
- Set webhook URL to `/api/whatsapp/webhook`.
- Verify using `WHATSAPP_VERIFY_TOKEN`.

## 5. Deploy without VPS
- Frontend and API: Vercel.
- Database and auth: Supabase.
- Cron jobs: Vercel cron, GitHub Actions, or external scheduler.
- Optional worker: Railway or Render if you need long-running polling.
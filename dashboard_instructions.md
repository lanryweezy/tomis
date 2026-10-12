# External Dashboard Configuration Steps

## Supabase
1. **Migrations:** Apply the generated RLS migrations in the Supabase dashboard (`supabase/migrations/20240101000000_enable_rls.sql`).
2. **Auth Providers:** Enable Email, Google OAuth, and Facebook OAuth in Supabase > Authentication > Providers. Set the redirect URL to `${YOUR_DOMAIN}/auth/callback`.
3. **SMTP:** Ensure SMTP is configured correctly if you want to use Resend for Supabase's auth emails (Supabase > Project Settings > Auth > SMTP).

## Google Cloud (OAuth)
1. Configure OAuth credentials and ensure the authorized redirect URI matches your Supabase Auth provider callback URL.

## Facebook Developers (OAuth)
1. Set up the Facebook app and ensure the OAuth redirect URI points to the Supabase callback endpoint.

## Flutterwave
1. Configure Test Webhook URL in your Flutterwave dashboard to point to `${YOUR_DOMAIN}/api/webhooks/flutterwave`.
2. Add the `FLW_SECRET_HASH` to both the Flutterwave dashboard and your application `.env` variables to verify webhooks.

## Resend
1. Verify your sender domain (`EMAIL_FROM`) in the Resend dashboard and configure the required DNS records.

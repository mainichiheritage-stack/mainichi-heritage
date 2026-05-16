# Cloudflare Deployment Guide

This project currently runs as a Next.js app. To migrate the frontend from Vercel to Cloudflare, the following preparation has been added.

## What was added

- `frontend/wrangler.toml` — Cloudflare Worker deployment configuration.
- `frontend/CLOUDFLARE.md` — Cloudflare migration checklist and environment notes.
- `frontend/package.json` scripts:
  - `npm run build:cloudflare`
  - `npm run deploy:cloudflare`
- `frontend/.env.example` now includes Cloudflare environment placeholders.
- `.gitignore` now ignores OpenNext build artifacts such as `.open-next`.

## Compatibility note

This frontend currently uses Next.js `15.5.2`. The project now uses OpenNext (the recommended Cloudflare adapter) instead of the deprecated `@cloudflare/next-on-pages` package.

## How to deploy on Cloudflare Workers

1. Create a new Cloudflare Workers project or use an existing Worker in the Cloudflare dashboard.
2. Ensure `frontend/wrangler.toml` is configured for your account and route details.
3. Build for Cloudflare:
   - `npm run build:cloudflare`
4. Deploy with Wrangler:
   - `npm run deploy:cloudflare`

### Alternative: Manual deployment with Wrangler

If you prefer manual deployment:

1. Install Wrangler CLI globally: `npm install -g wrangler`
2. Login: `wrangler auth login`
3. Configure `wrangler.toml` with your account details
4. Deploy: `npm run deploy:cloudflare`

> Note: This project uses OpenNext output in `.open-next` and deploys as a Cloudflare Worker. The Worker entrypoint is defined in `frontend/wrangler.toml`.

## Environment variables for Cloudflare

Add these in Cloudflare Workers settings or `.env.local` for local development:

- `NEXT_PUBLIC_API_BASE_URL` — backend API base URL, e.g. `https://api.example.com/api`
- `NEXT_PUBLIC_IMAGE_BASE_URL` — if you move image hosting to Cloudflare Images or R2
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_ZONE_ID`
- `CLOUDFLARE_PROJECT_NAME`

## Notes for this repository

- The frontend currently uses `next-axiom` and a Vercel-style blob host in `next.config.ts`.
- If image assets are migrated from Vercel blob storage to Cloudflare R2 / Cloudflare Images, update the remote image host in `frontend/next.config.ts` accordingly.
- `NEXT_PUBLIC_API_BASE_URL` must point to the backend API after migration.

## What to verify after migration

- `frontend/build:cloudflare` completes successfully.
- `.open-next` is generated locally and is not committed to source control.
- All API requests use `NEXT_PUBLIC_API_BASE_URL` and are reachable from Cloudflare.
- Any Vercel-specific storage endpoints are replaced or removed.

## GitHub Actions で自動デプロイ

このリポジトリには `main` への push で自動的にビルド・デプロイされる GitHub Actions ワークフローを追加しています。

必要な GitHub Secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ZONE_ID` (カスタムドメインで route を使う場合)

ワークフローのファイル:

- `.github/workflows/deploy-cloudflare-workers.yml`

このまま `main` に push すれば、GitHub Actions が `frontend` を `npm ci` でインストールし、`npm run deploy:cloudflare` で Cloudflare Workers にデプロイします。

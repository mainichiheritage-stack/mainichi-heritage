This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Development with Docker

This project supports Docker-based development with Cloudflare build integration.

### Standard Development (with Cloudflare build watching)

```bash
# Start all services with Cloudflare build watching
docker-compose up -d

# Or start only frontend with Cloudflare integration
docker-compose up -d frontend
```

This will:

- Start Next.js dev server with hot reload
- Automatically build for Cloudflare on file changes
- Mount your local files for instant updates

### Development without Cloudflare watching

```bash
# Start without Cloudflare build watching
CLOUDFLARE_DEV_MODE=false docker-compose up -d frontend
```

### Manual Cloudflare Build

```bash
# Build for Cloudflare manually
docker-compose exec frontend npm run build:cloudflare

# Deploy to Cloudflare
docker-compose exec frontend npm run deploy:cloudflare
```

### Environment Variables

Create `.env.local` in the frontend directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_AXIOM_TOKEN=your-axiom-token
NEXT_PUBLIC_AXIOM_DATASET=your-dataset
```

## Deploy on Cloudflare

This project can be deployed to Cloudflare Workers using OpenNext.

> Note: This repository uses Next.js `15.5.2` and OpenNext for Cloudflare Workers deployment.

### Option 1: Cloudflare Workers (Recommended)

1. Create a new Cloudflare Workers project or use an existing Worker in the Cloudflare dashboard
2. Configure `frontend/wrangler.toml` with your account and route settings
3. Build for Cloudflare:
   - `npm run build:cloudflare`
4. Deploy:
   - `npm run deploy:cloudflare`

### Option 2: Manual deployment with Wrangler

1. Install Wrangler CLI globally: `npm install -g wrangler`
2. Login: `wrangler auth login`
3. Configure `frontend/wrangler.toml` with your Cloudflare account values.
4. Deploy with:
   ```bash
   npm run deploy:cloudflare
   ```

For Cloudflare-specific guidance, see `frontend/CLOUDFLARE.md`.

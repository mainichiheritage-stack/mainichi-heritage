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

This project can be deployed to Cloudflare Pages / Cloudflare Workers using OpenNext.

> Note: This repository uses Next.js `15.5.2` and OpenNext for Cloudflare deployment.

### Option 1: Cloudflare Pages (Recommended)

1. Create a new Cloudflare Pages project
2. Connect your GitHub repository
3. Set build settings:
   - **Build command**: `npm run build:cloudflare`
   - **Build output directory**: `.open-next`
4. Configure environment variables in Pages settings
5. Deploy!

### Option 2: Manual deployment with Wrangler

1. Install Wrangler CLI globally: `npm install -g wrangler`
2. Login: `wrangler auth login`
3. Configure `wrangler.toml` with your account details
4. Deploy: `npm run deploy:cloudflare`
   ```

   ```
5. Configure `frontend/wrangler.toml` with your Cloudflare account values.
6. Deploy with:
   ```bash
   npm run deploy:cloudflare
   ```

For Cloudflare-specific guidance, see `frontend/CLOUDFLARE.md`.

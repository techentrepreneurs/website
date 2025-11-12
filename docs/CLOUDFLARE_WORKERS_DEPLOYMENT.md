# Cloudflare Workers Deployment Guide

This project uses **OpenNext** to deploy Next.js to Cloudflare Workers.

## Cloudflare Dashboard Configuration

### For Cloudflare Workers (Recommended)

Go to your Cloudflare dashboard and configure:

**Build Configuration:**

- **Framework preset**: None
- **Build command**: `npm run deploy`
- **Build output directory**: Leave empty (handled by wrangler)
- **Root directory**: `/` (default)

**Environment Variables:**

- `NODE_VERSION`: `20.17.0`
- `MONGODB_URI`: Your MongoDB connection string
- Any other env vars from `.env.local`

### Important Notes

1. **The deploy command should be EMPTY** - The `npm run deploy` script handles both building and deploying via OpenNext and Wrangler.

2. **Build process**:

   - `npm run deploy` runs `opennextjs-cloudflare build && opennextjs-cloudflare deploy`
   - This builds Next.js, generates the OpenNext bundle, and deploys to Workers
   - Output is in `.open-next/` directory

3. **Required files**:
   - `wrangler.jsonc` - Cloudflare Workers configuration
   - `open-next.config.ts` - OpenNext adapter configuration
   - `public/_headers` - Static asset caching headers (optional but recommended)

## Alternative: Deploy via CLI

You can also deploy directly from your local machine:

```bash
# Build and deploy
npm run deploy

# Or just upload (if already built)
npm run upload
```

## Troubleshooting

### Error: "entry-point file at .open-next/worker.js was not found"

This means the OpenNext build didn't run. Make sure:

1. Build command is set to `npm run deploy` (not `npm run build`)
2. All dependencies are installed correctly
3. `@opennextjs/cloudflare` and `wrangler` are in package.json

## Local Development

```bash
# Regular Next.js dev server
npm run dev

# Test in Workers runtime locally
npm run preview
```

## Configuration Files

### wrangler.jsonc

Defines the Workers configuration including:

- Entry point (`.open-next/worker.js`)
- Assets directory (`.open-next/assets`)
- Compatibility flags (`nodejs_compat`)
- Service bindings

### open-next.config.ts

Configures the OpenNext adapter:

- Cache strategy (default or R2)
- Custom overrides

### .dev.vars

Local environment variables for `wrangler dev`:

```
NEXTJS_ENV=development
MONGODB_URI=your-connection-string
```

**Note**: This file is gitignored. Create it locally for development.

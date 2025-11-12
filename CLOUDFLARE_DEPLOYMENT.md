# Cloudflare Pages Deployment Guide

## Overview

This project is configured to deploy to Cloudflare Pages with full server-side rendering (SSR) support using Next.js App Router.

## Configuration

### 1. Wrangler Configuration

The `wrangler.toml` file has been updated for SSR:

```toml
name = "website"
compatibility_date = "2025-01-01"
pages_build_output_dir = ".vercel/output/static"
```

This tells Cloudflare to use the output from `@cloudflare/next-on-pages` adapter.

### 2. Build Scripts

New npm scripts have been added to `package.json`:

- **`npm run pages:build`** - Builds the Next.js app for Cloudflare Pages
- **`npm run preview`** - Builds and previews locally with Wrangler
- **`npm run deploy`** - Builds and deploys to Cloudflare Pages

### 3. Dependencies

- `@cloudflare/next-on-pages` - Adapter for deploying Next.js to Cloudflare Pages

## Deployment Process

### Local Development

```bash
npm run dev
```

### Preview Locally

```bash
npm run preview
```

This will build for Cloudflare and start a local Wrangler dev server.

### Deploy to Cloudflare Pages

```bash
npm run deploy
```

Or configure CI/CD with the following build settings:

- **Build command**: `pnpm run cf:build` (or `pnpm run build && pnpm run pages:build`)
- **Build output directory**: `.vercel/output/static`
- **Node version**: `20.17.0` (specified in `.node-version`)
- **Package manager**: `pnpm`
- **Environment variables**: Make sure to set `MONGODB_URI` and any other required env vars

### Build Optimization

The project includes a `.npmrc` file with optimized settings for Cloudflare Pages:

- Faster network settings with retry logic
- Reduced network concurrency to prevent timeouts
- Auto-install peers enabled

## Important Notes

### OpenNext Migration (Future)

The `@cloudflare/next-on-pages` package is deprecated and recommends migrating to OpenNext:
https://opennext.js.org/cloudflare

Consider migrating to OpenNext in the future for better long-term support.

### Environment Variables

Make sure to set these environment variables in your Cloudflare Pages project:

- `MONGODB_URI` - Your MongoDB connection string
- Any other environment variables from `.env.example`

### Supported Features

✅ Server-side rendering (SSR)
✅ Incremental Static Regeneration (ISR) with `revalidate`
✅ Dynamic routes with `generateStaticParams`
✅ Server Components
✅ MongoDB/Mongoose connections
✅ API routes (if added)

### Unsupported Features

❌ Node.js-specific APIs (use Cloudflare Workers APIs instead)
❌ `next/image` optimization (images.unoptimized is already set to true)
❌ Middleware using Node.js APIs

## SSR Pages in This Project

The following pages use server-side rendering:

- `/directory` - Fetches companies from MongoDB with hourly revalidation
- `/company/[slug]` - Dynamic company pages with hourly revalidation

Both pages use `revalidate = 3600` for Incremental Static Regeneration (ISR).

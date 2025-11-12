# Cloudflare Pages Build Settings

## Required Configuration in Cloudflare Dashboard

To fix the build timeout issue, configure the following settings in your Cloudflare Pages project:

### Build Configuration

1. **Framework preset**: `Next.js`
2. **Build command**: `npm run cf:build`
3. **Build output directory**: `.vercel/output/static`
4. **Root directory**: `/` (leave empty or set to root)

### Environment Variables

#### Build Environment Variables

Set these in the Cloudflare Pages dashboard under Settings > Environment Variables:

**Production:**

- `NODE_VERSION`: `20.17.0`
- `MONGODB_URI`: `your-mongodb-connection-string`

**Preview (optional):**

- `NODE_VERSION`: `20.17.0`
- `MONGODB_URI`: `your-preview-mongodb-connection-string`

### Build Settings Explanation

#### Why these changes fix the timeout:

1. **`.npmrc` file**:

   - Configures npm with optimized network settings
   - Reduces network concurrency from default to 3 to prevent overwhelming Cloudflare's network
   - Adds retry logic with longer timeouts
   - Enables prefer-offline mode to use cache when possible

2. **`.node-version` file**:

   - Ensures Cloudflare uses Node.js 20.17.0 (LTS)
   - Prevents version mismatches that can cause build issues

3. **`cf:build` script**:
   - Combines `next build` and `@cloudflare/next-on-pages` in one command
   - Optimized for Cloudflare Pages deployment

### Troubleshooting

If the build still times out:

1. **Check build logs** for specific errors
2. **Verify environment variables** are set correctly
3. **Clear build cache** in Cloudflare Pages settings
4. **Try manual deployment** with `npm run deploy` from local machine

### Build Time Expectations

- **First build**: 3-5 minutes (no cache)
- **Subsequent builds**: 1-3 minutes (with cache)
- **Install step**: Should complete in under 2 minutes with optimized settings

If install takes longer than 3 minutes, there may be a network issue with Cloudflare's build environment.

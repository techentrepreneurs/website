# Database Setup Guide

This document explains how to use the MongoDB database integration in this Next.js project.

## Overview

The database setup includes:
- **Zod-based environment variable validation** with detailed error messages
- **MongoDB connection management** with connection pooling and caching
- **Mongoose schemas** for all database collections (Introductions, Company Updates, Channel Subscriptions, Company Channels)
- **TypeScript type safety** throughout

---

## Prerequisites

1. MongoDB Atlas account (or local MongoDB instance)
2. MongoDB connection string (URI)

---

## Setup Instructions

### 1. Install Dependencies

Dependencies are already installed in `package.json`:
- `zod` - Environment variable validation
- `mongoose` - MongoDB ODM

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your MongoDB connection string:

```env
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/verification_bot"
```

**Important**: The database name should be `verification_bot` to match the Discord bot database.

### 3. Environment Variable Validation

The project uses Zod for robust environment variable validation in `lib/env.ts`:

- ✅ Validates `MONGODB_URI` format (must be a valid MongoDB connection string)
- ✅ Provides detailed error messages if validation fails
- ✅ Type-safe access to environment variables

Example error message:
```
❌ Environment variable validation failed:

  ❌ MONGODB_URI: MONGODB_URI is required for database connection

📝 Please check your .env file and ensure all required variables are set correctly.
```

---

## Usage

### Basic Connection

The database connection is managed automatically. Simply import and use the models:

```typescript
import { connectDB } from '@/lib/db';
import { Introduction } from '@/lib/models';

// In API route or Server Component
await connectDB();
const introductions = await Introduction.find({ status: 'pending' });
```

### Available Models

All models are exported from `lib/models/index.ts`:

```typescript
import {
  Introduction,      // User verification submissions
  CompanyUpdate,     // Company channel messages
  ChannelSubscription, // User subscriptions
  CompanyChannel,    // Company channel metadata
} from '@/lib/models';
```

### API Route Example

```typescript
// app/api/introductions/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Introduction } from '@/lib/models';

export async function GET(request: Request) {
  try {
    await connectDB();

    const introductions = await Introduction.find({ status: 'pending' })
      .sort({ timestamp: -1 })
      .limit(20)
      .lean();

    return NextResponse.json({ success: true, data: introductions });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
```

### Server Component Example

```typescript
// app/introductions/page.tsx
import { connectDB } from '@/lib/db';
import { Introduction } from '@/lib/models';

export default async function IntroductionsPage() {
  await connectDB();

  const introductions = await Introduction.find({ status: 'pending' })
    .sort({ timestamp: -1 })
    .limit(20)
    .lean();

  return (
    <div>
      <h1>Pending Introductions</h1>
      {introductions.map((intro) => (
        <div key={intro._id.toString()}>
          <h2>{intro.display_name}</h2>
          <p>{intro.content}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## Database Schema

### Collections

1. **introductions** - User verification submissions and voting
2. **company_updates** - Messages from company channels
3. **channel_subscriptions** - User subscriptions to company channels
4. **company_channels** - Company channel metadata and ownership

For detailed schema information, see [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md).

---

## Code Organization

```
lib/
├── env.ts                    # Environment variable validation (Zod)
├── db.ts                     # MongoDB connection management
├── db-usage-example.ts       # Usage examples and patterns
└── models/
    ├── index.ts              # Exports all models and types
    ├── Introduction.ts       # Introduction schema
    ├── CompanyUpdate.ts      # Company Update schema
    ├── ChannelSubscription.ts # Channel Subscription schema
    └── CompanyChannel.ts     # Company Channel schema
```

---

## Key Features

### 1. Environment Variable Validation (Zod)

- **Type-safe**: TypeScript types inferred from Zod schema
- **Great error messages**: Clear, actionable error messages
- **Validation rules**: URL format, required fields, enum values

### 2. MongoDB Connection Management

- **Connection pooling**: Efficient connection reuse
- **Development caching**: Prevents multiple connections during hot reload
- **Error handling**: Detailed error messages and logging
- **Connection status**: Check connection state with `getConnectionStatus()`

### 3. Mongoose Schemas

- **Full type safety**: TypeScript interfaces for all documents
- **Indexes**: Proper indexes for query performance
- **Validation**: Schema validation at the database layer
- **Helper methods**: Custom methods like `isOwner()` and `isInGracePeriod()`

### 4. Usage Examples

See `lib/db-usage-example.ts` for 14 comprehensive examples including:
- Basic queries
- Aggregations
- Complex queries with joins
- API route integration
- Server component integration

---

## Best Practices

1. **Always use `.lean()`** when you don't need Mongoose document features (returns plain JavaScript objects, better performance)
2. **Connect once** - The connection is cached, but always call `connectDB()` to ensure connection
3. **Error handling** - Always wrap database calls in try-catch blocks
4. **Read-only access** - Consider using read-only database user credentials for website
5. **Indexing** - All indexes from the schema documentation are implemented

---

## Troubleshooting

### "MONGODB_URI is required" error

Make sure you have a `.env.local` file with the `MONGODB_URI` variable set.

### Connection timeout

Check your MongoDB Atlas network access settings - make sure your IP is whitelisted or use `0.0.0.0/0` for all IPs (development only).

### Type errors

Run `npm run typecheck` to check for TypeScript errors.

### Connection issues in development

The connection is cached globally to prevent multiple connections during Next.js hot reload. If you experience issues, restart the dev server.

---

## Testing

Run type checking:
```bash
npm run typecheck
```

Build the project:
```bash
npm run build
```

---

## Security Notes

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Use strong passwords** for MongoDB
3. **Consider read-only access** for the website
4. **Use MongoDB Atlas IP whitelist** in production
5. **Rotate credentials periodically**

---

## Additional Resources

- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Complete schema reference
- [DATABASE_SCHEMA_SYNC_PROCESS.md](./DATABASE_SCHEMA_SYNC_PROCESS.md) - Schema synchronization guide
- [Mongoose Documentation](https://mongoosejs.com/)
- [Zod Documentation](https://zod.dev/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

**Last Updated**: 2025-11-10

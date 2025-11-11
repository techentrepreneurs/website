# Database Schema Reference

**Database System**: MongoDB (Atlas)
**Database Name**: `verification_bot`
**Driver**: Motor (async MongoDB driver for Python)

This document describes the complete database schema for the Discord verification bot. Use this as a reference when building integrations with other systems (e.g., TypeScript website).

---

## Collections Overview

| Collection              | Purpose                                  | Key Relationships                             |
| ----------------------- | ---------------------------------------- | --------------------------------------------- |
| `introductions`         | User verification submissions and voting | Links to Discord users                        |
| `company_updates`       | Messages from company channels           | Links to `company_channels`                   |
| `channel_subscriptions` | User subscriptions to company channels   | Links to `company_channels` and Discord users |
| `company_channels`      | Company channel metadata and ownership   | Links to Discord users (owners)               |
| `company_metadata`      | AI-extracted company information         | 1:1 relationship with `company_channels`      |

---

## Collection: `introductions`

Stores user introduction messages submitted for community verification.

### Document Structure

```typescript
{
  _id: ObjectId;

  // Original Message Information
  content: string; // Introduction text content
  created_at: Date; // When message was created
  edited_at: Date | null; // Last edit timestamp
  attachments: Array<{
    id: number;
    filename: string;
    url: string;
    size: number;
    content_type: string | null;
    width: number | null;
    height: number | null;
  }>;
  message_url: string; // Direct link to Discord message

  // Original Channel Information
  original_message_id: number; // Discord message ID (original)
  original_channel_id: number; // Channel where intro was posted
  original_channel_name: string;

  // Forwarded Message Information
  forwarded_message_id: number; // Discord message ID (forwarded to voting channel)
  forwarded_channel_id: number; // Voting channel ID
  forwarded_channel_name: string;

  // Guild Information
  guild_id: number; // Discord server ID
  guild_name: string;

  // Author Information
  user_id: number; // Discord user ID
  username: string;
  display_name: string;
  discriminator: string | null; // Legacy Discord discriminator
  avatar_url: string | null;
  bot: boolean;
  created_at: Date; // Discord account creation date
  joined_at: Date; // When user joined server
  account_age_days: number; // Age of Discord account
  server_age_days: number | null; // How long user has been in server
  roles: Array<{
    id: number;
    name: string;
    color: number | null;
  }>;
  custom_status: string | null;

  // Voting Information
  upvotes: number;
  downvotes: number;
  voters: Array<{
    voter_id: number;
    vote_type: "upvote" | "downvote";
  }>;

  // Status
  status: "pending" | "approved" | "rejected";

  // Metadata
  timestamp: Date; // When document was created
  last_updated: Date; // Last modification time
}
```

### Indexes

- `forwarded_message_id` (unique)
- `original_message_id`
- `user_id`
- `status`

### Notes

- One user can have multiple introduction attempts
- Voting happens on forwarded message in verification channel
- Status changes from `pending` → `approved`/`rejected` based on vote thresholds

---

## Collection: `company_updates`

Tracks messages posted in company channels for forwarding to a central updates feed.

### Document Structure

```typescript
{
  _id: ObjectId;

  // Message Information
  original_message_id: number; // Discord message ID
  original_channel_id: number; // Company channel ID
  original_channel_name: string;
  guild_id: number;
  content: string; // Message content
  created_at: Date;
  edited_at: Date | null;
  attachments: Array<{
    id: number;
    filename: string;
    url: string;
    size: number;
    content_type: string | null;
    width: number | null;
    height: number | null;
  }>;
  message_url: string;

  // Author Information
  author: {
    id: number;
    username: string;
    display_name: string;
    discriminator: string | null;
    avatar_url: string | null;
    bot: boolean;
    roles: Array<{
      id: number;
      name: string;
      color: number | null;
    }>;
  }

  // Category Information
  category: {
    id: number | null;
    name: string | null;
  }

  // Forwarded Message Information
  forwarded_message_id: number; // Message ID in updates feed
  forwarded_channel_id: number; // Updates feed channel ID
  forwarded_channel_name: string;

  // Reaction Tracking
  reactionUserIds: Array<number>; // User IDs who reacted (any emoji)

  // Metadata
  timestamp: Date;
  last_updated: Date;
}
```

### Indexes

- `original_message_id` (unique)
- `forwarded_message_id`
- `original_channel_id`
- `created_at`

### Relationships

- `original_channel_id` → `company_channels.channel_id`

---

## Collection: `channel_subscriptions`

Tracks which users are subscribed to which company channels.

### Document Structure

```typescript
{
  _id: ObjectId;

  // User Information
  user_id: number; // Discord user ID
  username: string;
  display_name: string;
  avatar_url: string | null;

  // Channel Information
  channel_id: number; // Discord channel ID
  channel_name: string;
  guild_id: number;

  // Subscription Status
  subscribed: boolean; // Current subscription state

  // History
  subscription_history: Array<{
    action: "subscribe" | "unsubscribe";
    timestamp: Date;
    channel_id: number;
  }>;

  // Metadata
  timestamp: Date; // Document creation
  last_updated: Date;
}
```

### Indexes

- `{user_id: 1, channel_id: 1}` (compound, unique)
- `channel_id`
- `subscribed`

### Relationships

- `channel_id` → `company_channels.channel_id`
- `user_id` → Discord user

### Notes

- One document per user-channel pair
- `subscribed: true` = active subscription
- History tracks all subscribe/unsubscribe events

---

## Collection: `company_channels`

Stores company channel metadata, ownership, and retirement status.

### Document Structure

```typescript
{
  _id: ObjectId

  // Channel Information
  channel_id: number                 // Discord channel ID (unique)
  channel_name: string
  category_id: number | null         // Discord category ID
  guild_id: number

  // Ownership (Multi-owner Support)
  owner_ids: Array<number>           // Multiple Discord user IDs

  // Legacy Ownership (Deprecated but still supported)
  owner_id?: number                  // Single owner (old documents)

  // Owner Details (cached for performance)
  owner_username: string             // Primary owner username
  owner_display_name: string
  owner_avatar_url: string | null

  // Retirement Status
  is_retired: boolean                // Whether channel is retired
  retired_at?: Date                  // When channel was retired
  retired_by?: number                // User ID who retired it
  restored_at?: Date                 // When channel was restored
  restored_by?: number               // User ID who restored it

  // Grace Period
  grace_period_until?: Date          // 3-day grace period after restoration

  // Inactivity Tracking
  inactivity_warning_sent?: boolean
  inactivity_warning_sent_at?: Date

  // Metadata
  creation_date: Date
  last_updated: Date
}
```

### Indexes

- `channel_id` (unique)
- `owner_ids` (multikey index)
- `category_id`
- `is_retired`

### Notes

- Supports multiple owners per channel via `owner_ids` array
- Legacy `owner_id` field still exists for backward compatibility
- Retired channels: `is_retired: true`
- Grace period: 3 days after restoration where special rules apply
- Check both `owner_id` and `owner_ids` when querying ownership

---

## Collection: `company_metadata`

Stores AI-extracted company information from channel messages. Has a 1:1 relationship with `company_channels`.

### Document Structure

```typescript
{
  _id: ObjectId;

  // Channel Reference
  channel_id: number; // Discord channel ID (unique, references company_channels)

  // Company Information (AI-Extracted)
  name: string; // Company name (REQUIRED)
  description: string; // Company description (REQUIRED)
  website_url: string; // Company website URL (OPTIONAL - can be empty string)

  // Metadata
  created_at: Date; // When metadata was first created
  last_updated: Date; // Last time metadata was updated/refreshed
}
```

### Indexes

- `channel_id` (unique)

### Relationships

- `channel_id` → `company_channels.channel_id` (1:1 relationship)

### Notes

- Each company channel can have at most one metadata record
- Optional collection - not all company channels may have metadata
- Failed extractions do not create/update database records
- Uses upsert operations - safe to re-run without creating duplicates

---

## Relationships Diagram

```
Discord Users (External)
    │
    ├─→ introductions.user_id (author)
    ├─→ introductions.voters[].voter_id
    ├─→ company_channels.owner_ids[] (owners)
    └─→ channel_subscriptions.user_id (subscriber)

company_channels.channel_id
    │
    ├─→ company_updates.original_channel_id
    ├─→ channel_subscriptions.channel_id
    └─→ company_metadata.channel_id (1:1)

Discord Messages (External)
    │
    ├─→ introductions.original_message_id
    ├─→ introductions.forwarded_message_id
    ├─→ company_updates.original_message_id
    └─→ company_updates.forwarded_message_id
```

---

## Data Validation & Constraints

### Application-Level Constraints

MongoDB has no schema validation enabled. All constraints enforced in Python application code:

1. **Unique Constraints**:

   - `introductions.forwarded_message_id` must be unique
   - `company_updates.original_message_id` must be unique
   - `company_channels.channel_id` must be unique
   - `company_metadata.channel_id` must be unique
   - `{user_id, channel_id}` combination unique in `channel_subscriptions`

2. **Required Fields**:

   - All fields listed without `| null` or `?` are required
   - Arrays can be empty `[]` unless noted otherwise
   - `company_metadata.name` and `company_metadata.description` are strictly required (AI extraction fails if missing)

3. **Enums**:

   - `introductions.status`: `'pending' | 'approved' | 'rejected'`
   - `subscription_history[].action`: `'subscribe' | 'unsubscribe'`
   - `voters[].vote_type`: `'upvote' | 'downvote'`

4. **Optional Fields**:
   - `company_metadata.website_url` can be empty string (not null) if not found in channel messages

---

## Migration Notes

### Schema Evolution

- No formal migration system exists
- Schema changes handled at application runtime
- Backward compatibility maintained (e.g., `owner_id` vs `owner_ids`)

### Known Migration

One migration function exists: `migrate_company_owners_to_array()`

- Converts `owner_id: number` → `owner_ids: [number]`
- Run manually when needed
- Old documents still work with both fields

---

## Connection Information

**MongoDB URI Pattern**: `mongodb+srv://<credentials>@<cluster>.mongodb.net/`
**Database**: `verification_bot`
**Auth**: Username/password (stored in environment variables)

### Environment Variables

- Connection details stored in bot's environment configuration
- Not included in code repository
- Required for database access

---

## TypeScript Integration Notes

### Converting to TypeScript Interfaces

The type annotations in this document use TypeScript syntax for clarity. To use in a TypeScript project:

1. Copy structure blocks into `.ts` files
2. Replace `ObjectId` with `ObjectId` from `mongodb` package or `string`
3. Add `import` statements as needed
4. Consider using `mongoose` for schema validation

### Example TypeScript Interface

```typescript
import { ObjectId } from "mongodb";

interface Introduction {
  _id: ObjectId;
  content: string;
  created_at: Date;
  edited_at: Date | null;
  user_id: number;
  username: string;
  status: "pending" | "approved" | "rejected";
  upvotes: number;
  downvotes: number;
  // ... other fields
}
```

### Recommended TypeScript Packages

- `mongodb`: Official MongoDB driver
- `mongoose`: ODM with schema validation (optional)
- Database reads: Use same structure as Python
- Consider read-only access for website safety

---

## Business Logic Notes

### Introduction Verification Flow

1. User posts in introduction channel
2. Bot forwards to voting channel
3. Community votes with reactions
4. Threshold met → status changes to `approved`/`rejected`
5. User gains/loses access based on status

### Company Channel Lifecycle

1. Created by user → stored in `company_channels`
2. Owner(s) can post updates → stored in `company_updates`
3. Other users can subscribe → tracked in `channel_subscriptions`
4. Metadata can be extracted → stored in `company_metadata`
5. Can be retired → `is_retired: true`
6. Can be restored with 3-day grace period

### Subscription System

- Users subscribe to channels for notifications
- Stored as user-channel pairs
- History tracks all subscription changes
- Bot sends notifications when subscribed channels post updates

### Metadata Extraction Flow

1. Admin runs `/extract-metadata` command
2. Bot filters channels needing metadata (no metadata or stale >30 days)
3. For each channel:
   - Scrapes all non-bot messages (1 second delay per message)
   - Formats content in-memory (no local files saved)
   - Sends content to Claude AI for analysis
   - Validates required fields (name, description)
   - Upserts metadata to database
4. Progress updates sent every 5 channels
5. Final statistics summary sent to admin
6. Bot remains fully functional during entire process (non-blocking)

---

**Last Updated**: 2025-11-10
**Schema Version**: Current (includes `company_metadata` collection with AI extraction)

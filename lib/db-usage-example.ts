/**
 * Database Usage Examples
 *
 * This file demonstrates how to use the database connection and models
 * in your Next.js application.
 *
 * IMPORTANT: This is an example file. Do not import it directly.
 * Copy the patterns shown here into your actual API routes or server components.
 */

import { connectDB, getConnectionStatus } from "./db";
import {
  Introduction,
  CompanyUpdate,
  ChannelSubscription,
  CompanyChannel,
} from "./models";

/**
 * Example 1: Fetching all pending introductions
 * Use this in an API route or Server Component
 */
export async function getPendingIntroductions() {
  await connectDB();

  const introductions = await Introduction.find({ status: "pending" })
    .sort({ timestamp: -1 })
    .limit(10)
    .lean(); // .lean() returns plain JavaScript objects instead of Mongoose documents

  return introductions;
}

/**
 * Example 2: Fetching a specific introduction by user ID
 */
export async function getIntroductionByUserId(userId: number) {
  await connectDB();

  const introduction = await Introduction.findOne({ user_id: userId }).lean();

  return introduction;
}

/**
 * Example 3: Fetching recent company updates
 */
export async function getRecentCompanyUpdates(limit = 20) {
  await connectDB();

  const updates = await CompanyUpdate.find()
    .sort({ created_at: -1 })
    .limit(limit)
    .lean();

  return updates;
}

/**
 * Example 4: Getting updates from a specific company channel
 */
export async function getUpdatesForChannel(channelId: number) {
  await connectDB();

  const updates = await CompanyUpdate.find({
    original_channel_id: channelId,
  })
    .sort({ created_at: -1 })
    .lean();

  return updates;
}

/**
 * Example 5: Checking if a user is subscribed to a channel
 */
export async function isUserSubscribed(userId: number, channelId: number) {
  await connectDB();

  const subscription = await ChannelSubscription.findOne({
    user_id: userId,
    channel_id: channelId,
    subscribed: true,
  }).lean();

  return !!subscription;
}

/**
 * Example 6: Getting all subscriptions for a user
 */
export async function getUserSubscriptions(userId: number) {
  await connectDB();

  const subscriptions = await ChannelSubscription.find({
    user_id: userId,
    subscribed: true,
  }).lean();

  return subscriptions;
}

/**
 * Example 7: Getting company channel details
 */
export async function getCompanyChannel(channelId: number) {
  await connectDB();

  const channel = await CompanyChannel.findOne({
    channel_id: channelId,
  }).lean();

  return channel;
}

/**
 * Example 8: Getting all active (non-retired) company channels
 */
export async function getActiveCompanyChannels() {
  await connectDB();

  const channels = await CompanyChannel.find({
    is_retired: false,
  })
    .sort({ creation_date: -1 })
    .lean();

  return channels;
}

/**
 * Example 9: Getting channels owned by a user
 * Handles both old (owner_id) and new (owner_ids) schema
 */
export async function getChannelsByOwner(userId: number) {
  await connectDB();

  const channels = await CompanyChannel.find({
    $or: [{ owner_ids: userId }, { owner_id: userId }],
  }).lean();

  return channels;
}

/**
 * Example 10: Aggregation - Get top voted introductions
 */
export async function getTopVotedIntroductions(limit = 10) {
  await connectDB();

  const introductions = await Introduction.find({ status: "approved" })
    .sort({ upvotes: -1 })
    .limit(limit)
    .lean();

  return introductions;
}

/**
 * Example 11: Complex query - Get channel with subscription count
 */
export async function getChannelWithSubscriptionCount(channelId: number) {
  await connectDB();

  const channel = await CompanyChannel.findOne({
    channel_id: channelId,
  }).lean();

  if (!channel) {
    return null;
  }

  const subscriberCount = await ChannelSubscription.countDocuments({
    channel_id: channelId,
    subscribed: true,
  });

  return {
    ...channel,
    subscriberCount,
  };
}

/**
 * Example 12: Using in a Next.js API Route
 *
 * File: app/api/introductions/route.ts
 *
 * import { NextResponse } from 'next/server';
 * import { connectDB } from '@/lib/db';
 * import { Introduction } from '@/lib/models';
 *
 * export async function GET(request: Request) {
 *   try {
 *     await connectDB();
 *
 *     const { searchParams } = new URL(request.url);
 *     const status = searchParams.get('status') || 'pending';
 *
 *     const introductions = await Introduction.find({ status })
 *       .sort({ timestamp: -1 })
 *       .limit(20)
 *       .lean();
 *
 *     return NextResponse.json({ success: true, data: introductions });
 *   } catch (error) {
 *     console.error('Error fetching introductions:', error);
 *     return NextResponse.json(
 *       { success: false, error: 'Failed to fetch introductions' },
 *       { status: 500 }
 *     );
 *   }
 * }
 */

/**
 * Example 13: Using in a Server Component
 *
 * File: app/introductions/page.tsx
 *
 * import { connectDB } from '@/lib/db';
 * import { Introduction } from '@/lib/models';
 *
 * export default async function IntroductionsPage() {
 *   await connectDB();
 *
 *   const introductions = await Introduction.find({ status: 'pending' })
 *     .sort({ timestamp: -1 })
 *     .limit(20)
 *     .lean();
 *
 *   return (
 *     <div>
 *       <h1>Pending Introductions</h1>
 *       {introductions.map((intro) => (
 *         <div key={intro._id.toString()}>
 *           <h2>{intro.display_name}</h2>
 *           <p>{intro.content}</p>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 */

/**
 * Example 14: Check database connection status
 */
export async function checkDatabaseHealth() {
  try {
    await connectDB();
    const status = getConnectionStatus();

    return {
      connected: status === "connected",
      status,
    };
  } catch (error) {
    return {
      connected: false,
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

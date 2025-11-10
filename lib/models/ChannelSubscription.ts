import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Subscription history entry interface
 */
export interface ISubscriptionHistory {
  action: "subscribe" | "unsubscribe";
  timestamp: Date;
  channel_id: number;
}

/**
 * Channel Subscription document interface
 * Tracks which users are subscribed to which company channels
 */
export interface IChannelSubscription extends Document {
  // User Information
  user_id: number;
  username: string;
  display_name: string;
  avatar_url: string | null;

  // Channel Information
  channel_id: number;
  channel_name: string;
  guild_id: number;

  // Subscription Status
  subscribed: boolean;

  // History
  subscription_history: ISubscriptionHistory[];

  // Metadata
  timestamp: Date;
  last_updated: Date;
}

/**
 * Subscription history sub-schema
 */
const subscriptionHistorySchema = new Schema<ISubscriptionHistory>(
  {
    action: {
      type: String,
      enum: ["subscribe", "unsubscribe"],
      required: true,
    },
    timestamp: { type: Date, required: true },
    channel_id: { type: Number, required: true },
  },
  { _id: false }
);

/**
 * Channel Subscription schema
 */
const channelSubscriptionSchema = new Schema<IChannelSubscription>(
  {
    // User Information
    user_id: { type: Number, required: true },
    username: { type: String, required: true },
    display_name: { type: String, required: true },
    avatar_url: { type: String, default: null },

    // Channel Information
    channel_id: { type: Number, required: true },
    channel_name: { type: String, required: true },
    guild_id: { type: Number, required: true },

    // Subscription Status
    subscribed: { type: Boolean, required: true, default: true },

    // History
    subscription_history: {
      type: [subscriptionHistorySchema],
      default: [],
    },

    // Metadata
    timestamp: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now },
  },
  {
    collection: "channel_subscriptions",
    timestamps: false, // Using custom timestamp fields
  }
);

// Indexes
channelSubscriptionSchema.index(
  { user_id: 1, channel_id: 1 },
  { unique: true }
);
channelSubscriptionSchema.index({ channel_id: 1 });
channelSubscriptionSchema.index({ subscribed: 1 });

/**
 * Channel Subscription model
 * Use this to query and manipulate channel subscription documents
 */
export const ChannelSubscription: Model<IChannelSubscription> =
  mongoose.models.ChannelSubscription ||
  mongoose.model<IChannelSubscription>(
    "ChannelSubscription",
    channelSubscriptionSchema
  );

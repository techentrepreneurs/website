import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Attachment interface for Discord attachments
 */
export interface IAttachment {
  id: number;
  filename: string;
  url: string;
  size: number;
  content_type: string | null;
  width: number | null;
  height: number | null;
}

/**
 * Role interface for Discord roles
 */
export interface IRole {
  id: number;
  name: string;
  color: number | null;
}

/**
 * Voter interface for tracking votes
 */
export interface IVoter {
  voter_id: number;
  vote_type: "upvote" | "downvote";
}

/**
 * Introduction document interface
 * Represents a user's introduction submission for community verification
 */
export interface IIntroduction extends Document {
  // Original Message Information
  content: string;
  created_at: Date;
  edited_at: Date | null;
  attachments: IAttachment[];
  message_url: string;

  // Original Channel Information
  original_message_id: number;
  original_channel_id: number;
  original_channel_name: string;

  // Forwarded Message Information
  forwarded_message_id: number;
  forwarded_channel_id: number;
  forwarded_channel_name: string;

  // Guild Information
  guild_id: number;
  guild_name: string;

  // Author Information
  user_id: number;
  username: string;
  display_name: string;
  discriminator: string | null;
  avatar_url: string | null;
  bot: boolean;
  joined_at: Date;
  account_age_days: number;
  server_age_days: number | null;
  roles: IRole[];
  custom_status: string | null;

  // Voting Information
  upvotes: number;
  downvotes: number;
  voters: IVoter[];

  // Status
  status: "pending" | "approved" | "rejected";

  // Metadata
  timestamp: Date;
  last_updated: Date;
}

/**
 * Attachment sub-schema
 */
const attachmentSchema = new Schema<IAttachment>(
  {
    id: { type: Number, required: true },
    filename: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    content_type: { type: String, default: null },
    width: { type: Number, default: null },
    height: { type: Number, default: null },
  },
  { _id: false }
);

/**
 * Role sub-schema
 */
const roleSchema = new Schema<IRole>(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    color: { type: Number, default: null },
  },
  { _id: false }
);

/**
 * Voter sub-schema
 */
const voterSchema = new Schema<IVoter>(
  {
    voter_id: { type: Number, required: true },
    vote_type: { type: String, enum: ["upvote", "downvote"], required: true },
  },
  { _id: false }
);

/**
 * Introduction schema
 */
const introductionSchema = new Schema<IIntroduction>(
  {
    // Original Message Information
    content: { type: String, required: true },
    created_at: { type: Date, required: true },
    edited_at: { type: Date, default: null },
    attachments: { type: [attachmentSchema], default: [] },
    message_url: { type: String, required: true },

    // Original Channel Information
    original_message_id: { type: Number, required: true },
    original_channel_id: { type: Number, required: true },
    original_channel_name: { type: String, required: true },

    // Forwarded Message Information
    forwarded_message_id: { type: Number, required: true, unique: true },
    forwarded_channel_id: { type: Number, required: true },
    forwarded_channel_name: { type: String, required: true },

    // Guild Information
    guild_id: { type: Number, required: true },
    guild_name: { type: String, required: true },

    // Author Information
    user_id: { type: Number, required: true },
    username: { type: String, required: true },
    display_name: { type: String, required: true },
    discriminator: { type: String, default: null },
    avatar_url: { type: String, default: null },
    bot: { type: Boolean, required: true },
    joined_at: { type: Date, required: true },
    account_age_days: { type: Number, required: true },
    server_age_days: { type: Number, default: null },
    roles: { type: [roleSchema], default: [] },
    custom_status: { type: String, default: null },

    // Voting Information
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    voters: { type: [voterSchema], default: [] },

    // Status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // Metadata
    timestamp: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now },
  },
  {
    collection: "introductions",
    timestamps: false, // Using custom timestamp fields
  }
);

// Indexes
introductionSchema.index({ forwarded_message_id: 1 }, { unique: true });
introductionSchema.index({ original_message_id: 1 });
introductionSchema.index({ user_id: 1 });
introductionSchema.index({ status: 1 });

/**
 * Introduction model
 * Use this to query and manipulate introduction documents
 */
export const Introduction: Model<IIntroduction> =
  mongoose.models.Introduction ||
  mongoose.model<IIntroduction>("Introduction", introductionSchema);

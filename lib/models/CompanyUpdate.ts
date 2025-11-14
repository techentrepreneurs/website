import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Attachment interface (reused from Introduction)
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
 * Role interface (reused from Introduction)
 */
export interface IRole {
  id: number;
  name: string;
  color: number | null;
}

/**
 * Author information interface
 */
export interface IAuthor {
  id: number;
  username: string;
  display_name: string;
  discriminator: string | null;
  avatar_url: string | null;
  bot: boolean;
  roles: IRole[];
}

/**
 * Category information interface
 */
export interface ICategory {
  id: number | null;
  name: string | null;
}

/**
 * Company Update document interface
 * Tracks messages posted in company channels for forwarding to a central updates feed
 */
export interface ICompanyUpdate extends Document {
  // Message Information
  original_message_id: number;
  original_channel_id: number;
  original_channel_name: string;
  guild_id: number;
  content: string;
  created_at: Date;
  edited_at: Date | null;
  attachments: IAttachment[];
  message_url: string;

  // Author Information
  author: IAuthor;

  // Category Information
  category: ICategory;

  // Forwarded Message Information
  forwarded_message_id: number;
  forwarded_channel_id: number;
  forwarded_channel_name: string;

  // Reaction Tracking
  reactionUserIds: number[];

  // Soft Delete
  deleted_at: Date | null;

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
 * Author sub-schema
 */
const authorSchema = new Schema<IAuthor>(
  {
    id: { type: Number, required: true },
    username: { type: String, required: true },
    display_name: { type: String, required: true },
    discriminator: { type: String, default: null },
    avatar_url: { type: String, default: null },
    bot: { type: Boolean, required: true },
    roles: { type: [roleSchema], default: [] },
  },
  { _id: false }
);

/**
 * Category sub-schema
 */
const categorySchema = new Schema<ICategory>(
  {
    id: { type: Number, default: null },
    name: { type: String, default: null },
  },
  { _id: false }
);

/**
 * Company Update schema
 */
const companyUpdateSchema = new Schema<ICompanyUpdate>(
  {
    // Message Information
    original_message_id: { type: Number, required: true, unique: true },
    original_channel_id: { type: Number, required: true },
    original_channel_name: { type: String, required: true },
    guild_id: { type: Number, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, required: true },
    edited_at: { type: Date, default: null },
    attachments: { type: [attachmentSchema], default: [] },
    message_url: { type: String, required: true },

    // Author Information
    author: { type: authorSchema, required: true },

    // Category Information
    category: { type: categorySchema, required: true },

    // Forwarded Message Information
    forwarded_message_id: { type: Number, required: true },
    forwarded_channel_id: { type: Number, required: true },
    forwarded_channel_name: { type: String, required: true },

    // Reaction Tracking
    reactionUserIds: { type: [Number], default: [] },

    // Soft Delete
    deleted_at: { type: Date, default: null },

    // Metadata
    timestamp: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now },
  },
  {
    collection: "company_updates",
    timestamps: false, // Using custom timestamp fields
  }
);

// Indexes
companyUpdateSchema.index({ original_message_id: 1 }, { unique: true });
companyUpdateSchema.index({ forwarded_message_id: 1 });
companyUpdateSchema.index({ original_channel_id: 1 });
companyUpdateSchema.index({ created_at: 1 });

/**
 * Company Update model
 * Use this to query and manipulate company update documents
 */
export const CompanyUpdate: Model<ICompanyUpdate> =
  mongoose.models.CompanyUpdate ||
  mongoose.model<ICompanyUpdate>("CompanyUpdate", companyUpdateSchema);

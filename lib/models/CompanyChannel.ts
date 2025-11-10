import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Company Channel document interface
 * Stores company channel metadata, ownership, and retirement status
 */
export interface ICompanyChannel extends Document {
  // Channel Information
  channel_id: number;
  channel_name: string;
  category_id: number | null;
  guild_id: number;

  // Ownership (Multi-owner Support)
  owner_ids: number[];

  // Legacy Ownership (Deprecated but still supported)
  owner_id?: number;

  // Owner Details (cached for performance)
  owner_username: string;
  owner_display_name: string;
  owner_avatar_url: string | null;

  // Retirement Status
  is_retired: boolean;
  retired_at?: Date;
  retired_by?: number;
  restored_at?: Date;
  restored_by?: number;

  // Grace Period
  grace_period_until?: Date;

  // Inactivity Tracking
  inactivity_warning_sent?: boolean;
  inactivity_warning_sent_at?: Date;

  // Metadata
  creation_date: Date;
  last_updated: Date;
}

/**
 * Company Channel schema
 */
const companyChannelSchema = new Schema<ICompanyChannel>(
  {
    // Channel Information
    channel_id: { type: Number, required: true, unique: true },
    channel_name: { type: String, required: true },
    category_id: { type: Number, default: null },
    guild_id: { type: Number, required: true },

    // Ownership (Multi-owner Support)
    owner_ids: { type: [Number], required: true, default: [] },

    // Legacy Ownership (Deprecated but still supported)
    owner_id: { type: Number },

    // Owner Details (cached for performance)
    owner_username: { type: String, required: true },
    owner_display_name: { type: String, required: true },
    owner_avatar_url: { type: String, default: null },

    // Retirement Status
    is_retired: { type: Boolean, default: false },
    retired_at: { type: Date },
    retired_by: { type: Number },
    restored_at: { type: Date },
    restored_by: { type: Number },

    // Grace Period
    grace_period_until: { type: Date },

    // Inactivity Tracking
    inactivity_warning_sent: { type: Boolean, default: false },
    inactivity_warning_sent_at: { type: Date },

    // Metadata
    creation_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now },
  },
  {
    collection: "company_channels",
    timestamps: false, // Using custom timestamp fields
  }
);

// Indexes
companyChannelSchema.index({ channel_id: 1 }, { unique: true });
companyChannelSchema.index({ owner_ids: 1 }); // Multikey index for array
companyChannelSchema.index({ category_id: 1 });
companyChannelSchema.index({ is_retired: 1 });

/**
 * Helper method to check if a user is an owner
 * Checks both owner_ids array and legacy owner_id field
 */
companyChannelSchema.methods.isOwner = function (userId: number): boolean {
  // Check multi-owner array
  if (this.owner_ids && this.owner_ids.includes(userId)) {
    return true;
  }
  // Check legacy single owner field
  if (this.owner_id && this.owner_id === userId) {
    return true;
  }
  return false;
};

/**
 * Helper method to check if channel is in grace period
 */
companyChannelSchema.methods.isInGracePeriod = function (): boolean {
  if (!this.grace_period_until) {
    return false;
  }
  return new Date() < this.grace_period_until;
};

/**
 * Company Channel model
 * Use this to query and manipulate company channel documents
 */
export const CompanyChannel: Model<ICompanyChannel> =
  mongoose.models.CompanyChannel ||
  mongoose.model<ICompanyChannel>("CompanyChannel", companyChannelSchema);

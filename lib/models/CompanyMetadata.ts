import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Company Metadata document interface
 * Stores AI-extracted company information from channel messages
 * Has a 1:1 relationship with company_channels
 */
export interface ICompanyMetadata extends Document {
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

/**
 * Company Metadata schema
 */
const companyMetadataSchema = new Schema<ICompanyMetadata>(
  {
    // Channel Reference
    channel_id: { type: Number, required: true, unique: true },

    // Company Information (AI-Extracted)
    name: { type: String, required: true },
    description: { type: String, required: true },
    website_url: { type: String, default: "" }, // Can be empty string if not found

    // Metadata
    created_at: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now },
  },
  {
    collection: "company_metadata",
    timestamps: false, // Using custom timestamp fields
  }
);

// Indexes
companyMetadataSchema.index({ channel_id: 1 }, { unique: true });

/**
 * Company Metadata model
 * Use this to query and manipulate company metadata documents
 */
export const CompanyMetadata: Model<ICompanyMetadata> =
  mongoose.models.CompanyMetadata ||
  mongoose.model<ICompanyMetadata>("CompanyMetadata", companyMetadataSchema);

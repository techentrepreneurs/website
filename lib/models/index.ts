/**
 * Database Models Index
 * Central export point for all MongoDB/Mongoose models
 *
 * Usage:
 * ```typescript
 * import { Introduction, CompanyUpdate, ChannelSubscription, CompanyChannel, CompanyMetadata } from '@/lib/models';
 * ```
 */

// Models
export { Introduction } from "./Introduction";
export { CompanyUpdate } from "./CompanyUpdate";
export { ChannelSubscription } from "./ChannelSubscription";
export { CompanyChannel } from "./CompanyChannel";
export { CompanyMetadata } from "./CompanyMetadata";

// Types
export type { IIntroduction, IAttachment, IRole, IVoter } from "./Introduction";
export type { ICompanyUpdate, IAuthor, ICategory } from "./CompanyUpdate";
export type {
  IChannelSubscription,
  ISubscriptionHistory,
} from "./ChannelSubscription";
export type { ICompanyChannel } from "./CompanyChannel";
export type { ICompanyMetadata } from "./CompanyMetadata";

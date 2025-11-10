/**
 * Database Models Index
 * Central export point for all MongoDB/Mongoose models
 *
 * Usage:
 * ```typescript
 * import { Introduction, CompanyUpdate, ChannelSubscription, CompanyChannel } from '@/lib/models';
 * ```
 */

// Models
export { Introduction } from "./Introduction";
export { CompanyUpdate } from "./CompanyUpdate";
export { ChannelSubscription } from "./ChannelSubscription";
export { CompanyChannel } from "./CompanyChannel";

// Types
export type { IIntroduction, IAttachment, IRole, IVoter } from "./Introduction";
export type {
  ICompanyUpdate,
  IAuthor,
  ICategory,
} from "./CompanyUpdate";
export type {
  IChannelSubscription,
  ISubscriptionHistory,
} from "./ChannelSubscription";
export type { ICompanyChannel } from "./CompanyChannel";

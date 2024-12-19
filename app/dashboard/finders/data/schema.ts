import { z } from 'zod';

export const userChangeLogSchema = z.object({
  id: z.number(),
  type: z.string(),
  field: z.string().nullable(),
  timestamp: z.string(),
  user_id: z.number(),
  old_value: z.record(z.string(), z.number()).nullable(),
  new_value: z.record(z.string(), z.number()).nullable(),
  from_model: z.boolean(),
  ignore_conversion: z.boolean(),
  reason: z
    .object({
      reason: z.string(),
      submitting_user_name: z.string()
    })
    .nullable()
});

export const paymentAccountSchema = z
  .object({
    id: z.number(),
    user_id: z.number(),
    account_id: z.string(),
    customer_id: z.string(),
    onboarding_complete: z.boolean()
  })
  .optional();

export const finderSchema = z.object({
  id: z.number(),
  profile_id: z.number(),
  name: z.string(),
  email: z.string(),
  gender: z.string().nullable(),
  age: z.number().nullable(),
  challenges: z.array(z.string()).default([]),
  rating: z.string().nullable(),
  date: z.string(),
  criminal_offences: z.string().nullable(),
  status: z.string().nullable(),
  photo_url: z.string().nullable(),
  partner_organization_code: z.string(),
  is_critical_information_modified: z.boolean().default(false),
  is_stripe_onboarding_complete: z.boolean(),
  verticals_for_approval: z.array(z.string()).default([]),
  last_admin_profile_verification: z.string().nullable(),
  user_change_logs: z.array(userChangeLogSchema).nullable().default([]),
  payment_account: paymentAccountSchema
});

export type Finder = z.infer<typeof finderSchema>;

export const findersResponseSchema = z.object({
  items: z.array(finderSchema),
  amount: z.number(),
  next_token: z.string()
});

export type FindersResponse = z.infer<typeof findersResponseSchema>;

// Additional schemas for filters and query parameters
export const finderStatusSchema = z.enum([
  'signed_up',
  'application_in_progress',
  'stale',
  'pending_application_review',
  'application_under_review',
  'additional_information_needed',
  'pending_meet_and_greet',
  'reference_check_required',
  'background_check_required',
  'training_required',
  'pending_bio_update',
  'pending_platform_agreement',
  'active',
  'deactivated',
  'not_proceeding_with_fello',
  'pending_deletion'
]);

export const genderSchema = z.enum([
  'Male',
  'Female',
  'Non-binary',
  'Prefer to self-describe',
  'Decline to state'
]);

export const ageRangeSchema = z.enum(['18-30', '31-40', '41-50', '51plus']);

export const challengesSchema = z.enum([
  'alcohol_use',
  'drug_use',
  'parenting',
  'relationships'
]);

export const ratingSchema = z.enum(['new', '1-3', '3-5']);

export const offenceSchema = z.enum(['yes', 'no']);

export const finderQuerySchema = z.object({
  limit: z.number().optional(),
  name: z.string().optional(),
  finder_status: z.array(finderStatusSchema).optional(),
  gender: z.array(genderSchema).optional(),
  age: z.array(ageRangeSchema).optional(),
  criminal_offenses: z.array(offenceSchema).optional(),
  challenges: z.array(challengesSchema).optional(),
  rating: z.array(ratingSchema).optional(),
  sort_ordering: z.string().optional(),
  sort_by: z.string().optional(),
  token: z.string().optional()
});

export type FinderQuery = z.infer<typeof finderQuerySchema>;

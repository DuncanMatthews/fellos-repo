// data/schema.ts
import { z } from 'zod';

// data/schema.ts
export const userChangeLogSchema = z.object({
  id: z.number(),
  type: z.string(),
  field: z.string().nullable(),
  timestamp: z.string(),
  user_id: z.number(),
  old_value: z.string().nullable(),
  new_value: z.string().nullable(),
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

export const fellowSchema = z.object({
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

export type Fellow = z.infer<typeof fellowSchema>;

export const fellowsResponseSchema = z.object({
  items: z.array(fellowSchema),
  amount: z.number(),
  next_token: z.string()
});

export type FellowsResponse = z.infer<typeof fellowsResponseSchema>;

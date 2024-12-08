import { z } from 'zod';

export const fellowSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  status: z.string().nullable(),
  rating: z.string().nullable(),
  date: z.string().nullable(),
  organization: z.string().nullable(),
  verificationStatus: z.string().nullable(),
  is_critical_information_modified: z.boolean().default(false),
  last_admin_profile_verification: z.string().nullable(),
  is_stripe_onboarding_complete: z.boolean().default(false),
  user_change_logs: z
    .array(
      z.object({
        type: z.string(),
        old_value: z.any(),
        new_value: z.any(),
        timestamp: z.string(),
        reason: z
          .object({
            reason: z.string(),
            submitting_user_name: z.string()
          })
          .nullable()
          .optional()
      })
    )
    .default([]),
  gender: z.string().nullable(),
  age: z.string().nullable(),
  challenges: z.array(z.string()).default([]),
  criminal_offences: z.string().nullable()
});

export type Fellow = z.infer<typeof fellowSchema>;

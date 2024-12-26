import { z } from 'zod';

// Enhanced status enum to include no-shows
export const interactionStatusSchema = z.enum([
  'cancelled_by_admin',
  'cancelled_by_fello',
  'cancelled_by_participant',
  'completed',
  'escalated',
  'upcoming',
  'no_show_fello',
  'no_show_participant'
]);

export const verticalSchema = z.enum([
  'alcohol_use',
  'drug_use',
  'parenting',
  'relationships'
]);

// New schema for status change history
export const statusChangeSchema = z.object({
  timestamp: z.string(),
  from_status: interactionStatusSchema.nullable(),
  to_status: interactionStatusSchema,
  changed_by_id: z.number(),
  changed_by_name: z.string(),
  reason: z.string().optional()
});

// Schema for interaction participants
export const participantSchema = z.object({
  user_profile_id: z.number(),
  name: z.string(),
  email: z.string(),
  photo_url: z.string().nullable(),
  last_login: z.string(),
  role: z.enum(['fello', 'participant'])
});

// Updated interaction schema with enhanced tracking
export const interactionSchema = z.object({
  id: z.number(),
  fello_status: z.enum(['active', 'inactive', 'pending']),
  finder_status: z.enum(['active', 'inactive', 'pending']),
  fello_id: z.number(),
  finder_id: z.number(),

  // Timing fields
  interaction_start_date: z.string(),
  interaction_end_date: z.string(),
  duration: z.number(),
  actual_duration: z.number().nullable(),
  created_at: z.string(),
  interaction_finish_date: z.string().nullable(),

  // Status tracking
  interaction_status: interactionStatusSchema,
  status_history: z.array(statusChangeSchema).optional(),
  last_status_change: z.string().optional(),

  // Categorization
  vertical: verticalSchema.nullable(),

  // Payment tracking
  is_payment_pending: z.boolean(),
  payment_amount: z.number().optional(),
  payment_status: z.enum(['pending', 'completed', 'failed']).optional(),

  // Visibility
  is_hidden: z.boolean().nullable(),

  // Fello information
  fello_name: z.string(),
  fello_email: z.string(),
  fello_photo_url: z.string().nullable(),
  fello_last_login: z.string(),
  fello_user_profile_id: z.number(),

  // Participant information
  participant_name: z.string(),
  participant_email: z.string(),
  participant_photo_url: z.string().nullable(),
  participant_last_login: z.string(),
  participant_user_profile_id: z.number(),

  // Cancellation tracking
  cancelled_by_user_profile_id: z.number().nullable(),
  cancellation_reason: z.string().nullable(),
  cancellation_timestamp: z.string().nullable(),

  // Notes and feedback
  admin_notes: z.string().nullable().optional(),
  interaction_feedback: z
    .object({
      rating: z.number().optional(),
      comments: z.string().optional()
    })
    .optional(),

  // Flags for admin attention
  requires_review: z.boolean().optional(),
  review_reason: z.string().nullable().optional(),

  // Optional fields from API schema
  from_model: z.boolean().optional(),
  ignore_conversion: z.boolean().optional()
});

// Response schema
export const interactionsResponseSchema = z.object({
  items: z.array(interactionSchema),
  amount: z.number(),
  next_token: z.string()
});

// Enhanced query parameters schema
export const interactionQuerySchema = z.object({
  limit: z.number().optional().default(20),
  name_or_email: z.string().optional(),
  interaction_status: z.array(interactionStatusSchema).optional(),
  verticals: z.array(verticalSchema).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  payment_status: z.enum(['pending', 'completed', 'failed']).optional(),
  requires_review: z.boolean().optional(),
  sort_ordering: z.enum(['asc', 'desc']).optional(),
  sort_by: z.string().optional(),
  token: z.string().optional()
});

// Type exports
export type InteractionStatus = z.infer<typeof interactionStatusSchema>;
export type Vertical = z.infer<typeof verticalSchema>;
export type StatusChange = z.infer<typeof statusChangeSchema>;
export type Interaction = z.infer<typeof interactionSchema>;
export type InteractionsResponse = z.infer<typeof interactionsResponseSchema>;
export type InteractionQuery = z.infer<typeof interactionQuerySchema>;

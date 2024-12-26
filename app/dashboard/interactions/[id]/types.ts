export interface InteractionStatusReason {
  reason: string | null;
  submitting_user_name: string | null;
}

export interface InteractionDetailsResponse {
  id: number;
  interaction_start_date: string;
  interaction_end_date: string;
  duration: number;
  created_at: string;
  interaction_status:
    | 'cancelled_by_admin'
    | 'cancelled_by_fello'
    | 'cancelled_by_participant'
    | 'completed'
    | 'escalated'
    | 'upcoming';
  vertical: string | null;
  actual_duration: number | null;
  fello_name: string | null;
  fello_email: string | null;
  fello_status: string | null;
  fello_photo_url: string | null;
  fello_rating: number | null;
  fello_last_activity: string | null;
  fello_last_login: string | null;
  fello_application_date: string | null;
  fello_before_interaction: string | null;
  fello_after_interaction: string | null;
  fello_notes: string | null;
  fello_rated_interaction: number | null;
  fello_achievement_rating: number | null;
  fello_user_profile_id: number | null;
  fello_user_id: number | null;
  participant_name: string | null;
  participant_email: string | null;
  participant_status: string | null;
  participant_photo_url: string | null;
  participant_rating: number | null;
  participant_last_activity: string | null;
  participant_last_login: string | null;
  participant_registration_date: string | null;
  participant_expectations: string | null;
  participant_before_interaction: string | null;
  participant_after_interaction: string | null;
  participant_notes: string | null;
  participant_rated_interaction: number | null;
  participant_achievement_rating: number | null;
  participant_user_profile_id: number | null;
  participant_user_id: number | null;
  next_steps: string | null;
  is_payment_pending: boolean | null;
  is_hidden: boolean | null;
  cancelled_by_user_profile_id: number | null;
  interaction_finish_date: string | null;
}

export type InteractionParams = {
  interaction_id: number;
  'x-user-timezone': string;
};

export interface PaymentInfo {
  finder_charge_status: 'pending' | 'completed' | 'failed' | 'refunded';
  fello_payment_status: 'pending' | 'completed' | 'failed';
  batch_payment_id?: string;
  refund_status?: 'pending' | 'completed' | 'none';
  refund_reason?: string;
  promo_code?: string;
  discount_amount?: number;
}

export interface ActivityEvent {
  timestamp: string;
  event_type: 'login' | 'survey' | 'join' | 'leave' | 'extend' | 'escalate';
  user_type: 'fello' | 'finder';
  details?: string;
}

export interface ConnectionQuality {
  user_type: 'fello' | 'finder';
  timestamp: string;
  quality_score: number; // 1-5
  issues?: string[];
  dropped_count?: number;
}

export interface ExtendedInteractionDetails extends InteractionDetailsResponse {
  payment_info: PaymentInfo;
  activity_timeline: ActivityEvent[];
  connection_quality: ConnectionQuality[];
  warnings: {
    no_show_count?: number;
    late_cancellation_count?: number;
    technical_issues?: boolean;
  };
  cancellation_details?: {
    timestamp: string;
    reason: string;
    timing: '<24h' | '>24h' | 'during';
    by_user_type: 'fello' | 'finder';
  };
}

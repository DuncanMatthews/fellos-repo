interface StatusReason {
  reason: string | null;
  submitting_user_name: string | null;
}

interface BaseRequestParameters {
  finder_id: number;
  'x-user-timezone': string;
}

interface AdminFinderDetailsGeneralResponse {
  id: number;
  profile_id: number;
  full_name: string | null;
  status: string | null;
  status_reason: StatusReason | null;
  profile_picture_url: string | null;
  rating: number | null;
  last_activity_at: string | null;
  last_login: string | null;
  registration_date: string | null;
  email: string | null;
  criminal_offences: string[] | null;
  address: string | null;
  phone_number: string | null;
  gender: string | null;
  languages: string[] | null;
  race_and_ethnicity: string[] | null;
  self_description: string | null;
  personality: string[] | null;
  expectations: string | null;
  partner_organization_code: string | null;
}

interface AdminFinderVerticalsResponse {
  id: number;
  profile_id: number;
  full_name: string | null;
  status: string | null;
  profile_picture_url: string | null;
  rating: number | null;
  last_login: string | null;
  date: string | null;
  verticals: string[] | null;
  onboarding_answers: [string, number, string, { answer: string }][] | null;
}

interface AdminFinderHistoryEntry {
  id: number;
  timestamp: string;
  type: 'profile' | 'references' | 'status' | 'vertical';
  field: string | null;
  old_value: object | string | string[] | null;
  new_value: object | string | string[] | null;
  reason: StatusReason | null;
}

interface AdminFinderInteractionsResponse {
  items: AdminFinderInteractionEntry[];
  next_token: string | null;
}

interface AdminFinderInteractionEntry {
  id: number;
  interaction_start_date: string;
  interaction_end_date: string;
  duration: number;
  created_at: string;
  interaction_status:
    | 'cancelled_by_admin'
    | 'cancelled_by_finder'
    | 'cancelled_by_participant'
    | 'completed'
    | 'escalated'
    | 'upcoming';
  vertical: string | null;
  is_payment_pending: boolean | null;
  is_hidden: boolean | null;
  actual_duration: number | null;
  finder_name: string | null;
  finder_email: string | null;
  finder_photo_url: string | null;
  finder_last_login: string | null;
  finder_user_profile_id: number | null;
  participant_name: string | null;
  participant_email: string | null;
  participant_photo_url: string | null;
  participant_last_login: string | null;
  participant_user_profile_id: number | null;
  cancelled_by_user_profile_id: number | null;
  interaction_finish_date: string | null;
}

interface AdminFinderPromoCodesResponse {
  promo_codes: string[];
}

export type {
  StatusReason,
  BaseRequestParameters,
  AdminFinderDetailsGeneralResponse,
  AdminFinderVerticalsResponse,
  AdminFinderHistoryEntry,
  AdminFinderInteractionsResponse,
  AdminFinderInteractionEntry,
  AdminFinderPromoCodesResponse
};

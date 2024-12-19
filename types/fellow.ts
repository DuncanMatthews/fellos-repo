// types/fello.ts
export type Reference = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  known_as: string;
  id: number;
  referencer_id: number;
};

export type FelloGeneral = {
  id: number;
  profile_id: number;
  full_name: string;
  status: string;
  status_reason: { reason: string; submitting_user_name: string } | null;
  profile_picture_url: string;
  rating: number;
  last_login: string;
  application_date: string;
  email: string;
  criminal_offences: string[] | null;
  address: string;
  phone_number: string;
  social_media: string[];
  first_reference: Reference;
  second_reference: Reference;
  gender: string;
  languages: string[];
  race_and_ethnicity: string[];
  self_description: string;
  personality: string[];
  partner_organization_code: string | null;
  is_critical_information_modified: boolean;
  is_stripe_onboarding_complete: boolean;
  availability_requests_counter: number;
};

export type FelloVertical = {
  id: number;
  profile_id: number;
  verticals: string[];
  onboarding_answers: (string | null)[][];
};

export type HistoryEntry = {
  id: number;
  timestamp: string;
  type: string;
  field: string;
  old_value: Record<string, any>;
  new_value: Record<string, any>;
  reason: {
    reason: string;
    submitting_user_name: string;
  };
};

export type Interaction = {
  id: number;
  interaction_start_date: string;
  interaction_end_date: string;
  duration: number;
  interaction_status:
    | 'cancelled_by_admin'
    | 'cancelled_by_fello'
    | 'cancelled_by_participant'
    | 'completed'
    | 'escalated'
    | 'upcoming';
  vertical: string;
  is_payment_pending: boolean;
  fello_name: string;
  participant_name: string;
  actual_duration: number;
  interaction_finish_date: string;
};

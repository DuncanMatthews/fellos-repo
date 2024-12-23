// Common Types
interface BaseRequestParameters {
  fello_id: number; // path parameter
  'x-user-timezone': string; // header parameter
}

interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

interface ValidationErrorResponse {
  detail: ValidationError[];
}

// Reference & Status Types
interface StatusReason {
  reason: string | null;
  submitting_user_name: string | null;
}

interface Reference {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  known_as: string;
  id: number;
  referencer_id: number;
}

// General Details Types
interface FelloGeneralResponse {
  id: number;
  profile_id: number;
  full_name: string;
  status: string;
  status_reason: StatusReason;
  profile_picture_url: string;
  rating: number;
  last_login: string; // ISO 8601 date string
  last_activity_at: string; // ISO 8601 date string
  application_date: string; // ISO 8601 date string
  email: string;
  criminal_offences: string[];
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
  partner_organization_code: string;
  is_critical_information_modified: boolean;
  is_stripe_onboarding_complete: boolean;
  availability_requests_counter: number;
}

// Verticals Types
interface OnboardingAnswerDetail {
  answer: string;
}

type OnboardingAnswer = [
  string, // vertical name
  number, // question id
  string, // question text
  OnboardingAnswerDetail
];

interface AdminUserDetailsVerticalsResponse {
  id: number;
  profile_id: number;
  full_name: string | null;
  status: string | null;
  profile_picture_url: string | null;
  rating: number | null;
  last_login: string | null; // ISO 8601 date string
  date: string | null; // ISO 8601 date string
  verticals: string[] | null;
  onboarding_answers: OnboardingAnswer[] | null;
}

// History Types
type HistoryType = 'profile' | 'status' | 'vertical';
type ChangeValue = string | string[] | StatusReason | null;

interface HistoryEntry {
  id: number;
  timestamp: string; // ISO 8601 date-time
  type: HistoryType;
  field: string | null;
  old_value: ChangeValue;
  new_value: ChangeValue;
  reason: StatusReason | null;
}

// Interactions Types
interface InteractionsRequestParameters extends BaseRequestParameters {
  limit?: number;
  name_or_email?: string;
  interaction_status?: InteractionStatus[];
  sort_ordering?: string;
  sort_by?: string;
  token?: string;
}

type InteractionStatus =
  | 'cancelled_by_admin'
  | 'cancelled_by_fello'
  | 'cancelled_by_participant'
  | 'completed'
  | 'escalated'
  | 'upcoming';

interface InteractionEntry {
  id: number;
  interaction_start_date: string; // ISO 8601 date-time
  interaction_end_date: string; // ISO 8601 date-time
  duration: number;
  created_at: string; // ISO 8601 date-time
  interaction_status: InteractionStatus;
  vertical: string | null;
  is_payment_pending: boolean | null;
  is_hidden: boolean | null;
  actual_duration: number | null;

  // Fello information
  fello_name: string | null;
  fello_email: string | null;
  fello_photo_url: string | null;
  fello_last_login: string | null;
  fello_user_profile_id: number | null;

  // Participant information
  participant_name: string | null;
  participant_email: string | null;
  participant_photo_url: string | null;
  participant_last_login: string | null;
  participant_user_profile_id: number | null;

  cancelled_by_user_profile_id: number | null;
  interaction_finish_date: string | null;
  from_model?: boolean;
  ignore_conversion?: boolean;
}

interface AdminUserListInteractionsResponse {
  items: InteractionEntry[];
  next_token: string | null;
}

// Availabilities Types
interface AvailabilitiesRequestParameters extends BaseRequestParameters {
  week_start_date?: string; // format: YYYY-MM-DD
}

interface AvailabilityTimeSlot {
  id: number;
  start_time: string; // format: HH:mm:ss
  is_interaction_booked: boolean;
  has_passed: boolean;
}

interface AdminAvailabilityResponse {
  availability_items: AvailabilityTimeSlot[][];
}

type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

// API Function Types
type GetFelloGeneralDetails = (
  params: BaseRequestParameters
) => Promise<FelloGeneralResponse>;
type GetFelloVerticals = (
  params: BaseRequestParameters
) => Promise<AdminUserDetailsVerticalsResponse>;
type GetFelloHistory = (
  params: BaseRequestParameters
) => Promise<HistoryEntry[]>;
type GetFelloInteractions = (
  params: InteractionsRequestParameters
) => Promise<AdminUserListInteractionsResponse>;
type GetFelloAvailabilities = (
  params: AvailabilitiesRequestParameters
) => Promise<AdminAvailabilityResponse>;

// Utility Functions
const formatDateString = (date: Date): string =>
  date.toISOString().split('T')[0];

const getDayAvailability = (
  response: AdminAvailabilityResponse,
  dayOfWeek: DayOfWeek
): AvailabilityTimeSlot[] => response.availability_items[dayOfWeek] || [];

const isTimeSlotAvailable = (timeSlot: AvailabilityTimeSlot): boolean =>
  !timeSlot.is_interaction_booked && !timeSlot.has_passed;

const isStatusReason = (value: unknown): value is StatusReason =>
  value !== null &&
  typeof value === 'object' &&
  'reason' in value &&
  'submitting_user_name' in value;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

export type {
  BaseRequestParameters,
  ValidationError,
  ValidationErrorResponse,
  StatusReason,
  Reference,
  FelloGeneralResponse,
  OnboardingAnswerDetail,
  OnboardingAnswer,
  AdminUserDetailsVerticalsResponse,
  HistoryType,
  ChangeValue,
  HistoryEntry,
  InteractionsRequestParameters,
  InteractionStatus,
  InteractionEntry,
  AdminUserListInteractionsResponse,
  AvailabilitiesRequestParameters,
  AvailabilityTimeSlot,
  AdminAvailabilityResponse,
  DayOfWeek,
  GetFelloGeneralDetails,
  GetFelloVerticals,
  GetFelloHistory,
  GetFelloInteractions,
  GetFelloAvailabilities
};

export {
  formatDateString,
  getDayAvailability,
  isTimeSlotAvailable,
  isStatusReason,
  isStringArray
};

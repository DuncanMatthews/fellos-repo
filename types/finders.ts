// Enum types for query parameters
export enum FinderStatus {
  SIGNED_UP = 'signed_up',
  ACTIVE = 'active',
  DEACTIVATED = 'deactivated',
  PENDING_DELETION = 'pending_deletion'
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'non_binary',
  OTHER = 'other',
  DECLINE_TO_STATE = 'decline_to_state'
}

export enum AgeRange {
  EIGHTEEN_TO_THIRTY = '18-30',
  THIRTY_ONE_TO_FORTY = '31-40',
  FORTY_ONE_TO_FIFTY = '41-50',
  FIFTY_ONE_PLUS = '51plus'
}

export enum CriminalOffenses {
  YES = 'yes',
  NO = 'no'
}

export enum Challenges {
  ALCOHOL_USE = 'alcohol_use',
  DRUG_USE = 'drug_use',
  PARENTING = 'parenting',
  RELATIONSHIPS = 'relationships'
}

export enum Rating {
  ONE_TO_THREE = '1-3',
  THREE_TO_FIVE = '3-5',
  NEW = 'new'
}

// Request query parameters interface
export interface FinderQueryParams {
  limit?: number;
  name?: string;
  finder_status?: FinderStatus[];
  gender?: Gender[];
  age?: AgeRange[];
  criminal_offenses?: CriminalOffenses[];
  challenges?: Challenges[];
  rating?: Rating[];
  sort_ordering?: string;
  sort_by?: string;
  token?: string;
}

// Request headers interface
export interface FinderRequestHeaders {
  'x-user-timezone': string;
}

// Response data interfaces
export interface ChangeLogReason {
  reason: string;
  submitting_user_name: string;
}

export interface UserChangeLog {
  from_model: boolean;
  ignore_conversion: boolean;
  type: string;
  old_value: Record<string, number>;
  new_value: Record<string, number>;
  id: number;
  timestamp: string;
  user_id: number;
  field: string;
  reason: ChangeLogReason;
}

export interface PaymentAccount {
  user_id: number;
  account_id: string;
  customer_id: string;
  id: number;
  onboarding_complete: boolean;
}

export interface FinderItem {
  id: number;
  profile_id: number;
  name: string;
  email: string;
  gender: string;
  age: number;
  challenges: string[];
  rating: string;
  date: string;
  criminal_offences: string;
  status: string;
  photo_url: string;
  partner_organization_code: string;
  is_critical_information_modified: boolean;
  is_stripe_onboarding_complete: boolean;
  verticals_for_approval: string[];
  last_admin_profile_verification: string;
  user_change_logs: UserChangeLog[];
  payment_account: PaymentAccount;
}

export interface FinderResponse {
  items: FinderItem[];
  amount: number;
  next_token: string;
}

// Error response interfaces
export interface ValidationErrorDetail {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ValidationErrorResponse {
  detail: ValidationErrorDetail[];
}

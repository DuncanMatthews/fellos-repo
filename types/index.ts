import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export interface FellowChangeLog {
  id: number;
  type: string;
  field: string;
  timestamp: string;
  user_id: number;
  old_value: Record<string, number>;
  new_value: Record<string, number>;
  from_model: boolean;
  ignore_conversion: boolean;
  reason: {
    reason: string;
    submitting_user_name: string;
  };
}

export interface PaymentAccount {
  id: number;
  user_id: number;
  account_id: string;
  customer_id: string;
  onboarding_complete: boolean;
}

export interface Fellow {
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
  user_change_logs: FellowChangeLog[];
  payment_account: PaymentAccount;
}

export interface FellowsResponse {
  items: Fellow[];
  amount: number;
  next_token: string;
}

export interface DashboardFellow {
  id: string;
  name: string;
  email: string;
  status: string;
  rating: string;
  date: string;
  organization: string;
  verificationStatus: string;
  is_critical_information_modified: boolean;
  last_admin_profile_verification: string | null;
  gender: string;
  age: string;
  challenges: string[];
  criminal_offences: string;
  user_change_logs: Array<{
    type: string;
    old_value: any;
    new_value: any;
    timestamp: string;
    reason?: {
      reason: string;
      submitting_user_name: string;
    };
  }>;
  is_stripe_onboarding_complete: boolean;
}

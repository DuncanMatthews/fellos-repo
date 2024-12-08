import {
  CheckCircle,
  Timer,
  CircleOff,
  AlertCircle,
  Search,
  FileQuestion,
  MessageCircle,
  UserCheck,
  Shield,
  GraduationCap,
  UserCircle,
  FileText,
  UserCheck2,
  Power,
  XCircle,
  Trash,
  Users,
  Scale,
  Clock,
  Star
} from 'lucide-react';

export const statuses = [
  {
    value: 'signed_up',
    label: 'Signed Up',
    icon: CheckCircle
  },
  {
    value: 'application_in_progress',
    label: 'Application in Progress',
    icon: Timer
  },
  {
    value: 'stale',
    label: 'Stale',
    icon: AlertCircle
  },
  {
    value: 'pending_application_review',
    label: 'Pending Application Review',
    icon: FileQuestion
  },
  {
    value: 'application_under_review',
    label: 'Application Under Review',
    icon: Search
  },
  {
    value: 'additional_information_needed',
    label: 'Additional Information Needed',
    icon: MessageCircle
  },
  {
    value: 'pending_meet_and_greet',
    label: 'Pending Meet and Greet',
    icon: UserCheck
  },
  {
    value: 'reference_check_required',
    label: 'Reference Check Required',
    icon: UserCheck2
  },
  {
    value: 'background_check_required',
    label: 'Background Check Required',
    icon: Shield
  },
  {
    value: 'training_required',
    label: 'Training Required',
    icon: GraduationCap
  },
  {
    value: 'pending_bio_update',
    label: 'Pending Bio Update',
    icon: UserCircle
  },
  {
    value: 'pending_platform_agreement',
    label: 'Pending Platform Agreement',
    icon: FileText
  },
  {
    value: 'active',
    label: 'Active',
    icon: Power
  },
  {
    value: 'deactivated',
    label: 'Deactivated',
    icon: CircleOff
  },
  {
    value: 'not_proceeding_with_fello',
    label: 'Not Proceeding with Fello',
    icon: XCircle
  },
  {
    value: 'pending_deletion',
    label: 'Pending Deletion',
    icon: Trash
  }
];

export const genderFilters = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Non-binary', label: 'Non-binary' },
  { value: 'Prefer to self-describe', label: 'Self Described' },
  { value: 'Decline to state', label: 'Declined' }
];

export const ageFilters = [
  { value: '18-30', label: '18-30' },
  { value: '31-40', label: '31-40' },
  { value: '41-50', label: '41-50' },
  { value: '51plus', label: '51+' }
];

export const challengesFilters = [
  { value: 'alcohol_use', label: 'Alcohol Use' },
  { value: 'drug_use', label: 'Drug Use' },
  { value: 'parenting', label: 'Parenting' },
  { value: 'relationships', label: 'Relationships' }
];

export const ratingFilters = [
  { value: 'new', label: 'New' },
  { value: '1-3', label: '1-3' },
  { value: '3-5', label: '3-5' }
];

export const offenceFilters = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' }
];

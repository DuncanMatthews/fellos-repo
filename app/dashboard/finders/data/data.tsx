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
    value: 'pending_deletion',
    label: 'Pending Deletion',
    icon: Trash
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
    value: 'pending_review',
    label: 'Pending Review',
    icon: FileQuestion
  },
  {
    value: 'under_review',
    label: 'Under Review',
    icon: Search
  },
  {
    value: 'additional_info_needed',
    label: 'Additional Info Needed',
    icon: MessageCircle
  },
  {
    value: 'pending_verification',
    label: 'Pending Verification',
    icon: UserCheck
  }
];

export const genderFilters = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non_binary', label: 'Non-binary' },
  { value: 'other', label: 'Other' },
  { value: 'decline_to_state', label: 'Declined to State' }
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

export const sortOptions = [
  { value: 'date', label: 'Sign Up Date' },
  { value: 'name', label: 'Name' },
  { value: 'rating', label: 'Rating' },
  { value: 'last_login', label: 'Last Login' }
];

export const filters = [
  {
    id: 'status',
    name: 'Status',
    options: statuses
  },
  {
    id: 'gender',
    name: 'Gender',
    options: genderFilters
  },
  {
    id: 'age',
    name: 'Age',
    options: ageFilters
  },
  {
    id: 'challenges',
    name: 'Challenges',
    options: challengesFilters
  },
  {
    id: 'rating',
    name: 'Rating',
    options: ratingFilters
  },
  {
    id: 'criminal_offences',
    name: 'Criminal Offences',
    options: offenceFilters
  }
];

export type Filter = (typeof filters)[number];

export const tableColumns = [
  { id: 'name', label: 'Name', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'email', label: 'Email', sortable: true },
  { id: 'date', label: 'Sign Up Date', sortable: true },
  { id: 'rating', label: 'Rating', sortable: true },
  { id: 'challenges', label: 'Challenges', sortable: false },
  { id: 'last_login', label: 'Last Login', sortable: true }
];

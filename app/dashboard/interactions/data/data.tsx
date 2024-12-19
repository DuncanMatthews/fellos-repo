import {
  CheckCircle,
  XCircle,
  UserX,
  AlertCircle,
  Clock,
  HeartPulse,
  GlassWater,
  Pill,
  Users,
  Heart,
  Calendar,
  Timer,
  User,
  Mail,
  CalendarClock,
  Clock4,
  Ban,
  History,
  DollarSign,
  LinkIcon
} from 'lucide-react';

// Enhanced status tracking for better accountability
export const interactionStatuses = [
  {
    value: 'completed',
    label: 'Completed',
    icon: CheckCircle,
    description: 'Interaction completed successfully'
  },
  {
    value: 'cancelled_by_admin',
    label: 'Cancelled by Admin',
    icon: XCircle,
    description: 'Cancelled by administrator'
  },
  {
    value: 'cancelled_by_fello',
    label: 'Cancelled by Fello',
    icon: UserX,
    description: 'Fello cancelled the interaction'
  },
  {
    value: 'cancelled_by_participant',
    label: 'Cancelled by Participant',
    icon: UserX,
    description: 'Participant cancelled the interaction'
  },
  {
    value: 'escalated',
    label: 'Escalated',
    icon: AlertCircle,
    description: 'Interaction requires admin attention'
  },
  {
    value: 'upcoming',
    label: 'Upcoming',
    icon: Clock,
    description: 'Scheduled future interaction'
  },
  {
    value: 'no_show_fello',
    label: 'Fello No-Show',
    icon: Ban,
    description: 'Fello did not attend'
  },
  {
    value: 'no_show_participant',
    label: 'Participant No-Show',
    icon: Ban,
    description: 'Participant did not attend'
  }
];

export const verticalFilters = [
  {
    value: 'alcohol_use',
    label: 'Alcohol Use',
    icon: GlassWater
  },
  {
    value: 'drug_use',
    label: 'Drug Use',
    icon: Pill
  },
  {
    value: 'parenting',
    label: 'Parenting',
    icon: Users
  },
  {
    value: 'relationships',
    label: 'Relationships',
    icon: Heart
  }
];

export const durationFilters = [
  { value: '15', label: '15 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '45', label: '45 minutes' },
  { value: '60', label: '60 minutes' },
  { value: '75', label: '75 minutes' }
];

// Enhanced sort options for admin needs
export const sortOptions = [
  { value: 'interaction_start_date', label: 'Start Date' },
  { value: 'created_at', label: 'Created Date' },
  { value: 'interaction_finish_date', label: 'Finish Date' },
  { value: 'duration', label: 'Duration' },
  { value: 'actual_duration', label: 'Actual Duration' },
  { value: 'fello_name', label: 'Fello Name' },
  { value: 'participant_name', label: 'Participant Name' },
  { value: 'is_payment_pending', label: 'Payment Status' }
];

export const filters = [
  {
    id: 'interaction_status',
    name: 'Status',
    options: interactionStatuses
  },
  {
    id: 'verticals',
    name: 'Verticals',
    options: verticalFilters
  },
  {
    id: 'duration',
    name: 'Duration',
    options: durationFilters
  },
  {
    id: 'payment_status',
    name: 'Payment Status',
    options: [
      { value: 'pending', label: 'Payment Pending' },
      { value: 'completed', label: 'Payment Completed' }
    ]
  }
];

export type Filter = (typeof filters)[number];

// Enhanced columns with more admin-relevant information
// Enhanced columns with more admin-relevant information
export const tableColumns = [
  {
    id: 'interaction_start_date',
    label: 'Start Date',
    sortable: true,
    icon: Calendar,
    tooltip: 'Scheduled start time'
  },
  {
    id: 'duration',
    label: 'Scheduled Duration',
    sortable: true,
    icon: Timer,
    tooltip: 'Planned duration of interaction'
  },
  {
    id: 'actual_duration',
    label: 'Actual Duration',
    sortable: true,
    icon: Clock4,
    tooltip: 'Actual time spent in interaction'
  },
  {
    id: 'fello_profile',
    label: 'Fello',
    sortable: true,
    icon: User,
    tooltip: 'Click to view Fello profile',
    isLink: true
  },
  {
    id: 'participant_profile',
    label: 'Participant',
    sortable: true,
    icon: User,
    tooltip: 'Click to view Participant profile',
    isLink: true
  },
  {
    id: 'fello_email',
    label: 'Fello Email',
    sortable: true,
    icon: Mail,
    tooltip: 'Fello email address'
  },
  {
    id: 'participant_email',
    label: 'Participant Email',
    sortable: true,
    icon: Mail,
    tooltip: 'Participant email address'
  },
  {
    id: 'interaction_status',
    label: 'Status',
    sortable: true,
    icon: HeartPulse,
    tooltip: 'Current interaction status'
  },
  {
    id: 'vertical',
    label: 'Vertical',
    sortable: true,
    icon: Users,
    tooltip: 'Interaction category'
  },
  {
    id: 'status_history',
    label: 'Status History',
    sortable: false,
    icon: History,
    tooltip: 'View status change timeline'
  },
  {
    id: 'payment_status',
    label: 'Payment',
    sortable: true,
    icon: DollarSign,
    tooltip: 'Payment status'
  },
  {
    id: 'actions',
    label: 'Actions',
    sortable: false,
    icon: LinkIcon,
    tooltip: 'Available actions'
  }
];

// Helper functions for data formatting and display
export const formatDuration = (minutes: number): string => {
  if (!minutes) return 'N/A';
  if (minutes < 60) {
    return `${minutes}min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0
    ? `${hours}h ${remainingMinutes}min`
    : `${hours}h`;
};

export const formatDateTime = (dateString: string): string => {
  if (!dateString || dateString === '1969-12-31T19:00:00-05:00') return 'N/A';
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    completed: 'bg-green-100 text-green-800',
    cancelled_by_admin: 'bg-red-100 text-red-800',
    cancelled_by_fello: 'bg-orange-100 text-orange-800',
    cancelled_by_participant: 'bg-yellow-100 text-yellow-800',
    escalated: 'bg-purple-100 text-purple-800',
    upcoming: 'bg-blue-100 text-blue-800',
    no_show_fello: 'bg-red-100 text-red-800',
    no_show_participant: 'bg-red-100 text-red-800'
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
};

// Calculate completion rate
export const calculateCompletionRate = (interactions: any[]): string => {
  const completed = interactions.filter(
    (i) => i.interaction_status === 'completed'
  ).length;
  return `${((completed / interactions.length) * 100).toFixed(1)}%`;
};

// Check if interaction was shorter than scheduled
export const wasInteractionShort = (
  scheduled: number,
  actual: number
): boolean => {
  return actual < scheduled * 0.8; // 80% threshold
};

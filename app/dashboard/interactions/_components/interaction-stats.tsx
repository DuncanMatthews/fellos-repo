import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  DollarSign,
  Shield,
  Activity,
  BarChart,
  XCircle
} from 'lucide-react';
import { Interaction } from '../data/schema';

interface StatsCardProps {
  title: string;
  value: string | number;
  Icon: React.ElementType;
  className?: string;
}

const StatsCard = ({ title, value, Icon, className = '' }: StatsCardProps) => (
  <Card className={`h-32 ${className}`}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

interface InteractionsDashboardProps {
  interactions: Interaction[];
}

const InteractionsDashboard = ({
  interactions = []
}: InteractionsDashboardProps) => {
  // Status-based counts
  const completedCount = interactions.filter(
    (i) => i.interaction_status === 'completed'
  ).length;
  const pendingPayments = interactions.filter(
    (i) => i.is_payment_pending
  ).length;
  const escalatedCount = interactions.filter(
    (i) => i.interaction_status === 'escalated'
  ).length;
  const activeCount = interactions.filter(
    (i) => i.interaction_status === 'upcoming'
  ).length;

  const cancelledCount = interactions.filter((i) =>
    [
      'cancelled_by_admin',
      'cancelled_by_fello',
      'cancelled_by_participant'
    ].includes(i.interaction_status)
  ).length;

  const noShowCount = interactions.filter((i) =>
    ['no_show_fello', 'no_show_participant'].includes(i.interaction_status)
  ).length;

  const cancellationRate = interactions.length
    ? ((cancelledCount / interactions.length) * 100).toFixed(1)
    : '0';

  const noShowRate = interactions.length
    ? ((noShowCount / interactions.length) * 100).toFixed(1)
    : '0';

  // Calculate total duration excluding null values
  const totalDuration = interactions.reduce(
    (sum, interaction) => sum + (interaction.actual_duration || 0),
    0
  );

  const averageDuration = interactions.length
    ? Math.round(totalDuration / interactions.length)
    : 0;

  // Calculate unique Fellos and Finders with upcoming interactions
  const fellosWithUpcoming = new Set(
    interactions
      .filter((i) => i.interaction_status === 'upcoming')
      .map((i) => i.fello_user_profile_id)
  ).size;

  const findersWithUpcoming = new Set(
    interactions
      .filter((i) => i.interaction_status === 'upcoming')
      .map((i) => i.participant_user_profile_id)
  ).size;

  // Calculate review required count
  const requiresReviewCount = interactions.filter(
    (i) => i.requires_review
  ).length;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Completed Interactions"
        value={completedCount}
        Icon={CheckCircle}
      />
      <StatsCard
        title="Pending Payments"
        value={pendingPayments}
        Icon={DollarSign}
        className="text-amber-600"
      />
      <StatsCard
        title="Escalated Cases"
        value={escalatedCount}
        Icon={Shield}
        className="text-red-600"
      />
      <StatsCard
        title="Upcoming Sessions"
        value={activeCount}
        Icon={Activity}
      />
      <StatsCard
        title="Needs Review"
        value={requiresReviewCount}
        Icon={AlertCircle}
        className="text-yellow-600"
      />
      <StatsCard
        title="No-Shows"
        value={`${noShowRate}%`}
        Icon={XCircle}
        className="text-red-500"
      />
      <StatsCard
        title="Fellos with Upcoming Sessions"
        value={fellosWithUpcoming}
        Icon={BarChart}
      />
      <StatsCard
        title="Finders with Upcoming Sessions"
        value={findersWithUpcoming}
        Icon={BarChart}
      />
    </div>
  );
};

export default InteractionsDashboard;

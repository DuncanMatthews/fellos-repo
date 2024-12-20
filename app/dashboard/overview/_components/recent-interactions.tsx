import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { Interaction } from '../../interactions/data/schema';

interface RecentInteractionItemProps {
  interaction: Interaction;
}

const RecentInteractionItem = ({ interaction }: RecentInteractionItemProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'upcoming':
        return 'text-blue-600';
      case 'cancelled_by_admin':
      case 'cancelled_by_fello':
      case 'cancelled_by_participant':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage
          src={interaction.fello_photo_url || ''}
          alt={interaction.fello_name}
        />
        <AvatarFallback>{getInitials(interaction.fello_name)}</AvatarFallback>
      </Avatar>

      <div className="ml-4 flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium leading-none">
            {interaction.fello_name}
          </p>
          <span className="text-sm font-medium">
            {formatDistanceToNow(new Date(interaction.interaction_start_date), {
              addSuffix: true
            })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            with {interaction.participant_name}
          </p>
          <span
            className={`text-sm font-medium ${getStatusColor(interaction.interaction_status)}`}
          >
            {interaction.interaction_status.replace(/_/g, ' ')}
          </span>
        </div>
      </div>
    </div>
  );
};

interface RecentInteractionsProps {
  interactions: Interaction[];
}

export function RecentInteractions({ interactions }: RecentInteractionsProps) {
  if (!interactions.length) {
    return (
      <div className="py-4 text-center text-sm text-muted-foreground">
        No recent interactions
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {interactions.map((interaction) => (
        <RecentInteractionItem key={interaction.id} interaction={interaction} />
      ))}
    </div>
  );
}

import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Link2, AlertCircle, Ban, Clock } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import type { InteractionDetailsResponse } from '../../types';

interface Props {
  interactionData: InteractionDetailsResponse;
}

export function InteractionHeader({ interactionData }: Props) {
  const getStatusBadge = (status: string) => {
    const badges = {
      completed: 'bg-green-100 text-green-800',
      upcoming: 'bg-blue-100 text-blue-800',
      escalated: 'bg-yellow-100 text-yellow-800',
      cancelled_by_admin: 'bg-red-100 text-red-800',
      cancelled_by_fello: 'bg-red-100 text-red-800',
      cancelled_by_participant: 'bg-red-100 text-red-800'
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const isUpcoming = interactionData.interaction_status === 'upcoming';
  const isEscalated = interactionData.interaction_status === 'escalated';
  const isShortDuration =
    interactionData.actual_duration &&
    interactionData.actual_duration < interactionData.duration * 0.8;

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold tracking-tight">
            Interaction #{interactionData.id}
          </h1>
          <Badge className={getStatusBadge(interactionData.interaction_status)}>
            {interactionData.interaction_status
              .replace(/_/g, ' ')
              .toUpperCase()}
          </Badge>
          {interactionData.is_payment_pending && (
            <Badge variant="outline" className="bg-orange-100 text-orange-800">
              PAYMENT PENDING
            </Badge>
          )}
          {isShortDuration && (
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
              SHORT DURATION
            </Badge>
          )}
        </div>
        <p className="mt-1 text-muted-foreground">
          {format(new Date(interactionData.interaction_start_date), 'PPP')}
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>

          <DropdownMenuItem>
            <Link2 className="mr-2 h-4 w-4" />
            View Fello Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link2 className="mr-2 h-4 w-4" />
            View Participant Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {isEscalated && (
            <DropdownMenuItem className="text-yellow-600">
              <AlertCircle className="mr-2 h-4 w-4" />
              Review Escalation
            </DropdownMenuItem>
          )}

          {isShortDuration && (
            <DropdownMenuItem className="text-yellow-600">
              <Clock className="mr-2 h-4 w-4" />
              Review Duration
            </DropdownMenuItem>
          )}

          {isUpcoming && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Ban className="mr-2 h-4 w-4" />
                Cancel Interaction
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

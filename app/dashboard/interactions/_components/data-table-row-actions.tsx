'use client';

import { Row } from '@tanstack/react-table';
import {
  MoreHorizontal,
  History,
  AlertCircle,
  Eye,
  Link2,
  Ban,
  MessageSquare,
  Clock,
  DollarSign,
  FileEdit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Interaction } from '../data/schema';
import { useRouter } from 'next/navigation';

interface DataTableRowActionsProps {
  row: Row<Interaction>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const interaction = row.original;

  const isUpcoming = interaction.interaction_status === 'upcoming';
  const isCompleted = interaction.interaction_status === 'completed';
  const isEscalated = interaction.interaction_status === 'escalated';
  const hasPaymentPending = interaction.is_payment_pending;
  const isShortDuration =
    interaction.actual_duration &&
    interaction.actual_duration < interaction.duration * 0.8;

  const router = useRouter();

  const handleInteractionClick = () => {
    router.push(`/dashboard/interactions/${interaction.id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        {/* View Details */}
        <DropdownMenuItem onClick={handleInteractionClick}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>

        {/* Profile Links */}
        <DropdownMenuItem>
          <Link2 className="mr-2 h-4 w-4" />
          View Fello Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link2 className="mr-2 h-4 w-4" />
          View Participant Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Status History */}
        <DropdownMenuItem>
          <History className="mr-2 h-4 w-4" />
          View Status History
          <DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
        </DropdownMenuItem>

        {/* Duration Review */}
        {isShortDuration && (
          <DropdownMenuItem className="text-amber-600">
            <Clock className="mr-2 h-4 w-4" />
            Review Short Duration
          </DropdownMenuItem>
        )}

        {/* Payment Actions */}
        {hasPaymentPending && (
          <DropdownMenuItem>
            <DollarSign className="mr-2 h-4 w-4" />
            Review Payment
          </DropdownMenuItem>
        )}

        {/* Status Management */}
        {isUpcoming && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <FileEdit className="mr-2 h-4 w-4" />
              Edit Interaction
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Ban className="mr-2 h-4 w-4" />
              Cancel Interaction
            </DropdownMenuItem>
          </>
        )}

        {/* Escalation Actions */}
        {isEscalated && (
          <DropdownMenuItem className="text-amber-600">
            <AlertCircle className="mr-2 h-4 w-4" />
            Review Escalation
          </DropdownMenuItem>
        )}

        {/* Add Note */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <MessageSquare className="mr-2 h-4 w-4" />
          Add Admin Note
        </DropdownMenuItem>

        {/* Mark No-Show */}
        {isUpcoming && (
          <DropdownMenuItem className="text-destructive">
            <Ban className="mr-2 h-4 w-4" />
            Mark as No-Show
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

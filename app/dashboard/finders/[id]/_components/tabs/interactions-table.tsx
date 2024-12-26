'use client';

import { useState } from 'react';
import { DataTable } from '@/components/ui/table/data-table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Calendar, User, CreditCard } from 'lucide-react';
import { formatDuration, format } from 'date-fns';
import type { AdminFinderInteractionEntry } from '../../types';
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';

interface InteractionsTableProps {
  data: AdminFinderInteractionEntry[];
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    completed: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
    cancelled_by_admin: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
    cancelled_by_finder: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
    cancelled_by_participant: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
    upcoming: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
    escalated: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
  };
  return colors[status] || 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
};

const getPaymentBadge = (isPending: boolean | null) => {
  if (isPending) {
    return (
      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
        Pending
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="bg-green-500/10 text-green-500">
      Completed
    </Badge>
  );
};

export function InteractionsTable({ data }: InteractionsTableProps) {
  console.log('interactions', data);
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'interaction_start_date', desc: true }
  ]);

  const columns = [
    {
      accessorKey: 'interaction_start_date',
      header: () => (
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Date</span>
        </div>
      ),
      cell: ({ row }) => {
        const value = row.getValue('interaction_start_date') as string;
        const date = new Date(value);
        return (
          <div className="flex flex-col">
            <span className="font-medium">{format(date, 'MMM d, yyyy')}</span>
            <span className="text-sm text-muted-foreground">
              {format(date, 'h:mm a')}
            </span>
          </div>
        );
      }
    },
    {
      accessorKey: 'participant_name',
      header: () => (
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span>Participant</span>
        </div>
      ),
      cell: ({ row }) => {
        const name = row.getValue('participant_name') as string | null;
        const photo = row.original.participant_photo_url;
        const email = row.original.participant_email;

        return (
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={photo || ''} alt={name || 'Participant'} />
              <AvatarFallback>
                {name ? name.charAt(0).toUpperCase() : 'P'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{name || 'N/A'}</span>
              {email && (
                <span className="text-sm text-muted-foreground">{email}</span>
              )}
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: 'interaction_status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('interaction_status') as string;
        return (
          <Badge
            variant="outline"
            className={`${getStatusColor(status)} capitalize`}
          >
            {status.replace(/_/g, ' ')}
          </Badge>
        );
      }
    },
    {
      accessorKey: 'duration',
      header: () => (
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>Duration</span>
        </div>
      ),
      cell: ({ row }) => {
        const duration = row.getValue('duration') as number;
        const actualDuration = row.original.actual_duration;

        const minutes = actualDuration ?? duration;
        const durationObj = {
          hours: Math.floor(minutes / 60),
          minutes: minutes % 60
        };

        const formattedDuration = formatDuration(durationObj);

        return (
          <div className="flex flex-col">
            <span>{formattedDuration}</span>
            {actualDuration && actualDuration !== duration && (
              <span className="text-sm text-muted-foreground">
                (Planned: {duration} min)
              </span>
            )}
          </div>
        );
      }
    },
    {
      accessorKey: 'is_payment_pending',
      header: () => (
        <div className="flex items-center space-x-2">
          <CreditCard className="h-4 w-4" />
          <span>Payment</span>
        </div>
      ),
      cell: ({ row }) => {
        const isPending = row.getValue('is_payment_pending') as boolean | null;
        return getPaymentBadge(isPending);
      }
    }
  ] satisfies ColumnDef<AdminFinderInteractionEntry, unknown>[];

  const totalItems = data.length;
  const pageSizeOptions = [10, 20, 50];

  return (
    <DataTable<AdminFinderInteractionEntry, unknown>
      columns={columns}
      data={data}
      totalItems={totalItems}
      pageSizeOptions={pageSizeOptions}
    />
  );
}

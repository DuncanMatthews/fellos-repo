'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Interaction } from '../data/schema';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from './data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { DataTableRowActions } from './data-table-row-actions';
import { History, Clock, AlertCircle, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

export const columns: ColumnDef<Interaction>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'interaction_start_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <div className="font-medium">
          {new Date(row.getValue('interaction_start_date')).toLocaleString(
            'en-US',
            {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          Duration: {row.original.duration}min
        </div>
      </div>
    )
  },
  {
    accessorKey: 'fello_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fello" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage
            src={row.original.fello_photo_url || ''}
            alt={row.getValue('fello_name')}
          />
          <AvatarFallback>
            {String(row.getValue('fello_name')).charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="link" className="p-0">
                  <div className="font-medium">
                    {row.getValue('fello_name')}
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Click to view Fello profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="text-xs text-muted-foreground">
            {row.original.fello_email}
          </div>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'participant_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Participant" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage
            src={row.original.participant_photo_url || ''}
            alt={row.getValue('participant_name')}
          />
          <AvatarFallback>
            {String(row.getValue('participant_name')).charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="link" className="p-0">
                  <div className="font-medium">
                    {row.getValue('participant_name')}
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Click to view Participant profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="text-xs text-muted-foreground">
            {row.original.participant_email}
          </div>
        </div>
      </div>
    )
  },

  {
    accessorKey: 'interaction_status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('interaction_status') as string;

      const getStatusBadgeColor = (status: string) => {
        switch (status) {
          case 'completed':
            return 'bg-green-100 text-green-800';
          case 'cancelled_by_admin':
            return 'bg-red-100 text-red-800';
          case 'cancelled_by_fello':
            return 'bg-orange-100 text-orange-800';
          case 'cancelled_by_participant':
            return 'bg-yellow-100 text-yellow-800';
          case 'escalated':
            return 'bg-purple-100 text-purple-800';
          case 'upcoming':
            return 'bg-blue-100 text-blue-800';
          case 'no_show_fello':
            return 'bg-red-100 text-red-800';
          case 'no_show_participant':
            return 'bg-red-100 text-red-800';
          default:
            return 'bg-gray-100 text-gray-800';
        }
      };

      const status_history = row.original.status_history || [];

      return (
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className={getStatusBadgeColor(status)}>
            {status.replace(/_/g, ' ')}
          </Badge>
          {status_history.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <History className="h-4 w-4" />
                  {status_history.length > 1 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] text-white">
                      {status_history.length}
                    </span>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Status History</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {status_history.map((change, i) => (
                    <div key={i} className="flex justify-between border-b pb-2">
                      <div>
                        <Badge
                          variant="outline"
                          className={getStatusBadgeColor(change.to_status)}
                        >
                          {change.from_status} → {change.to_status}
                        </Badge>
                        {change.reason && (
                          <div className="mt-1 text-sm text-muted-foreground">
                            Reason: {change.reason}
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(change.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'vertical',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vertical" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.getValue('vertical')?.toString().replace(/_/g, ' ') || 'N/A'}
      </Badge>
    )
  },
  {
    accessorKey: 'actual_duration',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => {
      const scheduled = row.original.duration;
      const actual = row.getValue('actual_duration') as number;
      const isShort = actual && actual < scheduled * 0.8;

      return (
        <div className="flex items-center space-x-2">
          <Badge variant={isShort ? 'destructive' : 'outline'}>
            {actual || 0}min
          </Badge>
          {isShort && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <AlertCircle className="h-4 w-4 text-destructive" />
                </TooltipTrigger>
                <TooltipContent>
                  Interaction shorter than scheduled ({scheduled}min)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'is_payment_pending',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={row.getValue('is_payment_pending') ? 'destructive' : 'default'}
      >
        {row.getValue('is_payment_pending') ? 'Pending' : 'Completed'}
      </Badge>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];

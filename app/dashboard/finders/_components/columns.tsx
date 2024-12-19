'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Finder } from '../data/schema';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from './data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { DataTableRowActions } from './data-table-row-actions';
import { History, CreditCard, Phone } from 'lucide-react';
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

export const columns: ColumnDef<Finder>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Finder" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage
            src={row.original.photo_url || ''}
            alt={row.getValue('name')}
          />
          <AvatarFallback>
            {String(row.getValue('name')).charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{row.getValue('name') || 'N/A'}</div>
          <div className="text-sm text-muted-foreground">
            {row.original.email}
          </div>
        </div>
        {row.original.is_critical_information_modified && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="destructive">Modified</Badge>
              </TooltipTrigger>
              <TooltipContent>
                Critical information has been modified
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const logs =
        row.original.user_change_logs?.filter((log) => log.type === 'status') ??
        [];

      const getStatusBadgeColor = (status: string | null) => {
        switch (status?.toLowerCase()) {
          case 'active':
            return 'bg-green-100 text-green-800';
          case 'deactivated':
            return 'bg-red-100 text-red-800';
          case 'signed_up':
            return 'bg-blue-100 text-blue-800';
          case 'pending_deletion':
            return 'bg-yellow-100 text-yellow-800';
          case 'background_check_required':
            return 'bg-purple-100 text-purple-800';
          case 'training_required':
            return 'bg-indigo-100 text-indigo-800';
          case 'additional_info_needed':
            return 'bg-orange-100 text-orange-800';
          default:
            return 'bg-gray-100 text-gray-800';
        }
      };

      return (
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className={getStatusBadgeColor(status)}>
            {status || 'pending'}
          </Badge>
          {logs.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <History className="h-4 w-4" />
                  {logs.length > 1 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] text-white">
                      {logs.length}
                    </span>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    <span>Status History</span>
                    <Badge variant="secondary">{logs.length} changes</Badge>
                  </DialogTitle>
                </DialogHeader>
                <div className="max-h-[60vh] space-y-4 overflow-y-auto">
                  {logs.map((log, i) => (
                    <div key={i} className="relative border-b pb-4 text-sm">
                      {i === 0 && (
                        <Badge
                          className="absolute -top-2 right-0"
                          variant="secondary"
                        >
                          Latest
                        </Badge>
                      )}
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="font-medium">Status Change</div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="outline"
                              className={getStatusBadgeColor(
                                String(log.old_value)
                              )}
                            >
                              {typeof log.old_value === 'string'
                                ? log.old_value
                                : JSON.stringify(log.old_value) || 'None'}
                            </Badge>
                            <span>→</span>
                            <Badge
                              variant="outline"
                              className={getStatusBadgeColor(
                                String(log.new_value)
                              )}
                            >
                              {typeof log.new_value === 'string'
                                ? log.new_value
                                : JSON.stringify(log.new_value) || 'None'}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right text-muted-foreground">
                          <div>ID: {log.id}</div>
                          <div>User: {log.user_id}</div>
                          <div className="text-xs">
                            {new Date(log.timestamp).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                      {log.reason && (
                        <div className="mt-2 rounded-md bg-muted/50 p-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">
                              Changed by: {log.reason.submitting_user_name}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Reason: {log.reason.reason}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id))
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue('rating') || 'New'}</Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sign Up Date" />
    ),
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.getValue('date')).toLocaleDateString()}
      </div>
    )
  },
  {
    accessorKey: 'is_stripe_onboarding_complete',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.is_stripe_onboarding_complete ? 'default' : 'outline'
        }
      >
        <CreditCard className="mr-2 h-4 w-4" />
        {row.original.is_stripe_onboarding_complete ? 'Complete' : 'Pending'}
      </Badge>
    )
  },
  {
    accessorKey: 'challenges',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Challenges" />
    ),
    cell: ({ row }) => {
      const challenges = row.getValue('challenges') as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {challenges.map((challenge) => (
            <Badge key={challenge} variant="outline">
              {challenge}
            </Badge>
          ))}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const challenges = row.getValue(id) as string[];
      return value.some((v: string) => challenges.includes(v));
    }
  },
  {
    accessorKey: 'age',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
    cell: ({ row }) => <div>{row.getValue('age') || 'N/A'}</div>,
    filterFn: (row, columnId, value) => {
      const age = row.getValue(columnId) as number;
      if (!age) return false;
      if (value.includes('18-30')) return age >= 18 && age <= 30;
      if (value.includes('31-40')) return age >= 31 && age <= 40;
      if (value.includes('41-50')) return age >= 41 && age <= 50;
      if (value.includes('51plus')) return age >= 51;
      return false;
    }
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => <div>{row.getValue('gender') || 'N/A'}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'criminal_offences',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criminal Offences" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={
          row.getValue('criminal_offences') === 'no' ? 'outline' : 'destructive'
        }
      >
        {row.getValue('criminal_offences') === 'no' ? 'No' : 'Yes'}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];

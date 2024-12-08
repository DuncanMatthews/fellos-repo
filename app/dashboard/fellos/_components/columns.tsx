'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Fellow } from '../data/schema';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from './data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { DataTableRowActions } from './data-table-row-actions';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  History,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

export const columns: ColumnDef<Fellow>[] = [
  // Selection column
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

  // Primary Information
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <span className="font-medium">{row.getValue('name') || 'N/A'}</span>
        {row.original.is_critical_information_modified && (
          <Badge variant="destructive">Modified</Badge>
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
        row.original.user_change_logs?.filter((log) => log.type === 'status') ||
        [];

      return (
        <div className="flex items-center space-x-2">
          <Badge
            variant="outline"
            className={
              status === 'active'
                ? 'bg-green-100 text-green-800'
                : status === 'inactive'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
            }
          >
            {status || 'pending'}
          </Badge>
          {logs?.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <History className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Status History</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  {logs.map((log, i) => (
                    <div key={i} className="border-b pb-2 text-sm">
                      <div className="flex justify-between">
                        <span>
                          {log.old_value} → {log.new_value}
                        </span>
                        <span className="text-muted-foreground">
                          {new Date(log.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      {log.reason && (
                        <p className="mt-1 text-muted-foreground">
                          Reason: {log.reason.reason}
                        </p>
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
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },

  // Verification & Payments
  {
    accessorKey: 'verificationStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Verification" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Badge
          variant={
            row.getValue('verificationStatus') === 'Verified'
              ? 'default'
              : 'secondary'
          }
        >
          {row.getValue('verificationStatus')}
        </Badge>
        {row.original.last_admin_profile_verification && (
          <span className="text-xs text-muted-foreground">
            {new Date(
              row.original.last_admin_profile_verification
            ).toLocaleDateString()}
          </span>
        )}
      </div>
    )
  },
  {
    accessorKey: 'is_stripe_onboarding_complete',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payments" />
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

  // Contact & Personal Info
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div>{row.getValue('email')}</div>
  },
  {
    accessorKey: 'challenges',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Challenges" />
    ),
    enableHiding: true,
    cell: ({ row }) => {
      const challenges = row.getValue('challenges') as string[];
      return challenges?.join(', ') || '-';
    },
    filterFn: (row, id, value) => {
      const challenges = row.getValue(id) as string[];
      return value.some((v: string) => challenges?.includes(v));
    }
  },
  {
    accessorKey: 'age',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
    filterFn: (row, columnId, value) => {
      const age = parseInt(row.getValue(columnId), 10);
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
    enableHiding: true,
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
      <div>{row.getValue('criminal_offences') === 'no' ? 'No' : 'Yes'}</div>
    ),
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },

  // Actions column always last
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];

'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Table } from '@tanstack/react-table';
import { Settings2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

const columnLabels: Record<string, string> = {
  interaction_start_date: 'Start Time',
  interaction_end_date: 'End Time',
  duration: 'Scheduled Duration',
  actual_duration: 'Actual Duration',
  interaction_status: 'Status',
  vertical: 'Vertical',
  fello_name: 'Fello Name & Email',
  participant_name: 'Participant Name & Email',
  is_payment_pending: 'Payment Status',
  created_at: 'Created Date',
  interaction_finish_date: 'Finish Time',
  cancelled_by_user_profile_id: 'Cancelled By'
};

export function DataTableViewOptions<TData>({
  table
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <Settings2 className="mr-2 h-4 w-4" />
          View Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Visible Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' &&
              column.getCanHide() &&
              column.id !== 'select' &&
              column.id !== 'actions'
          )
          .map((column) => {
            // Group related columns
            const isTimeColumn =
              column.id.includes('_date') || column.id.includes('duration');
            const isUserColumn =
              column.id.includes('name') || column.id.includes('email');
            const className = `capitalize ${isTimeColumn ? 'text-blue-600' : ''} ${isUserColumn ? 'text-green-600' : ''}`;

            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className={className}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {columnLabels[column.id] || column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

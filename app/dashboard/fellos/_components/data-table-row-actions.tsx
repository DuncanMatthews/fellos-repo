'use client';

import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Fellow, fellowSchema } from '../data/schema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends Fellow>({
  row
}: DataTableRowActionsProps<TData>) {
  const safeData = {
    ...row.original,
    is_critical_information_modified:
      row.original.is_critical_information_modified ?? false,
    is_stripe_onboarding_complete:
      row.original.is_stripe_onboarding_complete ?? false,
    user_change_logs: row.original.user_change_logs ?? []
  };

  const fellow = fellowSchema.parse(safeData);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>View Profile</DropdownMenuItem>
        <DropdownMenuItem>Edit Details</DropdownMenuItem>
        <DropdownMenuItem>View Change History</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Verify Profile</DropdownMenuItem>
        <DropdownMenuItem>Update Status</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          Deactivate
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

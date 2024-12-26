'use client';

import { Row } from '@tanstack/react-table';
import { MoreHorizontal, History, Shield, UserX } from 'lucide-react';
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
import { Finder } from '../data/schema';
import { useRouter } from 'next/navigation';

interface DataTableRowActionsProps {
  row: Row<Finder>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const finder = row.original;
  const isActive = finder.status === 'active';
  const needsBackgroundCheck =
    !finder.criminal_offences || finder.status === 'background_check_required';
  const hasModifiedInfo = finder.is_critical_information_modified;

  const router = useRouter();

  const handleFinderClick = () => {
    router.push(`/dashboard/finders/${finder.id}`);
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
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        {/* View and Edit Actions */}

        <DropdownMenuItem onClick={handleFinderClick}>
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem>Edit Details</DropdownMenuItem>

        {/* History and Verification */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <History className="mr-2 h-4 w-4" />
          View Changes
        </DropdownMenuItem>

        {hasModifiedInfo && (
          <DropdownMenuItem className="text-amber-600">
            Review Modified Info
          </DropdownMenuItem>
        )}

        {/* Background Check */}
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={!needsBackgroundCheck}>
          <Shield className="mr-2 h-4 w-4" />
          Request Background Check
          {needsBackgroundCheck && (
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          )}
        </DropdownMenuItem>

        {/* Status Management */}
        <DropdownMenuItem disabled={!isActive}>Update Status</DropdownMenuItem>

        {/* Payment Related */}
        {!finder.is_stripe_onboarding_complete && (
          <DropdownMenuItem>Review Payment Setup</DropdownMenuItem>
        )}

        {/* Danger Zone */}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" disabled={!isActive}>
          <UserX className="mr-2 h-4 w-4" />
          Deactivate Account
          {isActive && <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

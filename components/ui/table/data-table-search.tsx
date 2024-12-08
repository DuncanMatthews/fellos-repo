'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

interface DataTableSearchProps {
  searchKey: string;
  searchQuery: string;
  setSearchQuery: (value: string | null) => void;
  setPage: (value: number) => void;
}

export function DataTableSearch({
  searchKey,
  searchQuery,
  setSearchQuery,
  setPage
}: DataTableSearchProps) {
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    startTransition(() => {
      setSearchQuery(value);
      setPage(1);
    });
  };

  return (
    <Input
      placeholder={`Search ${searchKey}...`}
      value={searchQuery ?? ''}
      onChange={(e) => handleSearch(e.target.value)}
      className={cn('w-full md:max-w-sm', isPending && 'animate-pulse')}
    />
  );
}

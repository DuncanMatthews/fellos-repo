'use client';

import * as React from 'react';
import { Column } from '@tanstack/react-table';
import { Check, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  type?: 'single' | 'multi';
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  type = 'multi',
  options
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = React.useMemo(() => {
    if (!column) return new Map<string, number>();

    const facetMap = new Map<string, number>();
    const rows = column.getFacetedRowModel().rows;

    rows.forEach((row) => {
      const value = row.getValue(column.id);

      if (column.id === 'age') {
        // Handle age ranges
        const age = value as number;
        if (age >= 18 && age <= 30)
          facetMap.set('18-30', (facetMap.get('18-30') || 0) + 1);
        if (age >= 31 && age <= 40)
          facetMap.set('31-40', (facetMap.get('31-40') || 0) + 1);
        if (age >= 41 && age <= 50)
          facetMap.set('41-50', (facetMap.get('41-50') || 0) + 1);
        if (age >= 51)
          facetMap.set('51plus', (facetMap.get('51plus') || 0) + 1);
      } else if (Array.isArray(value)) {
        // Handle array values (like challenges)
        value.forEach((v) => {
          facetMap.set(v, (facetMap.get(v) || 0) + 1);
        });
      } else {
        // Handle single values
        const v = value as string;
        if (v) facetMap.set(v, (facetMap.get(v) || 0) + 1);
      }
    });

    return facetMap;
  }, [column]);

  const selectedValues = new Set(column?.getFilterValue() as string[]);

  const handleSelect = (value: string) => {
    if (type === 'single') {
      column?.setFilterValue([value]);
    } else {
      const updatedValues = new Set(selectedValues);
      if (updatedValues.has(value)) {
        updatedValues.delete(value);
      } else {
        updatedValues.add(value);
      }
      const filterValues = Array.from(updatedValues);
      column?.setFilterValue(filterValues.length ? filterValues : undefined);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {selectedValues.size}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                const recordCount = facets.get(option.value) ?? 0;

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    <span className="ml-auto flex h-4 items-center justify-center text-xs text-muted-foreground">
                      {recordCount}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

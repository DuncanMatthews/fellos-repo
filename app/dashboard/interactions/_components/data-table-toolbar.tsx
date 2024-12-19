'use client';

import { Table } from '@tanstack/react-table';
import { X, SlidersHorizontal, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';
import {
  interactionStatuses,
  verticalFilters,
  durationFilters,
  sortOptions
} from '../data/data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { addDays } from 'date-fns';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search interactions..."
            value={
              (table.getColumn('fello_name')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('fello_name')?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          <Select
            value={table.getState().sorting[0]?.id}
            onValueChange={(value) => {
              table.setSorting([
                {
                  id: value,
                  desc: ['interaction_start_date', 'created_at'].includes(value)
                }
              ]);
            }}
          >
            <SelectTrigger className="h-8 w-[130px]">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <DatePickerWithRange
                initialDateFrom={addDays(new Date(), -30)}
                initialDateTo={new Date()}
                onDateChange={(range) => {
                  table
                    .getColumn('interaction_start_date')
                    ?.setFilterValue(range);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <DataTableViewOptions table={table} />
      </div>

      <div className="flex flex-wrap gap-2">
        {table.getColumn('interaction_status') && (
          <DataTableFacetedFilter
            column={table.getColumn('interaction_status')}
            title="Status"
            options={interactionStatuses}
          />
        )}
        {table.getColumn('vertical') && (
          <DataTableFacetedFilter
            column={table.getColumn('vertical')}
            title="Vertical"
            options={verticalFilters}
          />
        )}
        {table.getColumn('actual_duration') && (
          <DataTableFacetedFilter
            column={table.getColumn('actual_duration')}
            title="Duration"
            type="single"
            options={durationFilters}
          />
        )}
        {table.getColumn('is_payment_pending') && (
          <DataTableFacetedFilter
            column={table.getColumn('is_payment_pending')}
            title="Payment Status"
            type="single"
            options={[
              { value: 'true', label: 'Pending' },
              { value: 'false', label: 'Completed' }
            ]}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

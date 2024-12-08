'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';
import {
  statuses,
  genderFilters,
  ageFilters,
  challengesFilters,
  ratingFilters,
  offenceFilters
} from '../data/data';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 overflow-x-auto">
        <Input
          placeholder="Filter fellows..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn('gender') && (
          <DataTableFacetedFilter
            column={table.getColumn('gender')}
            title="Gender"
            type="single"
            options={genderFilters}
          />
        )}
        {table.getColumn('age') && (
          <DataTableFacetedFilter
            column={table.getColumn('age')}
            title="Age"
            type="single"
            options={ageFilters}
          />
        )}
        {table.getColumn('challenges') && (
          <DataTableFacetedFilter
            column={table.getColumn('challenges')}
            title="Challenges"
            type="multi"
            options={challengesFilters}
          />
        )}
        {table.getColumn('rating') && (
          <DataTableFacetedFilter
            column={table.getColumn('rating')}
            title="Rating"
            type="single"
            options={ratingFilters}
          />
        )}
        {table.getColumn('criminal_offences') && (
          <DataTableFacetedFilter
            column={table.getColumn('criminal_offences')}
            title="Offences"
            type="single"
            options={offenceFilters}
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
      <DataTableViewOptions table={table} />
    </div>
  );
}

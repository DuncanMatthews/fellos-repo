'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

interface CalendarDateRangePickerProps {
  className?: string;
  value?: {
    from: Date;
    to: Date;
  };
  onChange?: (date: { from: Date; to: Date }) => void;
}

export function CalendarDateRangePicker({
  className,
  value,
  onChange
}: CalendarDateRangePickerProps) {
  // Use internal state if not controlled
  const [internalDate, setInternalDate] = React.useState<DateRange | undefined>(
    {
      from: value?.from || new Date(),
      to: value?.to || new Date()
    }
  );

  // Use value prop if provided, otherwise use internal state
  const date = value ? { from: value.from, to: value.to } : internalDate;

  const handleSelect = (newDate: DateRange | undefined) => {
    if (newDate?.from && newDate?.to) {
      // If controlled, call onChange
      if (onChange) {
        onChange({ from: newDate.from, to: newDate.to });
      } else {
        // Otherwise update internal state
        setInternalDate(newDate);
      }
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[260px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

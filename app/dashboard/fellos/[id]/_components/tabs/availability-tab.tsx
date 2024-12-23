import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  Clock,
  CalendarDays,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import type { AvailabilityTimeSlot } from '../../types';

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

interface TimeSlotProps {
  slot: AvailabilityTimeSlot;
  formatTime: (time: string) => string;
}

const TimeSlot = ({ slot, formatTime }: TimeSlotProps) => {
  const getSlotStatus = () => {
    if (slot.is_interaction_booked)
      return {
        icon: <CheckCircle2 className="h-4 w-4" />,
        label: 'Booked',
        variant: 'default' as const,
        description: 'This time slot is booked'
      };
    if (slot.has_passed)
      return {
        icon: <XCircle className="h-4 w-4" />,
        label: 'Passed',
        variant: 'secondary' as const,
        description: 'This time slot has passed'
      };
    return {
      icon: <Clock className="h-4 w-4" />,
      label: 'Available',
      variant: 'outline' as const,
      description: 'This time slot is available'
    };
  };

  const status = getSlotStatus();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <Badge
              variant={status.variant}
              className="flex cursor-default items-center gap-1.5 px-2 py-1"
            >
              {status.icon}
              {formatTime(slot.start_time)}
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{status.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface DayColumnProps {
  day: string;
  slots: AvailabilityTimeSlot[];
  formatTime: (time: string) => string;
}

const DayColumn = ({ day, slots, formatTime }: DayColumnProps) => {
  const groupedSlots = slots.reduce(
    (acc, slot) => {
      const hour = slot.start_time.split(':')[0];
      if (!acc[hour]) acc[hour] = [];
      acc[hour].push(slot);
      return acc;
    },
    {} as Record<string, AvailabilityTimeSlot[]>
  );

  return (
    <div className="flex-1">
      <div className="rounded-t-lg bg-muted/50 p-2">
        <h3 className="text-center text-sm font-medium">{day}</h3>
      </div>
      <div className="min-h-[100px] space-y-4 border-x p-3">
        {Object.entries(groupedSlots).map(([hour, hourSlots]) => (
          <div key={`${day}-${hour}`} className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatTime(`${hour}:00`)}
            </div>
            <div className="space-y-1.5 pl-5">
              {hourSlots.map((slot) => (
                <TimeSlot
                  key={`${day}-${slot.id}-${slot.start_time}`}
                  slot={slot}
                  formatTime={formatTime}
                />
              ))}
            </div>
          </div>
        ))}
        {Object.keys(groupedSlots).length === 0 && (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No availability
          </div>
        )}
      </div>
    </div>
  );
};

interface AvailabilityTabProps {
  data: AvailabilityTimeSlot[][];
}

export default function AvailabilityTab({ data = [] }: AvailabilityTabProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Weekly Availability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>No availability data for this week</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':');
    return new Date(
      0,
      0,
      0,
      parseInt(hours),
      parseInt(minutes)
    ).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Weekly Availability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] rounded-lg">
          <div className="flex min-w-[800px] gap-2">
            {DAYS.map((day, index) => (
              <DayColumn
                key={day}
                day={day}
                slots={data[index] || []}
                formatTime={formatTime}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

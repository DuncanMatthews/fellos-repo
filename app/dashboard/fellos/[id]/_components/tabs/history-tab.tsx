import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { HistoryEntry, ChangeValue, StatusReason } from '../../types';

interface HistoryTabProps {
  data: HistoryEntry[];
}

const formatChangeValue = (value: ChangeValue): string => {
  if (value === null) return 'none';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object' && 'reason' in value) {
    return `${value.reason || 'No reason'} (${value.submitting_user_name || 'Unknown user'})`;
  }
  return String(value);
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function HistoryTab({ data }: HistoryTabProps) {
  const renderChangeMessage = (entry: HistoryEntry) => {
    switch (entry.type) {
      case 'status':
        return (
          <>
            Status changed from{' '}
            <strong>{formatChangeValue(entry.old_value)}</strong> to{' '}
            <strong>{formatChangeValue(entry.new_value)}</strong>
          </>
        );

      case 'profile':
        return (
          <>
            Profile field <strong>{entry.field}</strong> changed from{' '}
            <strong>{formatChangeValue(entry.old_value)}</strong> to{' '}
            <strong>{formatChangeValue(entry.new_value)}</strong>
          </>
        );

      case 'vertical':
        const action = entry.old_value ? 'updated' : 'added';
        return (
          <>
            Vertical was {action}:{' '}
            <strong>{formatChangeValue(entry.new_value)}</strong>
          </>
        );

      default:
        return 'Unknown change type';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Status History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-8">
            {data.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start space-x-4 border-b pb-6 last:border-0"
              >
                <div className="w-36 flex-shrink-0">
                  <time className="text-sm text-muted-foreground">
                    {formatDate(entry.timestamp)}
                  </time>
                </div>
                <div className="flex-1 space-y-1.5">
                  <p className="text-sm">{renderChangeMessage(entry)}</p>
                  {entry.reason && (
                    <p className="text-sm text-muted-foreground">
                      Reason: {entry.reason.reason || 'No reason provided'}{' '}
                      {entry.reason.submitting_user_name && (
                        <>by {entry.reason.submitting_user_name}</>
                      )}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

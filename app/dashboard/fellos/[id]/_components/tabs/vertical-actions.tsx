'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { removeVertical } from '../../_actions';
import { toast } from '@/hooks/use-toast';

interface VerticalActionsProps {
  verticalId: string;
  fellowId: string;
}

const VERTICAL_LABELS: Record<string, string> = {
  parenting: 'Parenting',
  alcohol_use: 'Alcohol Use',
  drug_use: 'Drug Use',
  relationships: 'Relationships'
};

export function VerticalActions({
  verticalId,
  fellowId
}: VerticalActionsProps) {
  const handleRemove = async () => {
    try {
      await removeVertical(fellowId, verticalId);
      toast({
        title: 'Vertical removed',
        description: `Removed ${VERTICAL_LABELS[verticalId] || verticalId.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}`
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove vertical',
        variant: 'destructive'
      });
    }
  };

  const getVerticalLabel = (id: string): string => {
    return (
      VERTICAL_LABELS[id] ||
      id.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    );
  };

  return (
    <div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
      <div>
        <h3 className="font-medium">{getVerticalLabel(verticalId)}</h3>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRemove}
        className="hover:text-destructive"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

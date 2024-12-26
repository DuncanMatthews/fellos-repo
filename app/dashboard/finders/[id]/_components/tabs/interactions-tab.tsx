'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InteractionsTable } from './interactions-table';
import { InteractionsTableSkeleton } from './interactions-loading';
import type { AdminFinderInteractionEntry } from '../../types';
import { Suspense } from 'react';

interface InteractionsTabProps {
  data: AdminFinderInteractionEntry[];
}

export default function InteractionsTab({ data }: InteractionsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactions History</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<InteractionsTableSkeleton />}>
          <InteractionsTable data={data} />
        </Suspense>
      </CardContent>
    </Card>
  );
}

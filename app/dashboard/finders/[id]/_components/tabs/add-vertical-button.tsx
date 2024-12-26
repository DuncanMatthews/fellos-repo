// app/dashboard/fellos/[id]/_components/tabs/add-vertical-button.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function AddVerticalButton({ fellowId }: { fellowId: string }) {
  return (
    <Button size="sm">
      <Plus className="mr-2 h-4 w-4" />
      Add Vertical
    </Button>
  );
}

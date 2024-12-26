'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  retry?: () => void;
}

export function ErrorState({
  title = 'Error',
  message = 'Something went wrong',
  retry
}: ErrorStateProps) {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="mt-2">
          {message}
          {retry && (
            <Button variant="outline" className="mt-4 w-full" onClick={retry}>
              Try again
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}

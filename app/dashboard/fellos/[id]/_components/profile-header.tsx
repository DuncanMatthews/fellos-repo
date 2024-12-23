import { Card } from '@/components/ui/card';
import { UserCheck, AlertTriangle } from 'lucide-react';
import StatusChangeButton from './status-change-button';
import { FelloGeneralResponse } from '@/app/dashboard/fellos/[id]/types';

export default function ProfileHeader({
  fellowData
}: {
  fellowData: FelloGeneralResponse;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          {fellowData.full_name}
          {fellowData.status_reason && fellowData.status_reason.reason ? (
            <UserCheck className="h-5 w-5 text-green-500" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          )}
        </h2>
        <p className="text-muted-foreground">
          Fellow since{' '}
          {new Date(fellowData.application_date).toLocaleDateString()}
        </p>
      </div>
      <StatusChangeButton
        currentStatus={fellowData.status}
        fellowId={fellowData.id}
      />
    </div>
  );
}

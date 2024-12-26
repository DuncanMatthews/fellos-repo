import { Card } from '@/components/ui/card';
import { UserCheck, AlertTriangle } from 'lucide-react';
import StatusChangeButton from './status-change-button';
import { AdminFinderDetailsGeneralResponse } from '@/app/dashboard/finders/[id]/types';

export default function ProfileHeader({
  finderData
}: {
  finderData: AdminFinderDetailsGeneralResponse;
}) {
  const registrationDate = finderData.registration_date
    ? new Date(finderData.registration_date).toLocaleDateString()
    : 'N/A';

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          {finderData.full_name}
          {finderData.status_reason && finderData.status_reason.reason ? (
            <UserCheck className="h-5 w-5 text-green-500" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          )}
        </h2>
        <p className="text-muted-foreground">Finder since {registrationDate}</p>
      </div>
      <StatusChangeButton
        currentStatus={finderData.status}
        finderId={finderData.id}
      />
    </div>
  );
}

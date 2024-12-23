import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { api } from '@/lib/server-api';
import ProfileHeader from './_components/profile-header';
import ProfileTabs from './_components/profile-tabs';
import { getWeekStartDate } from '@/lib/utils';
import { getFelloData } from './_actions';
import type {
  FelloGeneralResponse,
  AdminUserDetailsVerticalsResponse,
  HistoryEntry,
  InteractionEntry,
  AvailabilityTimeSlot,
  AdminAvailabilityResponse
} from './types';

// Page-specific type for aggregated fello data
interface FelloData {
  general: FelloGeneralResponse;
  verticals: AdminUserDetailsVerticalsResponse;
  history: HistoryEntry[];
  interactions: InteractionEntry[];
  availabilities: AdminAvailabilityResponse | null;
}

interface PageParams {
  params: Promise<{ id: string }>;
}

export default async function FelloProfilePage({ params }: PageParams) {
  const { id } = await params;
  const data = await getFelloData(id);

  if (!data) {
    return <div>Fello not found</div>;
  }

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <ProfileHeader fellowData={data.general} />
      <ProfileTabs
        general={data.general}
        verticals={data.verticals}
        history={data.history}
        interactions={data.interactions}
        availabilities={data.availabilities ?? []}
      />
    </div>
  );
}

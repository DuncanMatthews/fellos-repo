import { redirect } from 'next/navigation';
import ProfileHeader from './_components/profile-header';
import ProfileTabs from './_components/profile-tabs';
import { getFinderData } from './_actions';
import type {
  AdminFinderDetailsGeneralResponse,
  AdminFinderVerticalsResponse,
  AdminFinderHistoryEntry,
  AdminFinderInteractionEntry
} from './types';

interface FinderData {
  general: AdminFinderDetailsGeneralResponse;
  verticals: AdminFinderVerticalsResponse;
  history: AdminFinderHistoryEntry[];
  interactions: AdminFinderInteractionEntry[];
}

interface PageParams {
  params: Promise<{ id: string }>;
}

export default async function FinderProfilePage({ params }: PageParams) {
  const { id } = await params;
  const data = await getFinderData(id);

  console.log('finders', data);

  if (!data) {
    return <div>Finder not found</div>;
  }

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <ProfileHeader finderData={data.general} />
      <ProfileTabs
        general={data.general}
        verticals={data.verticals}
        history={data.history}
        interactions={data.interactions}
      />
    </div>
  );
}

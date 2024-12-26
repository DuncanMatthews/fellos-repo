import { redirect } from 'next/navigation';
import { getInteractionData } from './_actions';
import type { InteractionDetailsResponse } from './types';
import { InteractionHeader } from './_components/tabs/InteractionHeader';
import { InteractionTabs } from './_components/tabs/InteractionTabs';
import { InteractionSidebar } from './_components/tabs/InteractionSidebar';

interface InteractionData {
  details: InteractionDetailsResponse;
}

interface PageParams {
  params: Promise<{ id: string }>;
}

export default async function InteractionPage({ params }: PageParams) {
  const { id } = await params;
  const data = await getInteractionData(id);

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-muted-foreground">Interaction not found</p>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex flex-1 flex-col space-y-8 p-8">
        <InteractionHeader interactionData={data.details} />
        <InteractionTabs details={data.details} />
      </div>

      {/* Sidebar */}
      <InteractionSidebar details={data.details} />
    </div>
  );
}

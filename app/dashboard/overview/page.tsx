import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { api } from '@/lib/server-api';
import OverViewPage from './_components/overview';
import { Fellow, FellosResponse } from '../fellos/data/schema';
import { Finder, FindersResponse } from '../finders/data/schema';
import { Interaction, InteractionsResponse } from '../interactions/data/schema';

export const metadata: Metadata = {
  title: 'Dashboard : Overview'
};

async function getFellos(): Promise<Fellow[]> {
  try {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');
    const response = await api.get<FellosResponse>(
      '/api/admin/fellos/?limit=1000'
    );
    return response?.items || [];
  } catch (error) {
    console.error('Error fetching fellos:', error);
    return [];
  }
}

async function getFinders(): Promise<Finder[]> {
  try {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');
    const response = await api.get<FindersResponse>(
      '/api/admin/finders/?limit=1000'
    );
    return response?.items || [];
  } catch (error) {
    console.error('Error fetching finders:', error);
    return [];
  }
}

async function getInteractions(): Promise<Interaction[]> {
  try {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');
    const response = await api.get<InteractionsResponse>(
      '/api/admin/interactions/?limit=1000'
    );
    return response?.items || [];
  } catch (error) {
    console.error('Error fetching interactions:', error);
    return [];
  }
}

function calculateAnalytics(
  fellos: Fellow[],
  finders: Finder[],
  interactions: Interaction[]
) {
  const activeFellos = fellos.filter((f) => f.status === 'active').length;
  const activeFinders = finders.filter((f) => f.status === 'active').length;

  const completedInteractions = interactions.filter(
    (i) => i.interaction_status === 'completed'
  ).length;

  const cancelledInteractions = interactions.filter((i) =>
    i.interaction_status.startsWith('cancelled_')
  ).length;

  const cancellationRate = interactions.length
    ? ((cancelledInteractions / interactions.length) * 100).toFixed(1)
    : '0';

  // Get the date range for the current period (last 30 days)
  const now = new Date();
  const periodStart = new Date(now.setDate(now.getDate() - 30))
    .toISOString()
    .split('T')[0];
  const periodEnd = new Date().toISOString().split('T')[0];

  return {
    totalFellos: fellos.length,
    activeFellos,
    totalFinders: finders.length,
    activeFinders,
    totalInteractions: interactions.length,
    completedInteractions,
    cancellationRate,
    periodStart,
    periodEnd
  };
}

export default async function Page() {
  // Check authentication first
  const session = await auth();
  if (!session) redirect('/api/auth/signin');

  try {
    // Fetch data in parallel
    const [fellos, finders, interactions] = await Promise.all([
      getFellos(),
      getFinders(),
      getInteractions()
    ]);

    // Calculate analytics from the fetched data
    const analytics = calculateAnalytics(fellos, finders, interactions);

    return (
      <OverViewPage
        fellos={fellos}
        finders={finders}
        interactions={interactions}
        analytics={analytics}
      />
    );
  } catch (error) {
    console.error('Error loading overview page:', error);
    // You might want to add error UI handling here
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold text-red-500">
          Error loading dashboard data
        </h2>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    );
  }
}

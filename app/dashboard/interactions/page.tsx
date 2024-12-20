import { Metadata } from 'next';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { api } from '@/lib/server-api';
import {
  Interaction,
  InteractionQuery,
  InteractionsResponse
} from './data/schema';
import InteractionsDashboard from './_components/interaction-stats';

export const metadata: Metadata = {
  title: 'Interactions Dashboard',
  description:
    'Monitor and manage interaction sessions between fellos and participants'
};

async function getInteractions(): Promise<Interaction[]> {
  try {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    // Get current date
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));

    // Construct URL with query parameters
    const queryParams = new URLSearchParams({
      limit: '500',
      start_date: thirtyDaysAgo.toISOString(),
      end_date: new Date().toISOString()
    }).toString();

    const response = await api.get<InteractionsResponse>(
      `/api/admin/interactions/?${queryParams}`
    );

    return response?.items || [];
  } catch (error) {
    console.error('Error fetching interactions:', error);
    return [];
  }
}

export default async function InteractionsPage() {
  const interactions: Interaction[] = await getInteractions();

  // Calculate counts
  const completedCount = interactions.filter(
    (i) => i.interaction_status === 'completed'
  ).length;
  const pendingPayments = interactions.filter(
    (i) => i.is_payment_pending
  ).length;
  const escalatedCount = interactions.filter(
    (i) => i.interaction_status === 'escalated'
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Interactions</h2>
      </div>

      <InteractionsDashboard interactions={interactions} />

      {/* Main Data Table */}
      <DataTable data={interactions} columns={columns} />
    </div>
  );
}

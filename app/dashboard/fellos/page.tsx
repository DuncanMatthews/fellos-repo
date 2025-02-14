import { Metadata } from 'next';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { api } from '@/lib/server-api';
import { Fellow, FellosResponse } from './data/schema';
import StatsCards from './_components/stats-card';

async function getFellos(): Promise<Fellow[]> {
  try {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    console.log('sessions', session);

    const response = await api.get<FellosResponse>(
      '/api/admin/fellos/?limit=1000'
    );

    return response?.items || [];
  } catch (error) {
    console.error('Error fetching fellos:', error);
    return [];
  }
}

export default async function FellowPage() {
  const fellos = await getFellos();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Fellos Dashboard
          </h2>
          <p className="text-muted-foreground">
            Manage and monitor fellow profiles
          </p>
        </div>
      </div>
      <StatsCards fellos={fellos} />
      <DataTable data={fellos} columns={columns} />
    </div>
  );
}

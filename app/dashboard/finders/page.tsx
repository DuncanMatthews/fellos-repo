import { Metadata } from 'next';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { api } from '@/lib/server-api';
import { Finder, FindersResponse } from './data/schema';
import FinderStatsCards from './_components/finder-stats';

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

export default async function FindersPage() {
  const finders = await getFinders();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Finders Dashboard
          </h2>
          <p className="text-muted-foreground">
            Manage and monitor finder profiles
          </p>
        </div>
      </div>
      <FinderStatsCards finders={finders} />
      <DataTable data={finders} columns={columns} />
    </div>
  );
}

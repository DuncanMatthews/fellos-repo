import { Metadata } from 'next';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { api } from '@/lib/server-api';
import { Fellow, FellowsResponse } from './data/schema';

async function getFellows(): Promise<Fellow[]> {
  try {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    const response = await api.get<FellowsResponse>(
      '/api/admin/fellos/?limit=10'
    );
    return response?.items || [];
  } catch (error) {
    console.error('Error fetching fellows:', error);
    return [];
  }
}

export default async function FellowPage() {
  const fellows = await getFellows();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Fellows Dashboard
          </h2>
          <p className="text-muted-foreground">
            Manage and monitor fellow profiles
          </p>
        </div>
      </div>
      <DataTable data={fellows} columns={columns} />
    </div>
  );
}

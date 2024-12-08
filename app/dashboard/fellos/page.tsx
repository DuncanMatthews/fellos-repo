import { Metadata } from 'next';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { api } from '@/lib/server-api';
import { DashboardFellow, Fellow, FellowsResponse } from '@/types';

function transformFellowToDashboard(fellow: Fellow): DashboardFellow {
  return {
    id: fellow.id.toString(),
    name: fellow.name,
    email: fellow.email,
    status: fellow.status,
    rating: fellow.rating,
    date: new Date(fellow.date).toLocaleDateString(),
    organization: fellow.partner_organization_code,
    verificationStatus: fellow.last_admin_profile_verification
      ? 'Verified'
      : 'Pending',
    is_critical_information_modified: fellow.is_critical_information_modified,
    gender: fellow.gender,
    age: fellow.age?.toString(),
    challenges: fellow.challenges,
    criminal_offences: fellow.criminal_offences,
    last_admin_profile_verification: fellow.last_admin_profile_verification,
    user_change_logs: fellow.user_change_logs,
    is_stripe_onboarding_complete: fellow.is_stripe_onboarding_complete
  };
}

async function getFellows(): Promise<DashboardFellow[]> {
  try {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    const response = await api.get<FellowsResponse>(
      '/api/admin/fellos/?limit=10'
    );
    if (!response?.items) return [];
    return response.items.map(transformFellowToDashboard);
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

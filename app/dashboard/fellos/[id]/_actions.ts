'use server';

import { api } from '@/lib/server-api';
import { revalidatePath } from 'next/cache';
import { getWeekStartDate } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import type {
  FelloGeneralResponse,
  AdminUserDetailsVerticalsResponse,
  HistoryEntry,
  AdminUserListInteractionsResponse,
  AdminAvailabilityResponse
} from './types';

// Common response type for actions
interface ActionResponse {
  success: boolean;
  error?: unknown;
}

// Full data response type
interface FelloDataResponse {
  general: FelloGeneralResponse;
  verticals: AdminUserDetailsVerticalsResponse;
  history: HistoryEntry[];
  interactions: AdminUserListInteractionsResponse['items'];
  availabilities: AdminAvailabilityResponse['availability_items'] | null;
}

export async function getFelloData(
  id: string
): Promise<FelloDataResponse | null> {
  try {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    const weekStartDate = getWeekStartDate();

    const [general, verticals, history, interactions, availabilities] =
      await Promise.all([
        api.get<FelloGeneralResponse>(`/api/admin/fellos/${id}/general`),
        api.get<AdminUserDetailsVerticalsResponse>(
          `/api/admin/fellos/${id}/verticals`
        ),
        api.get<HistoryEntry[]>(`/api/admin/fellos/${id}/history`),
        api.get<AdminUserListInteractionsResponse>(
          `/api/admin/fellos/${id}/interactions`,
          { params: { limit: 20 } }
        ),
        api.get<AdminAvailabilityResponse>(
          `/api/admin/fellos/${id}/availabilities`,
          { params: { week_start_date: weekStartDate } }
        )
      ]);

    return {
      general,
      verticals,
      history,
      interactions: interactions.items,
      availabilities: availabilities.availability_items ?? null
    };
  } catch (error) {
    console.error('Error fetching fellow data:', error);
    return null;
  }
}

export async function changeStatus(
  fellowId: string,
  newStatus: string
): Promise<ActionResponse> {
  try {
    await api.patch<void, { status: string }>(
      `/api/admin/fellos/${fellowId}/change-status`,
      { data: { status: newStatus } }
    );
    revalidatePath(`/dashboard/fellos/${fellowId}`);
    return { success: true };
  } catch (error) {
    console.error('Error changing status:', error);
    return { success: false, error };
  }
}

export async function updateStatusReason(
  fellowId: string,
  reason: string
): Promise<ActionResponse> {
  try {
    await api.patch<void, { reason: string }>(
      `/api/admin/fellos/${fellowId}/change-status-reason`,
      { data: { reason } }
    );
    revalidatePath(`/dashboard/fellos/${fellowId}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating status reason:', error);
    return { success: false, error };
  }
}

export async function updateVerification(
  fellowId: string,
  verified: boolean
): Promise<ActionResponse> {
  try {
    await api.patch<void, { verified: boolean }>(
      `/api/admin/fellos/${fellowId}/set-profile-verification`,
      { data: { verified } }
    );
    revalidatePath(`/dashboard/fellos/${fellowId}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating verification:', error);
    return { success: false, error };
  }
}

export async function removeVertical(
  fellowId: string,
  verticalId: string
): Promise<ActionResponse> {
  try {
    await api.delete<void>(
      `/api/admin/fellos/${fellowId}/verticals/${verticalId}`
    );
    revalidatePath(`/dashboard/fellos/${fellowId}`);
    return { success: true };
  } catch (error) {
    console.error('Error removing vertical:', error);
    return { success: false, error };
  }
}

export async function addVertical(
  fellowId: string,
  verticalId: string
): Promise<ActionResponse> {
  try {
    await api.post<void>(
      `/api/admin/fellos/${fellowId}/verticals/${verticalId}`,
      { data: {} } // Empty object as requested
    );
    revalidatePath(`/dashboard/fellos/${fellowId}`);
    return { success: true };
  } catch (error) {
    console.error('Error adding vertical:', error);
    return { success: false, error };
  }
}

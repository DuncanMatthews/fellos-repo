'use server';

import { api } from '@/lib/server-api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import type {
  AdminFinderDetailsGeneralResponse,
  AdminFinderVerticalsResponse,
  AdminFinderHistoryEntry,
  AdminFinderInteractionsResponse,
  AdminFinderInteractionEntry
} from './types';

interface ActionResponse {
  success: boolean;
  error?: unknown;
}

interface FinderDataResponse {
  general: AdminFinderDetailsGeneralResponse;
  verticals: AdminFinderVerticalsResponse;
  history: AdminFinderHistoryEntry[];
  interactions: AdminFinderInteractionEntry[];
}

export async function getFinderData(
  id: string
): Promise<FinderDataResponse | null> {
  try {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    const [general, verticals, history, interactions] = await Promise.all([
      api.get<AdminFinderDetailsGeneralResponse>(
        `/api/admin/finders/${id}/general`
      ),
      api.get<AdminFinderVerticalsResponse>(
        `/api/admin/finders/${id}/verticals`
      ),
      api.get<AdminFinderHistoryEntry[]>(`/api/admin/finders/${id}/history`),
      api.get<AdminFinderInteractionsResponse>(
        `/api/admin/finders/${id}/interactions`,
        {
          params: { limit: 20 }
        }
      )
    ]);

    return {
      general,
      verticals,
      history,
      interactions: interactions.items
    };
  } catch (error) {
    console.error('Error fetching finder data:', error);
    return null;
  }
}

export async function changeStatus(
  finderId: string,
  newStatus: string
): Promise<ActionResponse> {
  try {
    await api.patch<void, { status: string }>(
      `/api/admin/finders/${finderId}/change-status`,
      { data: { status: newStatus } }
    );
    revalidatePath(`/dashboard/finders/${finderId}`);
    return { success: true };
  } catch (error) {
    console.error('Error changing status:', error);
    return { success: false, error };
  }
}

export async function updateStatusReason(
  finderId: string,
  reason: string
): Promise<ActionResponse> {
  try {
    await api.patch<void, { reason: string }>(
      `/api/admin/finders/${finderId}/change-status-reason`,
      { data: { reason } }
    );
    revalidatePath(`/dashboard/finders/${finderId}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating status reason:', error);
    return { success: false, error };
  }
}

export async function deleteFinder(finderId: string): Promise<ActionResponse> {
  try {
    await api.delete<void>(`/api/admin/finders/${finderId}`);
    revalidatePath('/dashboard/finders');
    return { success: true };
  } catch (error) {
    console.error('Error deleting finder:', error);
    return { success: false, error };
  }
}

export async function removeVertical(
  finderId: string,
  verticalId: string
): Promise<ActionResponse> {
  try {
    await api.delete<void>(
      `/api/admin/finders/${finderId}/verticals/${verticalId}`
    );
    revalidatePath(`/dashboard/finders/${finderId}`);
    return { success: true };
  } catch (error) {
    console.error('Error removing vertical:', error);
    return { success: false, error };
  }
}

export async function updateFinderData(
  finderId: string,
  data: Partial<AdminFinderDetailsGeneralResponse>
): Promise<ActionResponse> {
  try {
    await api.patch<void>(`/api/admin/finders/${finderId}`, { data });
    revalidatePath(`/dashboard/finders/${finderId}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating finder data:', error);
    return { success: false, error };
  }
}

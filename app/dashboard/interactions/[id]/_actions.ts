'use server';

import { api } from '@/lib/server-api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import type { InteractionDetailsResponse, InteractionParams } from './types';

interface ActionResponse {
  success: boolean;
  error?: unknown;
}

interface InteractionDataResponse {
  details: InteractionDetailsResponse;
}

export async function getInteractionData(
  id: string
): Promise<InteractionDataResponse | null> {
  try {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    const details = await api.get<InteractionDetailsResponse>(
      `/api/admin/interactions/${id}/details`
    );

    return { details };
  } catch (error) {
    console.error('Error fetching interaction data:', error);
    return null;
  }
}

export async function cancelInteraction(
  interactionId: string
): Promise<ActionResponse> {
  try {
    await api.patch<void>(`/api/admin/interactions/${interactionId}/cancel`);
    revalidatePath(`/dashboard/interactions/${interactionId}`);
    return { success: true };
  } catch (error) {
    console.error('Error canceling interaction:', error);
    return { success: false, error };
  }
}

export async function updateInteractionDetails(
  interactionId: string,
  data: Partial<InteractionDetailsResponse>
): Promise<ActionResponse> {
  try {
    await api.patch<void>(`/api/admin/interactions/${interactionId}`, { data });
    revalidatePath(`/dashboard/interactions/${interactionId}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating interaction details:', error);
    return { success: false, error };
  }
}

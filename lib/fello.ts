// lib/api/fello.ts
import { Fellow, FellowsResponse } from '@/app/dashboard/fellos/data/schema';
import { auth } from '@/auth';
import {
  FelloGeneral,
  FelloVertical,
  HistoryEntry,
  Interaction
} from '@/types/fellow';
import { redirect } from 'next/navigation';
import { api } from './server-api';

// Interactions response type
interface InteractionsResponse {
  items: Interaction[];
  next_token?: string;
}

// Your existing getFellows function
export async function getFellows(): Promise<Fellow[]> {
  try {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    const response = await api.get<FellowsResponse>(
      '/api/admin/fellos/?limit=10'
    );
    return response?.items || [];
  } catch (error) {
    console.log('Error fetching fellows:', error);
    return [];
  }
}

// New functions using your types
export async function getFelloGeneral(
  felloId: string | number
): Promise<FelloGeneral | null> {
  try {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    const response = await api.get<FelloGeneral>(
      `/api/admin/fellos/${felloId}/general`
    );
    return response || null;
  } catch (error) {
    console.log(`Error fetching fello ${felloId} general details:`, error);
    return null;
  }
}

export async function getFelloVerticals(
  felloId: string | number
): Promise<FelloVertical | null> {
  try {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    const response = await api.get<FelloVertical>(
      `/api/admin/fellos/${felloId}/verticals`
    );
    return response || null;
  } catch (error) {
    console.log(`Error fetching fello ${felloId} verticals:`, error);
    return null;
  }
}

export async function getFelloHistory(
  felloId: string | number
): Promise<HistoryEntry[]> {
  try {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    const response = await api.get<HistoryEntry[]>(
      `/api/admin/fellos/${felloId}/history`
    );
    return response || [];
  } catch (error) {
    console.log(`Error fetching fello ${felloId} history:`, error);
    return [];
  }
}

interface GetInteractionsParams {
  limit?: number;
  nameOrEmail?: string;
  interactionStatus?: (
    | 'cancelled_by_admin'
    | 'cancelled_by_fello'
    | 'cancelled_by_participant'
    | 'completed'
    | 'escalated'
    | 'upcoming'
  )[];
  sortOrdering?: 'asc' | 'desc';
  sortBy?: string;
  token?: string;
}

export async function getFelloInteractions(
  felloId: string | number,
  params: GetInteractionsParams = {}
): Promise<InteractionsResponse> {
  try {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    const queryParams = new URLSearchParams();

    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.nameOrEmail)
      queryParams.append('name_or_email', params.nameOrEmail);
    if (params.interactionStatus?.length) {
      params.interactionStatus.forEach((status) =>
        queryParams.append('interaction_status', status)
      );
    }
    if (params.sortOrdering)
      queryParams.append('sort_ordering', params.sortOrdering);
    if (params.sortBy) queryParams.append('sort_by', params.sortBy);
    if (params.token) queryParams.append('token', params.token);

    const response = await api.get<InteractionsResponse>(
      `/api/admin/fellos/${felloId}/interactions?${queryParams.toString()}`
    );
    return response || { items: [] };
  } catch (error) {
    console.log(`Error fetching fello ${felloId} interactions:`, error);
    return { items: [] };
  }
}

// Utility function to fetch all fello data at once
export async function getAllFelloData(felloId: string | number) {
  try {
    const session = await auth();
    if (!session) redirect('/api/auth/signin');

    const [general, verticals, history, interactions] = await Promise.all([
      getFelloGeneral(felloId),
      getFelloVerticals(felloId),
      getFelloHistory(felloId),
      getFelloInteractions(felloId, { limit: 10 })
    ]);

    return {
      general,
      verticals,
      history,
      interactions: interactions.items
    };
  } catch (error) {
    console.log(`Error fetching all fello ${felloId} data:`, error);
    return {
      general: null,
      verticals: null,
      history: [],
      interactions: []
    };
  }
}

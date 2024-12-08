import { auth } from '@/auth';

async function getAuthHeaders() {
  const session = await auth();

  if (!session?.accessToken) {
    throw new Error('No access token available');
  }

  return new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session.accessToken}`,
    'x-user-timezone': 'America/New_York'
  });
}

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const headers = await getAuthHeaders();

    const response = await fetch(`${baseURL}${endpoint}`, {
      ...options,
      headers,
      cache: options.cache || 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export const api = {
  get: <T>(endpoint: string) =>
    fetchWithAuth(endpoint, { method: 'GET' }) as Promise<T>,

  post: <T>(endpoint: string, data: any) =>
    fetchWithAuth(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    }) as Promise<T>,

  put: <T>(endpoint: string, data: any) =>
    fetchWithAuth(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    }) as Promise<T>,

  delete: <T>(endpoint: string) =>
    fetchWithAuth(endpoint, { method: 'DELETE' }) as Promise<T>
};

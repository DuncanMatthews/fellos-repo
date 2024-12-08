// lib/client-api.ts
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('x-user-timezone', 'America/New_York');
  // Use environment variable or get from auth context
  headers.set('Authorization', `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`);

  const url = new URL(`/api/admin/fellos`, 'https://dev.myfello.info');
  const searchParams = new URLSearchParams(endpoint.split('?')[1]);
  searchParams.forEach((value, key) => url.searchParams.append(key, value));

  try {
    const response = await fetch(url.toString(), {
      ...options,
      headers,
      mode: 'cors',
      cache: 'no-store'
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || `API error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export const clientApi = {
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

import { auth } from '@/auth';

// Extended RequestInit type with optional params
interface ExtendedRequestInit extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

async function getAuthHeaders() {
  const session = await auth();
  if (!session?.accessToken) {
    console.log('No access token available');
  }
  return new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session?.accessToken}`,
    'x-user-timezone': 'America/New_York'
  });
}

export async function fetchWithAuth<T>(
  endpoint: string,
  options: ExtendedRequestInit = {}
): Promise<T> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const headers = await getAuthHeaders();

    // Handle query parameters if they exist
    let url = `${baseURL}${endpoint}`;
    if (options.params) {
      const searchParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
      url += `?${searchParams.toString()}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
      cache: options.cache || 'no-store'
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.log('API error response:', responseText);
      console.log(`API error: ${response.status}`);
      throw new Error(`API error: ${response.status}`);
    }

    // Only try to parse as JSON if we have content
    if (responseText) {
      try {
        return JSON.parse(responseText) as T;
      } catch (e) {
        console.log('Error parsing JSON:', e);
        console.log('Response text:', responseText);
        throw new Error('Invalid JSON response from server');
      }
    }

    return null as T;
  } catch (error) {
    console.log('Fetch error:', error);
    throw error;
  }
}

// Type for request options including query parameters
interface RequestOptions<TData = unknown>
  extends Omit<ExtendedRequestInit, 'body'> {
  data?: TData;
  params?: Record<string, string | number | boolean>;
}

// API client with proper typing
export const api = {
  get: <T>(endpoint: string, options: Omit<RequestOptions, 'data'> = {}) =>
    fetchWithAuth<T>(endpoint, {
      method: 'GET',
      ...options
    }),

  post: <T, TData = unknown>(
    endpoint: string,
    { data, ...options }: RequestOptions<TData> = {}
  ) =>
    fetchWithAuth<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options
    }),

  put: <T, TData = unknown>(
    endpoint: string,
    { data, ...options }: RequestOptions<TData> = {}
  ) =>
    fetchWithAuth<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options
    }),

  patch: <T, TData = unknown>(
    endpoint: string,
    { data, ...options }: RequestOptions<TData> = {}
  ) =>
    fetchWithAuth<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options
    }),

  delete: <T>(endpoint: string, options: Omit<RequestOptions, 'data'> = {}) =>
    fetchWithAuth<T>(endpoint, {
      method: 'DELETE',
      ...options
    })
};

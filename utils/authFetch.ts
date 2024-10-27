import { AuthStorage } from "./storage";

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function authFetch(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { requireAuth = true, ...fetchOptions } = options;
  
  if (requireAuth) {
    const token = AuthStorage.getToken();
    
    if (!token) {
      throw new Error('No authentication token available');
    }
    
    fetchOptions.headers = {
      ...fetchOptions.headers,
      'Authorization': `Bearer ${token}`
    };
  }
  
  const response = await fetch(url, fetchOptions);
  
  if (response.status === 401) {
    const data = await response.json();
    
    if (data.code === 'auth/token-expired' || data.code === 'auth/id-token-expired') {
      AuthStorage.clearToken();
      window.location.href = '/login?error=session_expired';
    }
  }
  
  return response;
}

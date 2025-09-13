const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  headers: Record<string, string> = {}
): Promise<T> {
  const token = localStorage.getItem('token');
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...headers,
    },
  };

  if (data) {
    config.body = data instanceof FormData ? data : JSON.stringify(data);
    if (data instanceof FormData) {
      delete (config.headers as any)['Content-Type'];
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Request failed');
  }

  return response.status === 204 ? {} as T : response.json();
}

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  const { url } = await apiRequest<{ url: string }>('/upload', 'POST', formData);
  return url;
}

export async function uploadFiles(files: File[]): Promise<string[]> {
  return Promise.all(files.map(uploadFile));
}

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function apiFetch(path: string, token: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      authorization: `Bearer ${token}`,
      ...options.headers, // caller can override/add headers
    },
  });
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
  return res.json();
}
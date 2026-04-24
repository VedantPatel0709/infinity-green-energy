const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  get: async (endpoint: string) => {
    const token = localStorage.getItem('userInfo');
    const parsed = token ? JSON.parse(token) : null;

    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        Authorization: parsed ? `Bearer ${parsed.token}` : "",
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "GET failed");

    return data;
  },

  post: async (endpoint: string, body: any) => {
    const token = localStorage.getItem('userInfo');
    const parsed = token ? JSON.parse(token) : null;

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: parsed ? `Bearer ${parsed.token}` : "",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "POST failed");

    return data;
  }
};
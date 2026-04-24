const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type UserInfo = {
  token?: string;
};

const getUser = (): UserInfo | null => {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem("userInfo");
  return raw ? JSON.parse(raw) : null;
};

const handleResponse = async (res: Response) => {
  const data = await res.json();

  if (!res.ok) {
    const message =
      typeof data === "object" && data !== null && "message" in data
        ? (data as { message: string }).message
        : "Request failed";

    throw new Error(message);
  }

  return data;
};

export const api = {
  get: async (endpoint: string) => {
    const user = getUser();

    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        Authorization: user?.token ? `Bearer ${user.token}` : "",
      },
    });

    return handleResponse(res);
  },

  post: async (endpoint: string, body: Record<string, unknown>) => {
    const user = getUser();

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.token ? `Bearer ${user.token}` : "",
      },
      body: JSON.stringify(body),
    });

    return handleResponse(res);
  },

  put: async (endpoint: string, body: Record<string, unknown>) => {
    const user = getUser();

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.token ? `Bearer ${user.token}` : "",
      },
      body: JSON.stringify(body),
    });

    return handleResponse(res);
  },

  delete: async (endpoint: string) => {
    const user = getUser();

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: user?.token ? `Bearer ${user.token}` : "",
      },
    });

    return handleResponse(res);
  },
};
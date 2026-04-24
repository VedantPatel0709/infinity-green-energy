const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

type UserInfo = {
  token?: string;
};

export const api = {
  get: async (endpoint: string) => {
    const raw =
      typeof window !== "undefined"
        ? localStorage.getItem("userInfo")
        : null;

    const user: UserInfo | null = raw ? JSON.parse(raw) : null;

    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        Authorization: user?.token ? `Bearer ${user.token}` : "",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      const message =
        typeof data === "object" && data !== null && "message" in data
          ? (data as { message: string }).message
          : "GET failed";

      throw new Error(message);
    }

    return data;
  },

  post: async (endpoint: string, body: Record<string, unknown>) => {
    const raw =
      typeof window !== "undefined"
        ? localStorage.getItem("userInfo")
        : null;

    const user: UserInfo | null = raw ? JSON.parse(raw) : null;

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.token ? `Bearer ${user.token}` : "",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      const message =
        typeof data === "object" && data !== null && "message" in data
          ? (data as { message: string }).message
          : "POST failed";

      throw new Error(message);
    }

    return data;
  },
};
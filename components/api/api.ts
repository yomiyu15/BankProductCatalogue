export const BASE_URL = "http://10.12.53.34:5000/api";

// Return type explicitly set to Record<string, string> for headers
export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  get: async (path: string) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) throw new Error(`GET ${path} failed: ${response.status}`);
    return response.json();
  },

  post: async (path: string, body: any) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`POST ${path} failed: ${response.status}`);
    return response.json();
  },

  put: async (path: string, body: any) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`PUT ${path} failed: ${response.status}`);
    return response.json();
  },

  delete: async (path: string) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "DELETE",
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (response.status === 204) return null; // no content
    if (response.headers.get("content-type")?.includes("application/json")) {
      return response.json();
    }
    if (!response.ok) throw new Error(`DELETE ${path} failed: ${response.status}`);
    return null;
  },
};

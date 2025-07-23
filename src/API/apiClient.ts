import Cookies from "js-cookie";

export async function apiClient(endpoint: string, options: RequestInit = {}) {
    const accessToken = Cookies.get("accessToken");

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    const config = {
        ...options,
        headers,
    };

    const response = await fetch(endpoint, config);

    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
}

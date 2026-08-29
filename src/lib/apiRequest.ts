type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function apiRequest<T>(
  method: HttpMethod,
  url: string,
  body?: unknown,
): Promise<T> {
  const init: RequestInit = { method };

  if (body) {
    init.headers = { "Content-Type": "application/json" };
    init.body = JSON.stringify(body);
  }

  const response = await fetch(url, init);
  const data = (await response.json().catch(() => ({}))) as {
    message?: string;
  };

  if (!response.ok) {
    throw new Error(data.message ?? `Request failed with ${response.status}`);
  }

  return data as T;
}

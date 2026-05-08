async function refreshToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/token/refresh/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      },
    );

    if (!response.ok) throw new Error("Refresh failed");

    const data = await response.json();
    localStorage.setItem("access", data.access);
    return data.access;
  } catch (err) {
    // 'err' をコンソールに出力して使用するように修正
    console.error("Token refresh error:", err);
    localStorage.clear();
    return null;
  }
}

export async function authenticatedFetch(
  url: string,
  options: RequestInit = {},
) {
  const token = localStorage.getItem("access");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  let response = await fetch(url, { ...options, headers });

  // 401 Unauthorized の場合、トークンリフレッシュを試みる
  if (response.status === 401) {
    console.log("401 detected, attempting refresh...");
    const newToken = await refreshToken();
    if (newToken) {
      // 新しいトークンで再試行
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${newToken}`,
      };
      response = await fetch(url, { ...options, headers: retryHeaders });
    }
  }

  return response;
}

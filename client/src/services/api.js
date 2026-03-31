const DEFAULT_BASE_URL = "https://api.globaleducationawards.in/api";

function getBaseUrl() {
  // Prefer explicit API base URL if provided
  const fromEnv =
    typeof import.meta !== "undefined"
      ? import.meta.env?.VITE_API_BASE_URL || import.meta.env?.VITE_API_URL
      : undefined;

  const raw = (fromEnv || DEFAULT_BASE_URL).replace(/\/$/, "");

  const normalized = raw.endsWith("/api") ? raw.slice(0, -4) : raw;

  return normalized;
}

export async function request(path, { method = "GET", token, body, baseUrl } = {}) {
  const finalBaseUrl = baseUrl || getBaseUrl();
  const url = `${finalBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = {};

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body instanceof FormData ? body : (body ? JSON.stringify(body) : undefined),
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const message = data?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}

/* ---------------- Auth ---------------- */
export function registerUser(payload) {
  return request("/api/auth/register", { method: "POST", body: payload });
}

export function verifyOTP(payload) {
  return request("/api/auth/verify-otp", { method: "POST", body: payload });
}

export function resendOTP(payload) {
  return request("/api/auth/resend-otp", { method: "POST", body: payload });
}

export const googleLoginUrl = `${getBaseUrl()}/api/auth/google`;

export function loginUser(payload) {
  return request("/api/auth/login", { method: "POST", body: payload });
}

export function forgotPassword(payload) {
  return request("/api/auth/forgot-password", { method: "POST", body: payload });
}

export function resetPassword(payload) {
  return request("/api/auth/reset-password", { method: "POST", body: payload });
}

export function adminLogin(payload) {
  return request("/api/admin/login", { method: "POST", body: payload });
}

export function developerLogin(payload) {
  return request("/api/developer/login", { method: "POST", body: payload });
}

/* ---------------- Nominations (user) ---------------- */
export function createNomination(payload, token = null) {
  return request("/api/nominations", { method: "POST", body: payload, token });
}

export function fetchMyNominations(token) {
  return request("/api/nominations/my", { method: "GET", token });
}

export function fetchNominationById(id, token) {
  return request(`/api/nominations/${id}`, { method: "GET", token });
}

export function updateUserNomination(id, payload, token) {
  return request(`/api/nominations/${id}`, { method: "PUT", body: payload, token });
}

/* ---------------- Nominations (admin) ---------------- */
export function fetchAdminNominations(token) {
  return request("/api/admin/nominations", { method: "GET", token });
}

export function updateNominationStatus(id, status, token) {
  return request(`/api/admin/nominations/${id}/status`, {
    method: "PATCH",
    body: { status },
    token,
  });
}

export function updateNomination(id, payload, token) {
  return request(`/api/admin/nominations/${id}`, {
    method: "PUT",
    body: payload,
    token,
  });
}

export function deleteNomination(id, token) {
  return request(`/api/admin/nominations/${id}`, { method: "DELETE", token });
}

/* ---------------- Previous Editions ---------------- */
export function fetchPreviousEditions() {
  return request("/api/previous-editions", { method: "GET" });
}

export function fetchPreviousEditionById(identifier) {
  return request(`/api/previous-editions/${identifier}`, { method: "GET" });
}

export function fetchPreviousEditionBySlug(year, slug) {
  return request(`/api/previous-editions/lookup/${year}/${slug}`, { method: "GET" });
}

export function createPreviousEdition(payload, token) {
  return request("/api/previous-editions", { method: "POST", body: payload, token });
}

export function updatePreviousEdition(id, payload, token) {
  return request(`/api/previous-editions/${id}`, { method: "PUT", body: payload, token });
}

export function deletePreviousEdition(id, token) {
  return request(`/api/previous-editions/${id}`, { method: "DELETE", token });
}

/* ---------------- Upcoming Awards ---------------- */
const UPCOMING_AWARDS_BASE_URL = "https://api.globaliconawards.in";

export function fetchUpcomingAwards() {
  return request("/api/upcoming-awards", { method: "GET", baseUrl: UPCOMING_AWARDS_BASE_URL });
}

export function fetchUpcomingAwardBySlug(slug) {
  return request(`/api/upcoming-awards/${slug}`, { method: "GET", baseUrl: UPCOMING_AWARDS_BASE_URL });
}

export function createUpcomingAward(payload, token) {
  return request("/api/upcoming-awards", { method: "POST", body: payload, token, baseUrl: UPCOMING_AWARDS_BASE_URL });
}

export function updateUpcomingAward(id, payload, token) {
  return request(`/api/upcoming-awards/${id}`, { method: "PUT", body: payload, token, baseUrl: UPCOMING_AWARDS_BASE_URL });
}

export function deleteUpcomingAward(id, token) {
  return request(`/api/upcoming-awards/${id}`, { method: "DELETE", token, baseUrl: UPCOMING_AWARDS_BASE_URL });
}




export function apiUrl(base, path = "") {
  return `${(base || "http://localhost:5000/api").replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}
export const browserApiUrl = path => apiUrl(process.env.NEXT_PUBLIC_API_URL, path);
export const serverApiUrl = path => apiUrl(process.env.API_URL || process.env.NEXT_PUBLIC_API_URL, path);

import { serverApiUrl } from "./api-url.mjs";
export async function getPublishedWebsite(slug) {
  try {
    const response=await fetch(serverApiUrl(`websites/public/${encodeURIComponent(slug)}`),{cache:"no-store"});
    return response.ok ? await response.json() : null;
  } catch (error) {
    console.error("Failed to fetch published website:",error);
    return null;
  }
}

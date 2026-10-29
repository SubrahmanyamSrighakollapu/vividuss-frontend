"use server";
import { serverApiUrl } from "@/lib/api-url.mjs";
import { createConcurrencySession } from "@/lib/publication-client.mjs";
import { auth } from "@clerk/nextjs/server";

async function request(path, method, body, concurrency, publication = false) {
  try {
    const { getToken, userId } = await auth();
    const token = await getToken();
    if (!userId || !token) return { success: false, message: "Authentication required", code: "UNAUTHENTICATED" };
    const response = await fetch(serverApiUrl(path), {
      method, headers: { "Content-Type": "application/json", Authorization: "Bearer " + token,
        ...createConcurrencySession(concurrency).headers(publication) },
      body: body === undefined ? undefined : JSON.stringify(body), cache: "no-store",
    });
    const result = await response.json().catch(() => null);
    return result ? { ...result, ...(response.ok ? {} : { success: false, status: response.status }) }
      : { success: false, status: response.status, message: "The API returned an invalid response" };
  } catch {
    return { success: false, code: "REQUEST_FAILED", message: "Request failed. Your local draft has not been discarded." };
  }
}
export async function saveWebsiteDraftAction(websiteId, draftWebsite) {
  return request("websites/" + encodeURIComponent(websiteId) + "/draft", "PATCH", {
    pages: (draftWebsite.pages || []).map(page => ({
      id: page.id, name: page.name, slug: page.slug, order: page.order, sections: page.sections || [],
      ...(page.editorData ? { editorData: page.editorData } : {}),
    })), theme: draftWebsite.theme, name: draftWebsite.name,
  }, draftWebsite.concurrency);
}
export async function publishWebsiteAction(websiteId, concurrency) {
  return request("websites/" + encodeURIComponent(websiteId) + "/publish", "POST", {}, concurrency, true);
}
export async function updateWebsiteSections(sections, concurrency) {
  const results = [];
  let version = concurrency;
  for (const section of sections) {
    const result = await request("websites/sections/" + encodeURIComponent(section.id), "PATCH",
      { content: section.content, config: section.config }, version);
    if (!result.success) return result;
    version = result.concurrency || version;
    results.push(result);
  }
  return { success: true, data: results, ...(version ? { concurrency: version } : {}) };
}
export async function createWebsiteSection({ pageId, type, content, config, concurrency }) {
  return request("websites/pages/" + encodeURIComponent(pageId) + "/sections", "POST", { type, content, config }, concurrency);
}
export async function deleteWebsiteSection(sectionId, concurrency) {
  return request("websites/sections/" + encodeURIComponent(sectionId), "DELETE", undefined, concurrency);
}
export async function reorderWebsiteSections({ pageId, sections, concurrency }) {
  return request("websites/pages/" + encodeURIComponent(pageId) + "/sections/reorder", "PATCH", { sections }, concurrency);
}
export async function updateWebsiteAction(websiteId, data, concurrency = data.concurrency) {
  return request("websites/" + encodeURIComponent(websiteId), "PATCH", data, concurrency);
}
export async function createWebsitePageAction(websiteId, data, concurrency = data.concurrency) {
  const result = await request("websites/" + encodeURIComponent(websiteId) + "/pages", "POST", data, concurrency);
  return result.success ? { ...result, data: result.data ?? result } : result;
}
export async function updateWebsitePageAction(pageId, data, concurrency = data.concurrency) {
  const result = await request("websites/pages/" + encodeURIComponent(pageId), "PATCH", data, concurrency);
  return result.success ? { ...result, data: result.data ?? result } : result;
}
export async function deleteWebsitePageAction(pageId, concurrency) {
  const result = await request("websites/pages/" + encodeURIComponent(pageId), "DELETE", undefined, concurrency);
  return result.success ? { ...result, data: result.data ?? result } : result;
}

export function publicationError(result, status) {
  const error = new Error(result?.errors?.length ? result.errors.slice(0,3).map(e=>e.path + ": " + e.reason).join("; ") : result?.message || "Request failed");
  error.kind = status === 409 && result?.code === "VERSION_CONFLICT" || status === 428 ? "conflict" : result?.errors ? "validation" : "request";
  error.code = result?.code; error.status = status; return error;
}
export function createConcurrencySession(initial) {
  let state = initial || null;
  return {
    current: () => state,
    headers(publication = false) {
      return state?.enabled ? { "If-Match": '"draft-' + state.draftVersion + '"',
        ...(publication ? { "If-Publication-Match": '"publication-' + state.publicationVersion + '"' } : {}) } : {};
    },
    acknowledge(result) {
      const next = result?.concurrency || result?.data?.concurrency;
      if (next?.enabled && (!state || next.draftVersion >= state.draftVersion && next.publicationVersion >= state.publicationVersion)) state = { ...next };
      return state;
    },
    assertLoaded(loaded) {
      if (loaded?.enabled && state?.enabled && loaded.draftVersion !== state.draftVersion) {
        throw publicationError({code:"VERSION_CONFLICT",message:"This website changed in another session. Reload the builder before editing; local content is preserved."},409);
      }
    },
  };
}
export function downloadLocalDraft(document, filename = "vividuss-local-draft.json") {
  const url = URL.createObjectURL(new Blob([JSON.stringify(document,null,2)],{type:"application/json"}));
  const link = window.document.createElement("a"); link.href=url; link.download=filename;
  window.document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
}

export function publishedWebsiteIdentity(website) {
 return {slug:website?.publication?.slug || website?.publicationState?.publishedSlug || website?.publishedData?.slug || (website?.isPublished ? website.slug : null),pages:Array.isArray(website?.publishedData?.pages)?website.publishedData.pages:[]};
}

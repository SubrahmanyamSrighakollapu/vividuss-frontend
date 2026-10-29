// Snapshot-only page resolution shared by both existing slug routes.
export function resolvePublishedPage(website, pageSlug) {
  const snapshot = website?.publishedData;
  if (!snapshot || !Array.isArray(snapshot.pages)) return null;
  if (snapshot.format !== undefined && snapshot.format !== 'vividuss.website.snapshot' ||
      snapshot.schemaVersion !== undefined && snapshot.schemaVersion !== 1 ||
      snapshot.registryVersion !== undefined && snapshot.registryVersion !== 1) return null;
  const pages = snapshot.pages;
  const page = pageSlug === undefined
    ? pages.find(p => p.slug === 'home') || [...pages].sort((a,b)=>(a.order??0)-(b.order??0))[0]
    : pages.find(p => p.slug === pageSlug);
  return page ? { snapshot, pages, page } : null;
}
export function publishedMetadata(website, pageSlug) {
  const resolved=resolvePublishedPage(website,pageSlug);
  if(!resolved) return {title:'Page Not Found'};
  const {snapshot,page}=resolved;
  const seo=page.editorData?.metadata || {};
  return {
    title:seo.title || (pageSlug===undefined ? snapshot.name || 'Website' : `${page.name} | ${snapshot.name || 'Website'}`),
    ...(seo.description ? {description:seo.description} : {}),
    ...(seo.noIndex ? {robots:{index:false,follow:false}} : {}),
    ...(seo.canonicalUrl ? {alternates:{canonical:seo.canonicalUrl}} : {}),
  };
}

import SiteChrome from "./SiteChrome";
import SectionRenderer from "../sections/SectionRenderer";
import PuckPublicRenderer from "./PuckPublicRenderer";
import { DEFAULT_THEME } from "../../lib/theme";
import { detectDocumentFormat } from "../../shared/website-contract/index.cjs";

export default function PublishedPage({ website, snapshot, page, pages, slug }) {
  const format = detectDocumentFormat(page);
  const colors = { ...DEFAULT_THEME.colors, ...(snapshot.theme?.colors || {}) };
  const themeVars = Object.fromEntries(Object.entries(colors).map(([key,value]) =>
    [`--color-${key.replace(/[A-Z]/g,c=>`-${c.toLowerCase()}`)}`,value]));
  return <div style={themeVars} className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
    <SiteChrome layout={snapshot.publication?.revisionId && snapshot.layoutPolicy === "website-owned-v1" ? snapshot.globalLayout : null} slug={snapshot.slug || slug} placement="header" />
    {format === "legacy-sections" ? [...(page.sections || [])].sort((a,b)=>(a.order??0)-(b.order??0)).map(section =>
      <SectionRenderer key={section.id} section={section} websiteSlug={snapshot.slug || slug} />)
      : format === "unsupported" ? <p role="alert">Unsupported website document. Published content requires review.</p>
      : <PuckPublicRenderer data={page.editorData} pages={pages} activePageId={page.id}
          websiteId={website.id} websiteSlug={snapshot.slug || slug} templateName={snapshot.name || ""} />}
    <SiteChrome layout={snapshot.globalLayout} slug={snapshot.slug || slug} placement="footer" />
  </div>;
}

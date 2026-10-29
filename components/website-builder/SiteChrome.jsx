function localHref(href, slug) {
  if (!href || href === "/" || href === "/home") return "/" + slug;
  if (/^(https?:|mailto:|tel:|#)/i.test(href)) return href;
  return "/" + slug + "/" + href.replace(/^\/+/, "");
}
export default function SiteChrome({ layout, slug, placement }) {
  const part = layout?.[placement];
  if (!part?.enabled) return null;
  const style = { display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,
    flexWrap:"wrap",padding:placement==="header"?"16px 24px":"24px",
    backgroundColor:part.backgroundColor || (placement==="header"?"#ffffff":"#111827"),
    color:part.textColor || (placement==="header"?"#111827":"#ffffff") };
  const links = <nav aria-label={placement + " links"} style={{display:"flex",gap:16,flexWrap:"wrap"}}>
    {(part.links || []).map((link,index)=><a key={index} href={localHref(link.href,slug)}>{link.label}</a>)}
  </nav>;
  return placement==="header" ? <header style={style}>
    <a href={"/"+slug}>{part.logoUrl ? <img src={part.logoUrl} alt={part.logoText || "Logo"} style={{maxHeight:48,maxWidth:200}} /> : part.logoText}</a>{links}
  </header> : <footer style={style}><p>{part.copyrightText || ""}</p>{links}</footer>;
}

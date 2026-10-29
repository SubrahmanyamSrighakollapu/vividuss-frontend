import { notFound } from "next/navigation";
import PublishedPage from "@/components/website-builder/PublishedPage";
import { getPublishedWebsite } from "@/lib/fetch-published-website";
import { resolvePublishedPage, publishedMetadata } from "@/lib/published-page.mjs";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return publishedMetadata(await getPublishedWebsite(slug));
}
export default async function PublicWebsitePage({ params }) {
  const { slug } = await params;
  const website = await getPublishedWebsite(slug);
  const resolved = resolvePublishedPage(website);
  if (!resolved) notFound();
  return <PublishedPage website={website} slug={slug} {...resolved} />;
}

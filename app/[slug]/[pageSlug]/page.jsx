import { notFound } from "next/navigation";
import PublishedPage from "@/components/website-builder/PublishedPage";
import { getPublishedWebsite } from "@/lib/fetch-published-website";
import { resolvePublishedPage, publishedMetadata } from "@/lib/published-page.mjs";

export async function generateMetadata({ params }) {
  const { slug, pageSlug } = await params;
  return publishedMetadata(await getPublishedWebsite(slug), pageSlug);
}
export default async function PublicSubPage({ params }) {
  const { slug, pageSlug } = await params;
  const website = await getPublishedWebsite(slug);
  const resolved = resolvePublishedPage(website, pageSlug);
  if (!resolved) notFound();
  return <PublishedPage website={website} slug={slug} {...resolved} />;
}

import { publicSections } from "./public-section-registry";

export default function SectionRenderer({ section, websiteSlug }) {
  if (!section) {
    return null;
  }

  const Component = Object.hasOwn(publicSections, section.type) ? publicSections[section.type] : null;

  if (!Component) {
    return <p role="alert">Unsupported legacy section: {section.type}</p>;
  }

  return (
    <Component
      content={section.content}
      config={section.config}
      websiteSlug={websiteSlug}
    />
  );
}

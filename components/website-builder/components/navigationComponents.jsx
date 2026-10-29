"use client";
import { navigationViews } from "../views/navigationViews.jsx";

import { animationFields, animationDefaults } from "../fields/animationFields.js";
import { spacingFields } from "../fields/boxStyleFields.js";
import { selectField, numberField, textField, textareaField, radioField, colorField, imageField, responsiveField } from "../fields/helpers.js";

export const navigationComponents = {
  // ------------------------------------------------------------------------
  // NAVBAR (ADVANCED HEADER - HIGHLY CUSTOMIZABLE)
  // ------------------------------------------------------------------------
  Navbar: {
    label: "Navbar (Header Menu)",
    fields: {
      menuMode: selectField("Navigation Menu Source", [
        { label: "🛠️ Custom Links (Edit in Sidebar) [Recommended]", value: "custom" },
        { label: "⚡ Dynamic (Auto from Published Pages)", value: "auto" },
        { label: "🔀 Hybrid (Auto Pages + Custom Links)", value: "hybrid" },
      ]),
      quickLinksText: textareaField("⚡ Quick Links (One per line: Label | /url | Badge)"),
      autoSlugsExclude: textField("Auto Mode: Exclude page slugs (e.g. privacy, 404)"),
      includeHomeLink: radioField("Auto Mode: Include Home Link", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),

      // Brand & Logo
      logoType: selectField("Logo Display Mode", [
        { label: "⚡ Auto (Show Image if set, else Brand Name) [Recommended]", value: "auto" },
        { label: "🖼️ Image Logo Only", value: "image" },
        { label: "✨ Both Image & Brand Name", value: "both" },
        { label: "🔤 Brand Name Text Only", value: "text_only" },
      ]),
      logoText: textField("Brand / Site Name"),
      logoUrl: imageField("Logo Image URL (or upload image)"),
      logoHeight: numberField("Logo Height (px)", 16, 120, 2),
      logoWidth: numberField("Logo Max Width (px)", 20, 400, 5),
      logoSubtitle: textField("Small brand tagline (Optional)"),

      // Header Mode & Layout
      headerMode: selectField("Position & Header Style", [
        { label: "Sticky (Fixed to top on scroll)", value: "sticky" },
        { label: "Floating Island Pill (Modern blur pill)", value: "floating" },
        { label: "Glassmorphism Frosted", value: "glass" },
        { label: "Transparent Overlay (Floats over Hero)", value: "transparent" },
        { label: "Static (Scrolls with page)", value: "static" },
      ]),
      layoutStyle: selectField("Header Layout Alignment", [
        { label: "Space Between (Logo Left, Links Center, Actions Right)", value: "split" },
        { label: "Left Aligned (Logo & Links Left, Actions Right)", value: "left" },
        { label: "Centered (Links Around Logo)", value: "center" },
      ]),

      // Dimensions & Sizing (Adjustable from Right Sidebar)
      navHeight: selectField("Navbar Height Preset", [
        { label: "⚡ Slim & Compact (52px)", value: "52px" },
        { label: "⭐ Standard Modern (64px) [Default]", value: "64px" },
        { label: "📐 Spacious (76px)", value: "76px" },
        { label: "🛠️ Custom Height (Set below)", value: "custom" },
      ]),
      customHeight: numberField("Custom Height (px)", 36, 160, 2),
      paddingY: numberField("Vertical Content Spacing (px)", 0, 24, 1),
      containerWidth: selectField("Navbar Width Preset", [
        { label: "⭐ Standard Contained (1240px) [Default]", value: "1240px" },
        { label: "📱 Compact Contained (1080px)", value: "1080px" },
        { label: "🔍 Narrow Contained (960px)", value: "960px" },
        { label: "🖥️ Wide Contained (1440px)", value: "1440px" },
        { label: "↔️ Full Screen Width (100% Edge-to-Edge)", value: "100%" },
        { label: "🛠️ Custom Width (Set below)", value: "custom" },
      ]),
      customWidth: numberField("Custom Max Width (px)", 600, 1920, 20),
      paddingX: numberField("Horizontal Padding (px)", 8, 64, 4),

      // Custom Links (Used when menuMode === 'custom' or fallback)
      links: {
        type: "array",
        label: "Custom Navigation Links List",
        arrayFields: {
          label: textField("Link label"),
          href: textField("Destination URL / Anchor"),
          badge: textField("Small badge (e.g. NEW, HOT, PRO)"),
          openNewTab: radioField("Open in New Tab", [
            { label: "No (Same tab)", value: false },
            { label: "Yes (New tab)", value: true },
          ]),
          hasSubmenu: radioField("Has Submenu Dropdown", [
            { label: "No", value: false },
            { label: "Yes", value: true },
          ]),
          submenuText: textareaField("Submenu items (Format: Title | /path | Subtitle description)"),
        },
        defaultItemProps: {
          label: "Services",
          href: "/services",
          badge: "",
          openNewTab: false,
          hasSubmenu: false,
          submenuText: "Web Design | /services/design | Custom UI & UX\nDevelopment | /services/dev | Full-stack engineering",
        },
        getItemSummary: (it) => it.label || "Link",
      },

      // Search Bar
      showSearch: radioField("Show search input bar", [
        { label: "No", value: false },
        { label: "Yes", value: true },
      ]),
      searchPlaceholder: textField("Search placeholder text"),

      // Primary Action CTA
      showCTA: radioField("Show Primary CTA Button", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      ctaLabel: textField("Primary CTA button text"),
      ctaHref: textField("Primary CTA link URL"),
      ctaVariant: selectField("Primary CTA Style", [
        { label: "Solid Filled", value: "solid" },
        { label: "Gradient Aurora", value: "gradient" },
        { label: "Subtle Glow", value: "glow" },
        { label: "Outline", value: "outline" },
      ]),
      ctaBg: colorField("Primary button background"),
      ctaColor: colorField("Primary button text color"),

      // Secondary Action Button
      showSecondaryCTA: radioField("Show Secondary Button (e.g. Sign In)", [
        { label: "No", value: false },
        { label: "Yes", value: true },
      ]),
      secondaryCtaLabel: textField("Secondary button text"),
      secondaryCtaHref: textField("Secondary link URL"),
      secondaryCtaVariant: selectField("Secondary button style", [
        { label: "Ghost / Minimal", value: "ghost" },
        { label: "Outline Border", value: "outline" },
      ]),

      // Social Media Quick Links
      showSocials: radioField("Show Social Media Icons", [
        { label: "No", value: false },
        { label: "Yes", value: true },
      ]),
      twitterUrl: textField("Twitter / X URL"),
      githubUrl: textField("GitHub URL"),
      linkedinUrl: textField("LinkedIn URL"),
      instagramUrl: textField("Instagram URL"),

      // Announcement Top Strip
      showBanner: radioField("Show Announcement Banner", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      bannerText: textField("Announcement Top Banner Text"),
      bannerLink: textField("Banner Link URL (Optional)"),
      bannerBg: colorField("Banner background color"),
      bannerTextColor: colorField("Banner text color"),

      // Color Palette & Styling
      backgroundColor: colorField("Header background color"),
      textColor: colorField("Brand / text color"),
      linkColor: colorField("Link text color"),
      hoverColor: colorField("Link hover color"),
      activeColor: colorField("Active page indicator color"),
      borderBottom: radioField("Bottom separator line", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      borderColor: colorField("Border line color"),

      responsive: responsiveField([
        {
          key: "logoWidth",
          label: "Logo width (px)",
          type: "number",
          min: 40,
          max: 300,
        },
        {
          key: "paddingX",
          label: "Horizontal padding (px)",
          type: "number",
          min: 8,
          max: 80,
        },
        {
          key: "paddingY",
          label: "Vertical padding (px)",
          type: "number",
          min: 0,
          max: 60,
        },
      ]),
      ...animationFields,
    },
    defaultProps: {
      menuMode: "custom",
      quickLinksText: "",
      autoSlugsExclude: "",
      includeHomeLink: true,
      logoType: "auto",
      logoText: "STUDIO NOVA",
      logoUrl: "",
      logoHeight: 36,
      logoWidth: 140,
      logoSubtitle: "",
      headerMode: "sticky",
      layoutStyle: "split",
      navHeight: "64px",
      customHeight: 64,
      paddingY: 4,
      containerWidth: "1240px",
      customWidth: 1240,
      paddingX: 24,
      links: [
        { label: "Home", href: "/", badge: "", hasSubmenu: false, submenuText: "" },
        {
          label: "Services",
          href: "#services",
          badge: "",
          hasSubmenu: true,
          submenuText: "Digital Design | #design | UI/UX & Brand Identity\nWeb Engineering | #web | Modern Full-Stack Platforms\nGrowth & SEO | #seo | Conversion rate optimization",
        },
        { label: "Showcase", href: "#work", badge: "HOT", hasSubmenu: false, submenuText: "" },
        { label: "Pricing", href: "#pricing", badge: "", hasSubmenu: false, submenuText: "" },
        { label: "Contact", href: "#contact", badge: "", hasSubmenu: false, submenuText: "" },
      ],
      showSearch: false,
      searchPlaceholder: "Search pages…",
      showCTA: true,
      ctaLabel: "Get Started",
      ctaHref: "#signup",
      ctaVariant: "solid",
      ctaBg: "#0f172a",
      ctaColor: "#ffffff",
      showSecondaryCTA: false,
      secondaryCtaLabel: "Sign In",
      secondaryCtaHref: "#login",
      secondaryCtaVariant: "ghost",
      showSocials: false,
      twitterUrl: "https://twitter.com",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      instagramUrl: "",
      showBanner: false,
      bannerText: "🚀 Discover our newly engineered agency templates →",
      bannerLink: "#",
      bannerBg: "#4f46e5",
      bannerTextColor: "#ffffff",
      backgroundColor: "#ffffff",
      textColor: "#0f172a",
      linkColor: "#334155",
      hoverColor: "#4f46e5",
      activeColor: "#4f46e5",
      borderBottom: true,
      borderColor: "#e2e8f0",
      responsive: {
        tablet: {
          logoWidth: 120,
        },
        mobile: {
          logoWidth: 100,
        },
      },
      ...animationDefaults,
    },
    render: navigationViews.Navbar,
  },

  // ------------------------------------------------------------------------
  // ANNOUNCEMENT BAR
  // ------------------------------------------------------------------------
  AnnouncementBar: {
    label: "Announcement Bar (Top Strip)",
    fields: {
      text: textField("Announcement text"),
      linkText: textField("Action link text"),
      linkHref: textField("Action link URL"),
      backgroundColor: colorField("Background color"),
      textColor: colorField("Text color"),
      icon: selectField("Icon", [
        { label: "Sparkles", value: "sparkles" },
        { label: "Zap", value: "zap" },
        { label: "Star", value: "star" },
        { label: "Flame", value: "flame" },
        { label: "Bell", value: "bell" },
        { label: "None", value: "none" },
      ]),
      closable: radioField("Show close button", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      ...animationFields,
    },
    defaultProps: {
      text: "⚡ Special Offer: Unlock 20% off all annual platform subscriptions today.",
      linkText: "Claim Deal →",
      linkHref: "#pricing",
      backgroundColor: "#0f172a",
      textColor: "#ffffff",
      icon: "sparkles",
      closable: true,
      ...animationDefaults,
    },
    render: navigationViews.AnnouncementBar,
  },

  // ------------------------------------------------------------------------
  // FOOTER (HIGHLY CUSTOMIZABLE MULTI-COLUMN BRAND FOOTER)
  // ------------------------------------------------------------------------
  Footer: {
    label: "Footer (Multi-Column)",
    fields: {
      menuMode: selectField("Navigation Links Mode", [
        { label: "🛠️ Custom Columns (Edit in Sidebar) [Recommended]", value: "custom" },
        { label: "🔀 Both (Auto Pages Column + Custom Columns)", value: "both" },
        { label: "⚡ Dynamic (Auto-populate Published Pages Only)", value: "auto" },
      ]),
      pagesColumnTitle: textField("Auto Mode: Pages Column Title"),

      // Slots for Full Composability
      footerTopSlot: { type: "slot" },
      brandSlot: { type: "slot" },
      footerBottomSlot: { type: "slot" },

      // Brand
      brandName: textField("Brand / Company name"),
      logoUrl: imageField("Logo image URL (Optional)"),
      description: textareaField("Brand summary description"),

      // Colors & Styling
      backgroundColor: colorField("Footer background color"),
      textColor: colorField("Text description color"),
      accentColor: colorField("Headings & brand color"),
      linkColor: colorField("Link color"),
      borderTopColor: colorField("Top border line color"),

      // Navigation Columns
      navColumns: {
        type: "array",
        label: "Footer Navigation Columns",
        arrayFields: {
          title: textField("Column header title"),
          linksList: textareaField("Column Links (One per line: Label | /url)"),
          link1Text: textField("Link 1 label (Optional)"),
          link1Url: textField("Link 1 URL (Optional)"),
          link2Text: textField("Link 2 label (Optional)"),
          link2Url: textField("Link 2 URL (Optional)"),
          link3Text: textField("Link 3 label (Optional)"),
          link3Url: textField("Link 3 URL (Optional)"),
          link4Text: textField("Link 4 label (Optional)"),
          link4Url: textField("Link 4 URL (Optional)"),
        },
        defaultItemProps: {
          title: "Product",
          linksList: "Features | #features\nTemplates | #templates\nShowcase | #showcase\nPricing | #pricing",
          link1Text: "Features",
          link1Url: "#features",
          link2Text: "Templates",
          link2Url: "#templates",
          link3Text: "Showcase",
          link3Url: "#showcase",
          link4Text: "Pricing",
          link4Url: "#pricing",
        },
        getItemSummary: (it) => it.title || "Column",
      },

      // Newsletter
      showNewsletter: radioField("Include newsletter capture block", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      newsletterHeadline: textField("Newsletter headline"),
      newsletterPlaceholder: textField("Newsletter email placeholder"),

      // Social Links
      showSocials: radioField("Show Social Icon Links", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      twitterUrl: textField("Twitter/X profile URL (Optional)"),
      linkedinUrl: textField("LinkedIn profile URL (Optional)"),
      githubUrl: textField("GitHub profile URL (Optional)"),
      instagramUrl: textField("Instagram profile URL (Optional)"),
      youtubeUrl: textField("YouTube channel URL (Optional)"),
      discordUrl: textField("Discord server URL (Optional)"),

      // Copyright & Legal
      copyrightText: textField("Copyright notice"),
      showLegalLinks: radioField("Show bottom legal links", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      privacyUrl: textField("Privacy Policy URL"),
      termsUrl: textField("Terms of Service URL"),

      ...spacingFields,
      responsive: responsiveField([
        {
          key: "marginTop",
          label: "Top Margin",
          type: "text",
        },
        {
          key: "marginBottom",
          label: "Bottom Margin",
          type: "text",
        },
        {
          key: "paddingTop",
          label: "Top Padding",
          type: "text",
        },
        {
          key: "paddingBottom",
          label: "Bottom Padding",
          type: "text",
        },
      ]),
      ...animationFields,
    },
    defaultProps: {
      menuMode: "custom",
      pagesColumnTitle: "Explore Pages",
      brandName: "STUDIO NOVA",
      logoUrl: "",
      description:
        "Crafting digital experiences with architectural precision, modular component engines, and unmatched creative speed.",
      backgroundColor: "#090d16",
      textColor: "#94a3b8",
      accentColor: "#ffffff",
      linkColor: "#94a3b8",
      borderTopColor: "rgba(255,255,255,0.08)",
      navColumns: [
        {
          title: "Product",
          linksList: "Features | #features\nTemplates | #templates\nIntegrations | #integrations\nReleases | #releases\nPricing | #pricing",
          link1Text: "Features",
          link1Url: "#features",
          link2Text: "Templates",
          link2Url: "#templates",
          link3Text: "Integrations",
          link3Url: "#integrations",
          link4Text: "Releases",
          link4Url: "#releases",
        },
        {
          title: "Company",
          linksList: "About Us | #about\nCareers | #careers\nPress Kit | #press\nContact | #contact\nBlog | #blog",
          link1Text: "About Us",
          link1Url: "#about",
          link2Text: "Careers",
          link2Url: "#careers",
          link3Text: "Press Kit",
          link3Url: "#press",
          link4Text: "Contact",
          link4Url: "#contact",
        },
        {
          title: "Resources",
          linksList: "Documentation | #docs\nCommunity | #community\nHelp Center | #help\nStatus | #status",
          link1Text: "Documentation",
          link1Url: "#docs",
          link2Text: "Community",
          link2Url: "#community",
          link3Text: "Help Center",
          link3Url: "#help",
          link4Text: "Status",
          link4Url: "#status",
        },
      ],
      showNewsletter: true,
      newsletterHeadline: "Subscribe to our engineering teardowns",
      newsletterPlaceholder: "Enter your email...",
      showSocials: true,
      twitterUrl: "https://twitter.com",
      linkedinUrl: "https://linkedin.com",
      githubUrl: "https://github.com",
      instagramUrl: "",
      youtubeUrl: "",
      discordUrl: "",
      copyrightText: "© 2026 Studio Nova Inc. All rights reserved.",
      showLegalLinks: true,
      privacyUrl: "#privacy",
      termsUrl: "#terms",
      marginTop: "64px",
      marginBottom: "0px",
      responsive: {
        tablet: {
          marginTop: "48px",
        },
        mobile: {
          marginTop: "32px",
        },
      },
      ...animationDefaults,
    },
    render: navigationViews.Footer,
  },
};

// Aliases for backward compatibility with templates that might reference Header
navigationComponents.Header = navigationComponents.Navbar;

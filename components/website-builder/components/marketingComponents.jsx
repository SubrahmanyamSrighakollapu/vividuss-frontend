"use client";
import { marketingViews } from "../views/marketingViews.jsx";

import { animationFields, animationDefaults } from "../fields/animationFields.js";
import { spacingFields } from "../fields/boxStyleFields.js";
import { selectField, numberField, textField, textareaField, radioField, colorField, imageField, responsiveField } from "../fields/helpers.js";

import { ALIGNMENT_OPTIONS, HOVER_EFFECT_OPTIONS, RADIUS_OPTIONS, SHADOW_PRESETS, SPACING_OPTIONS } from "../tokens/index.js";
import { ICON_PRESETS } from "./icons.jsx";

export const marketingComponents = {
  // ------------------------------------------------------------------------
  // HERO SECTION (ADVANCED COMPOSABLE & DYNAMIC)
  // ------------------------------------------------------------------------
  Hero: {
    label: "Hero Section (Advanced)",
    fields: {
      contentMode: selectField("Hero Building Mode", [
        { label: "⚡ Preset Layout (Fast High-Converting Hero)", value: "preset" },
        { label: "🎨 Build from Scratch (Full Drag & Drop Slots)", value: "custom" },
      ]),

      // Slots for Full Composable Drag-and-Drop Freedom
      leftSlot: { type: "slot" },
      rightSlot: { type: "slot" },
      heroContent: { type: "slot" },
      heroMediaSlot: { type: "slot" },

      layout: selectField("Layout arrangement", [
        { label: "Split (Content Left, Visual Right)", value: "split" },
        { label: "Centered Hero", value: "centered" },
        { label: "Full Height 100vh Hero (With scroll indicator)", value: "fullHeight" },
        { label: "Full Background Visual", value: "background" },
      ]),
      columnRatio: selectField("Column Width Ratio (Split Mode)", [
        { label: "50% / 50% (Equal Split)", value: "50-50" },
        { label: "60% Content / 40% Visual", value: "60-40" },
        { label: "40% Content / 60% Visual", value: "40-60" },
        { label: "70% Content / 30% Visual", value: "70-30" },
      ]),
      reverseColumns: radioField("Reverse Columns (Visual Left, Content Right)", [
        { label: "No", value: false },
        { label: "Yes", value: true },
      ]),
      verticalAlign: selectField("Vertical Column Alignment", [
        { label: "Center Aligned", value: "center" },
        { label: "Top Aligned", value: "start" },
        { label: "Bottom Aligned", value: "end" },
      ]),

      // Eyebrow Badge
      showBadgePill: radioField("Show Eyebrow Badge", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      eyebrow: textField("Eyebrow badge / category text"),
      pulseDot: radioField("Pulsing Live Beacon Dot", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),

      // Headline & Highlight
      title: textField("Main hero headline"),
      highlightText: textField("Headline Gradient Highlight Word(s)"),
      highlightGradient: textField("Highlight Gradient (CSS, e.g. linear-gradient(135deg, #818cf8, #c084fc))"),
      description: textareaField("Supporting description"),

      // Primary CTA Button
      primaryButtonText: textField("Primary CTA button text"),
      primaryButtonUrl: textField("Primary link URL"),
      primaryButtonVariant: selectField("Primary Button Style", [
        { label: "Solid Color", value: "solid" },
        { label: "Gradient Aurora", value: "gradient" },
        { label: "Ambient Glow", value: "glow" },
        { label: "Outline", value: "outline" },
      ]),

      // Secondary Button
      showSecondaryButton: radioField("Show secondary button", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      secondaryButtonText: textField("Secondary CTA label"),
      secondaryButtonUrl: textField("Secondary link URL"),
      showPlayIcon: radioField("Show Video Play Icon on Secondary Button", [
        { label: "No", value: false },
        { label: "Yes", value: true },
      ]),

      // Social Proof & Ratings
      showRatings: radioField("Show Customer Social Proof Bar", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      showAvatarStack: radioField("Show Verified Customer Avatars", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      ratingsText: textField("Rating label (e.g. 4.95 / 5 from 3,400+ satisfied builders)"),

      // Visual Media Column
      imageUrl: imageField("Split visual / Hero image URL"),
      imageAlt: textField("Image alt text"),
      imageWidth: numberField("Split visual width (%)", 30, 70),
      mockupFrame: selectField("Visual Presentation Frame", [
        { label: "Modern Card with Ambient Shadow", value: "card" },
        { label: "Browser Safari Window Mockup", value: "browser" },
        { label: "Glass Floating Canvas", value: "glass" },
        { label: "Raw Unstyled Image", value: "raw" },
      ]),

      // Floating Metric Stat Cards
      showFloatingCard1: radioField("Show Floating Stat Card 1", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      floatingCard1Title: textField("Card 1 Title"),
      floatingCard1Value: textField("Card 1 Stat Value"),
      showFloatingCard2: radioField("Show Floating Stat Card 2", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      floatingCard2Title: textField("Card 2 Title"),
      floatingCard2Value: textField("Card 2 Stat Value"),

      // Background Aesthetics
      backgroundColor: colorField("Background color"),
      backgroundGradient: radioField("Enable gradient overlay", [
        { label: "Disabled", value: false },
        { label: "Enabled", value: true },
      ]),
      gradientFrom: colorField("Gradient color from"),
      gradientTo: colorField("Gradient color to"),
      backgroundImage: imageField("Background image URL"),
      overlayOpacity: numberField("Background overlay opacity (%)", 0, 100),
      patternOverlay: selectField("Background Grid Texture", [
        { label: "None", value: "none" },
        { label: "Subtle Dot Matrix", value: "dots" },
        { label: "Architectural Grid Lines", value: "grid" },
      ]),
      enableMeshGlow: radioField("Ambient Aurora / Mesh Glow", [
        { label: "Enabled", value: true },
        { label: "Disabled", value: false },
      ]),
      meshGlowColor: colorField("Mesh Glow Accent Color"),

      // Colors & Sizing
      textColor: colorField("Text color"),
      accentColor: colorField("Accent highlight color"),
      paddingY: numberField("Vertical padding (px)", 40, 240),
      borderRadius: selectField("Corner radius", RADIUS_OPTIONS),

      responsive: responsiveField("Responsive overrides", [
        { name: "paddingY", label: "Vertical padding (px)", type: "number", min: 20, max: 240 },
        { name: "imageWidth", label: "Split image width (%)", type: "number", min: 30, max: 100 },
      ]),
      ...animationFields,
    },
    defaultProps: {
      contentMode: "preset",
      layout: "split",
      columnRatio: "50-50",
      reverseColumns: false,
      verticalAlign: "center",
      showBadgePill: true,
      eyebrow: "NEXT GENERATION WEB EXPERIENCES",
      pulseDot: true,
      title: "Digital Products Built for Ambitious Brands",
      highlightText: "Ambitious Brands",
      highlightGradient: "linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)",
      description:
        "We architect, design, and engineer high-performance platforms that transform industry standards and convert visitors into loyal advocates.",
      primaryButtonText: "Explore Templates",
      primaryButtonUrl: "#explore",
      primaryButtonVariant: "glow",
      showSecondaryButton: true,
      secondaryButtonText: "Book Discovery Call",
      secondaryButtonUrl: "#contact",
      showPlayIcon: false,
      showRatings: true,
      showAvatarStack: true,
      ratingsText: "4.95 / 5 from 3,400+ satisfied builders",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Digital platform dashboard",
      imageWidth: 50,
      mockupFrame: "browser",
      showFloatingCard1: true,
      floatingCard1Title: "Conversion Rate",
      floatingCard1Value: "🚀 +240%",
      showFloatingCard2: true,
      floatingCard2Title: "Uptime SLA",
      floatingCard2Value: "⚡ 99.99%",
      backgroundColor: "#090d16",
      backgroundGradient: true,
      gradientFrom: "#090d16",
      gradientTo: "#111827",
      backgroundImage: "",
      overlayOpacity: 40,
      patternOverlay: "dots",
      enableMeshGlow: true,
      meshGlowColor: "#6366f1",
      textColor: "#ffffff",
      accentColor: "#6366f1",
      paddingY: 100,
      borderRadius: 0,
      responsive: {
        tablet: {
          paddingY: 64,
          imageWidth: 80,
        },
        mobile: {
          paddingY: 40,
          imageWidth: 100,
        },
      },
      ...animationDefaults,
    },
    render: marketingViews.Hero,
  },

  // ------------------------------------------------------------------------
  // CALL TO ACTION (CTA BANNER)
  // ------------------------------------------------------------------------
  CallToAction: {
    label: "Call to Action Banner",
    fields: {
      ctaSlot: { type: "slot" },
      headline: textField("Call to action headline"),
      description: textareaField("Supporting description"),
      badgeText: textField("Small top tag (Optional)"),
      primaryButtonText: textField("Primary CTA button text"),
      primaryButtonUrl: textField("Primary link URL"),
      secondaryButtonText: textField("Secondary CTA label (Optional)"),
      secondaryButtonUrl: textField("Secondary link URL"),
      backgroundColor: colorField("Banner background color"),
      backgroundGradient: radioField("Enable gradient", [
        { label: "Disabled", value: false },
        { label: "Enabled", value: true },
      ]),
      gradientFrom: colorField("Gradient color 1"),
      gradientTo: colorField("Gradient color 2"),
      textColor: colorField("Text color"),
      borderRadius: selectField("Corner radius", RADIUS_OPTIONS),
      boxShadow: selectField("Shadow preset", SHADOW_PRESETS),
      responsive: responsiveField("Responsive overrides", [
        { name: "paddingY", label: "Vertical padding (px)", type: "number", min: 20, max: 160 },
        { name: "paddingX", label: "Horizontal padding (px)", type: "number", min: 12, max: 80 },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      ctaSlot: [],
      headline: "Ready to Transform Your Digital Presence?",
      description:
        "Join 10,000+ top designers and engineering teams who build modern, hyper-optimized web applications with our visual platform.",
      badgeText: "INSTANT ACCESS",
      primaryButtonText: "Explore Templates Now",
      primaryButtonUrl: "#templates",
      secondaryButtonText: "Schedule Architecture Review",
      secondaryButtonUrl: "#demo",
      backgroundColor: "#0f172a",
      backgroundGradient: true,
      gradientFrom: "#1e1b4b",
      gradientTo: "#0f172a",
      textColor: "#ffffff",
      borderRadius: 24,
      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
      marginTop: "24px",
      marginBottom: "32px",
      responsive: {
        tablet: {
          paddingY: 48,
          paddingX: 24,
        },
        mobile: {
          paddingY: 32,
          paddingX: 16,
        },
      },
      ...animationDefaults,
    },
    render: marketingViews.CallToAction,
  },

  // ------------------------------------------------------------------------
  // PRICING TABLE CARD
  // ------------------------------------------------------------------------
  PricingTable: {
    label: "Pricing Plan Card",
    fields: {
      customSlot: { type: "slot" },
      planName: textField("Tier title (e.g. Pro, Growth)"),
      badge: textField("Featured badge text (e.g. MOST POPULAR)"),
      isPopular: radioField("Highlight as Featured", [
        { label: "Standard Plan", value: false },
        { label: "Popular (Glowing Border)", value: true },
      ]),
      currency: textField("Currency symbol"),
      price: textField("Price figure"),
      period: textField("Billing interval (e.g. /month, /year)"),
      description: textareaField("Tier summary description"),
      features: {
        type: "array",
        label: "Included features",
        arrayFields: {
          text: textField("Feature description"),
          included: radioField("Included in plan?", [
            { label: "Yes (Checkmark)", value: true },
            { label: "No (Excluded)", value: false },
          ]),
        },
        defaultItemProps: { text: "Full API Access", included: true },
        getItemSummary: (item) => item.text || "Feature item",
      },
      buttonText: textField("Button call to action"),
      buttonUrl: textField("Button destination URL"),
      backgroundColor: colorField("Card background"),
      borderRadius: selectField("Corner radius", RADIUS_OPTIONS),
      hoverEffect: selectField("Hover micro-animation", HOVER_EFFECT_OPTIONS),
      responsive: responsiveField("Responsive overrides", [
        { name: "marginTop", label: "Top margin", type: "select", options: SPACING_OPTIONS },
        { name: "marginBottom", label: "Bottom margin", type: "select", options: SPACING_OPTIONS },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      customSlot: [],
      planName: "Professional",
      badge: "MOST POPULAR",
      isPopular: true,
      currency: "$",
      price: "79",
      period: "/month",
      description:
        "Perfect for scaling businesses needing advanced visual capabilities and priority infrastructure.",
      features: [
        { text: "Unlimited templates and landing pages", included: true },
        { text: "Full Puck visual block customizer", included: true },
        { text: "Custom domain & SSL certificate", included: true },
        { text: "Collaborative multi-user editing", included: true },
        { text: "Dedicated account architect", included: false },
      ],
      buttonText: "Start 14-Day Free Trial",
      buttonUrl: "#checkout",
      backgroundColor: "#ffffff",
      borderRadius: 20,
      hoverEffect: "lift-md",
      marginTop: "16px",
      marginBottom: "24px",
      responsive: {},
      ...animationDefaults,
    },
    render: marketingViews.PricingTable,
  },

  // ------------------------------------------------------------------------
  // COMPARISON TABLE
  // ------------------------------------------------------------------------
  ComparisonTable: {
    label: "Feature Comparison Table",
    fields: {
      headline: textField("Comparison headline"),
      plan1Name: textField("Tier 1 title"),
      plan2Name: textField("Tier 2 title (e.g. Pro)"),
      plan3Name: textField("Tier 3 title (e.g. Enterprise)"),
      features: {
        type: "array",
        label: "Feature rows",
        arrayFields: {
          name: textField("Feature name"),
          p1: textField("Tier 1 value (e.g. Yes, No, 5GB)"),
          p2: textField("Tier 2 value (e.g. Yes, 50GB)"),
          p3: textField("Tier 3 value (e.g. Unlimited)"),
        },
        defaultItemProps: { name: "Custom Domain", p1: "No", p2: "Yes", p3: "Unlimited" },
        getItemSummary: (it) => it.name || "Feature",
      },
      responsive: responsiveField("Responsive overrides", [
        { name: "marginTop", label: "Top margin", type: "select", options: SPACING_OPTIONS },
        { name: "marginBottom", label: "Bottom margin", type: "select", options: SPACING_OPTIONS },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      headline: "Detailed Feature Matrix",
      plan1Name: "Starter",
      plan2Name: "Professional",
      plan3Name: "Enterprise",
      features: [
        { name: "Visual Block Canvas", p1: "Yes", p2: "Yes", p3: "Yes" },
        { name: "Custom Domains", p1: "1 Domain", p2: "5 Domains", p3: "Unlimited" },
        { name: "Animation Presets", p1: "Basic", p2: "Advanced", p3: "Full Engine" },
        { name: "Team Members", p1: "1", p2: "5", p3: "Unlimited" },
        { name: "Dedicated SLA", p1: "No", p2: "No", p3: "99.99%" },
      ],
      marginTop: "24px",
      marginBottom: "32px",
      responsive: {},
      ...animationDefaults,
    },
    render: marketingViews.ComparisonTable,
  },

  // ------------------------------------------------------------------------
  // TESTIMONIAL CARD
  // ------------------------------------------------------------------------
  Testimonial: {
    label: "Testimonial / Review",
    fields: {
      stars: numberField("Rating (1 - 5 stars)", 1, 5),
      quote: textareaField("Review or testimony text"),
      authorName: textField("Customer name"),
      authorRole: textField("Title & Company"),
      avatarUrl: textField("Avatar photo URL"),
      verified: radioField("Show verified customer check", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      backgroundColor: colorField("Card background"),
      borderRadius: selectField("Corner radius", RADIUS_OPTIONS),
      hoverEffect: selectField("Hover micro-animation", HOVER_EFFECT_OPTIONS),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      stars: 5,
      quote:
        "This website builder surpassed our every expectation. The level of customization allowed us to deploy our company flagship in 3 days instead of 3 months.",
      authorName: "Sophia Martinez",
      authorRole: "Head of Product at Nexus Dynamics",
      avatarUrl: "https://i.pravatar.cc/150?u=sophia",
      verified: true,
      backgroundColor: "#ffffff",
      borderRadius: 18,
      hoverEffect: "lift-sm",
      marginTop: "16px",
      marginBottom: "24px",
      ...animationDefaults,
    },
    render: marketingViews.Testimonial,
  },

  // ------------------------------------------------------------------------
  // FEATURE CARD
  // ------------------------------------------------------------------------
  FeatureCard: {
    label: "Feature / Service Box",
    fields: {
      icon: selectField("Icon Symbol", ICON_PRESETS),
      iconColor: colorField("Icon color"),
      iconBg: colorField("Icon container background"),
      badge: textField("Small badge text (Optional)"),
      title: textField("Feature title"),
      description: textareaField("Feature description"),
      linkText: textField("Action link text (Optional)"),
      linkUrl: textField("Action link URL"),
      backgroundColor: colorField("Card background"),
      borderRadius: selectField("Corner radius", RADIUS_OPTIONS),
      hoverEffect: selectField("Hover micro-animation", HOVER_EFFECT_OPTIONS),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      icon: "rocket",
      iconColor: "#4f46e5",
      iconBg: "#eef2ff",
      badge: "NEW",
      title: "Sub-Second Deployment",
      description:
        "Built on high-performance edge infrastructure, delivering instantaneous load times and zero downtime transitions.",
      linkText: "Learn more",
      linkUrl: "#",
      backgroundColor: "#ffffff",
      borderRadius: 16,
      hoverEffect: "lift-md",
      marginTop: "16px",
      marginBottom: "24px",
      ...animationDefaults,
    },
    render: marketingViews.FeatureCard,
  },

  // ------------------------------------------------------------------------
  // STATS COUNTER / METRIC
  // ------------------------------------------------------------------------
  StatsCounter: {
    label: "Metric / Stats Counter",
    fields: {
      number: textField("Big stat value (e.g. 99.9, 10M, 400k)"),
      prefix: textField("Prefix symbol (e.g. $, +)"),
      suffix: textField("Suffix symbol (e.g. %, +, K)"),
      label: textField("Metric label"),
      description: textField("Subtext / description (Optional)"),
      trend: textField("Growth trend badge (e.g. +24% YoY)"),
      color: colorField("Number highlight color"),
      alignment: selectField("Alignment", ALIGNMENT_OPTIONS),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      number: "99.98",
      prefix: "",
      suffix: "%",
      label: "Uptime SLA Guarantee",
      description: "Enterprise reliability tested under peak concurrent load.",
      trend: "+0.4% this quarter",
      color: "#4f46e5",
      alignment: "left",
      marginTop: "16px",
      marginBottom: "20px",
      ...animationDefaults,
    },
    render: marketingViews.StatsCounter,
  },

  // ------------------------------------------------------------------------
  // ACCORDION / FAQ
  // ------------------------------------------------------------------------
  Accordion: {
    label: "Accordion / FAQ List",
    fields: {
      items: {
        type: "array",
        label: "Accordion items",
        arrayFields: {
          title: textField("Question / Heading"),
          content: textareaField("Answer / Details content"),
        },
        defaultItemProps: {
          title: "How does the template editor work?",
          content:
            "The visual editor gives you real-time drag-and-drop customization with WordPress-grade blocks and instantaneous preview.",
        },
        getItemSummary: (item) => item.title || "Accordion item",
      },
      accentColor: colorField("Active icon color"),
      bordered: radioField("Card bordered items", [
        { label: "Bordered cards", value: true },
        { label: "Clean underline dividers", value: false },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      items: [
        {
          title: "Can I customize typography, colors, and layout from scratch?",
          content:
            "Yes! Every component supports full custom styling: font sizes, weights, line heights, linear gradients, custom shadows, and nested containers.",
        },
        {
          title: "Does this support nested columns and layouts?",
          content:
            "Absolutely. Drop Columns, Containers, or Grids, and nest any elements inside them without limitation.",
        },
        {
          title: "Are published pages mobile-responsive?",
          content:
            "All blocks are architected with modern flexbox and grid styling to adapt effortlessly to mobile, tablet, and desktop viewports.",
        },
      ],
      accentColor: "#4f46e5",
      bordered: true,
      marginTop: "20px",
      marginBottom: "28px",
      ...animationDefaults,
    },
    render: marketingViews.Accordion,
  },

  // ------------------------------------------------------------------------
  // TABS COMPONENT
  // ------------------------------------------------------------------------
  Tabs: {
    label: "Interactive Tabs",
    fields: {
      tabStyle: selectField("Tabs header style", [
        { label: "Pills with background", value: "pills" },
        { label: "Underlined border tabs", value: "underline" },
      ]),
      accentColor: colorField("Active tab accent color"),
      tabs: {
        type: "array",
        label: "Tabs list",
        arrayFields: {
          title: textField("Tab label"),
          headline: textField("Panel title"),
          content: textareaField("Panel content"),
        },
        defaultItemProps: {
          title: "Tab 1",
          headline: "Powerful Engine",
          content: "Customize all layout aspects with visual feedback.",
        },
        getItemSummary: (item) => item.title || "Tab",
      },
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      tabStyle: "pills",
      accentColor: "#4f46e5",
      tabs: [
        {
          title: "Performance",
          headline: "Engineered for Sub-Second Speed",
          content:
            "Our rendering pipeline outputs optimized static HTML and lightweight CSS, ensuring your templates score 99+ on Google Lighthouse.",
        },
        {
          title: "Customization",
          headline: "Boundless Creative Freedom",
          content:
            "Granular controls for typography, linear gradients, corner curves, box shadows, and nested slots enable bespoke design implementations.",
        },
        {
          title: "Integrations",
          headline: "Connect With Your Modern Stack",
          content:
            "Seamlessly export clean JSON documents and connect directly with REST APIs, webhooks, and modern relational stores.",
        },
      ],
      marginTop: "16px",
      marginBottom: "24px",
      ...animationDefaults,
    },
    render: marketingViews.Tabs,
  },

  // ------------------------------------------------------------------------
  // LOGO CLOUD (PARTNERS)
  // ------------------------------------------------------------------------
  LogoCloud: {
    label: "Logo Cloud / Partners",
    fields: {
      headline: textField("Section Eyebrow text"),
      grayscale: radioField("Monochrome / Grayscale logos", [
        { label: "Yes (Clean grayscale)", value: true },
        { label: "No (Original colors)", value: false },
      ]),
      opacity: numberField("Logo opacity (%)", 10, 100),
      logos: {
        type: "array",
        label: "Logos list",
        arrayFields: {
          name: textField("Company name"),
          imageUrl: imageField("Logo image URL (SVG/PNG)"),
        },
        defaultItemProps: {
          name: "Partner",
          imageUrl:
            "https://tailwindui.com/plus/img/logos/158x48/transistor-logo-gray-900.svg",
        },
        getItemSummary: (item) => item.name || "Logo",
      },
      responsive: responsiveField("Responsive overrides", [
        { name: "marginTop", label: "Top margin", type: "select", options: SPACING_OPTIONS },
        { name: "marginBottom", label: "Bottom margin", type: "select", options: SPACING_OPTIONS },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      headline: "TRUSTED BY INNOVATIVE TEAMS AT",
      grayscale: true,
      opacity: 75,
      logos: [
        {
          name: "Transistor",
          imageUrl:
            "https://tailwindui.com/plus/img/logos/158x48/transistor-logo-gray-900.svg",
        },
        {
          name: "Reform",
          imageUrl:
            "https://tailwindui.com/plus/img/logos/158x48/reform-logo-gray-900.svg",
        },
        {
          name: "Tuple",
          imageUrl:
            "https://tailwindui.com/plus/img/logos/158x48/tuple-logo-gray-900.svg",
        },
        {
          name: "SavvyCal",
          imageUrl:
            "https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-gray-900.svg",
        },
        {
          name: "Statamic",
          imageUrl:
            "https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-900.svg",
        },
      ],
      marginTop: "20px",
      marginBottom: "28px",
      responsive: {},
      ...animationDefaults,
    },
    render: marketingViews.LogoCloud,
  },

  // ------------------------------------------------------------------------
  // TIMELINE / PROCESS STEPS
  // ------------------------------------------------------------------------
  Timeline: {
    label: "Process Steps / Timeline",
    fields: {
      steps: {
        type: "array",
        label: "Process steps list",
        arrayFields: {
          stepNumber: textField("Step number (e.g. 01)"),
          title: textField("Step title"),
          description: textareaField("Step explanation"),
        },
        defaultItemProps: {
          stepNumber: "01",
          title: "Discovery & Strategy",
          description: "Deep dive into objectives and market landscape.",
        },
        getItemSummary: (item) => `${item.stepNumber}: ${item.title}`,
      },
      stepColor: colorField("Step pill background color"),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      steps: [
        {
          stepNumber: "01",
          title: "Strategy & Architecture",
          description: "Mapping core conversion funnels, data schemas, and user journeys.",
        },
        {
          stepNumber: "02",
          title: "High-Fidelity Design",
          description:
            "Crafting bespoke design systems, typographic hierarchies, and micro-interactions.",
        },
        {
          stepNumber: "03",
          title: "Visual Assembly",
          description:
            "Constructing modular pages using the visual builder engine with live preview.",
        },
        {
          stepNumber: "04",
          title: "Global Launch",
          description: "Sub-second CDN propagation, performance validation, and domain activation.",
        },
      ],
      stepColor: "#4f46e5",
      marginTop: "24px",
      marginBottom: "32px",
      ...animationDefaults,
    },
    render: marketingViews.Timeline,
  },

  // ------------------------------------------------------------------------
  // TEAM MEMBER
  // ------------------------------------------------------------------------
  TeamMember: {
    label: "Team Member Card",
    fields: {
      name: textField("Full name"),
      role: textField("Designation / Role"),
      bio: textareaField("Short bio"),
      avatarUrl: textField("Photo URL"),
      socialTwitter: textField("Twitter/X profile URL"),
      socialLinkedIn: textField("LinkedIn profile URL"),
      socialGitHub: textField("GitHub profile URL"),
      backgroundColor: colorField("Card background"),
      borderRadius: selectField("Corner radius", RADIUS_OPTIONS),
      hoverEffect: selectField("Hover micro-animation", HOVER_EFFECT_OPTIONS),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      name: "Alex Rivera",
      role: "Principal Product Architect",
      bio: "Former design director at Vercel. Obsessed with sub-second interfaces and typographic rigor.",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      socialTwitter: "https://twitter.com",
      socialLinkedIn: "https://linkedin.com",
      socialGitHub: "https://github.com",
      backgroundColor: "#ffffff",
      borderRadius: 18,
      hoverEffect: "lift-md",
      marginTop: "16px",
      marginBottom: "24px",
      ...animationDefaults,
    },
    render: marketingViews.TeamMember,
  },

  // ------------------------------------------------------------------------
  // COUNTDOWN TIMER
  // ------------------------------------------------------------------------
  Countdown: {
    label: "Countdown Timer (Urgency)",
    fields: {
      headline: textField("Urgency title"),
      targetDays: numberField("Days remaining", 0, 365),
      targetHours: numberField("Hours remaining", 0, 23),
      targetMinutes: numberField("Minutes remaining", 0, 59),
      targetSeconds: numberField("Seconds remaining", 0, 59),
      boxBg: colorField("Timer boxes background"),
      boxColor: colorField("Timer digits color"),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      headline: "EXCLUSIVE EARLY ACCESS CLOSES IN:",
      targetDays: 4,
      targetHours: 18,
      targetMinutes: 32,
      targetSeconds: 45,
      boxBg: "#0f172a",
      boxColor: "#ffffff",
      marginTop: "16px",
      marginBottom: "24px",
      ...animationDefaults,
    },
    render: marketingViews.Countdown,
  },
};

// Aliases for backward compatibility with templates that might reference Features
marketingComponents.Features = marketingComponents.FeatureCard;

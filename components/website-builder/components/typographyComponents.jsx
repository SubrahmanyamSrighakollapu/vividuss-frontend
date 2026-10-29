"use client";
import { typographyViews } from "../views/typographyViews.jsx";

import { animationFields, animationDefaults } from "../fields/animationFields.js";
import { boxStyleFields, spacingFields, commonDesignDefaults } from "../fields/boxStyleFields.js";
import { selectField, numberField, textField, textareaField, radioField, colorField, responsiveField } from "../fields/helpers.js";
import { typographyFields, typographyDefaults } from "../fields/typographyFields.js";

import { RADIUS_OPTIONS, ALIGNMENT_OPTIONS, SPACING_OPTIONS } from "../tokens/index.js";
import { ICON_PRESETS } from "./icons.jsx";

export const typographyComponents = {
  // ------------------------------------------------------------------------
  // HEADING
  // ------------------------------------------------------------------------
  Heading: {
    label: "Heading (H1 - H6)",
    fields: {
      text: textField("Heading text"),
      level: selectField("HTML Tag level", [
        { label: "H1 — Main Title", value: "h1" },
        { label: "H2 — Section Title", value: "h2" },
        { label: "H3 — Subsection Title", value: "h3" },
        { label: "H4 — Card Title", value: "h4" },
        { label: "H5 — Small Title", value: "h5" },
        { label: "H6 — Micro Title", value: "h6" },
      ]),
      ...typographyFields,
      responsive: responsiveField("Responsive overrides", [
        { name: "fontSize", label: "Font size (px)", type: "number", min: 8, max: 160 },
        { name: "lineHeight", label: "Line height", type: "number", min: 0.5, max: 3, step: 0.1 },
        { name: "letterSpacing", label: "Letter spacing (px)", type: "number", min: -10, max: 30, step: 0.5 },
        { name: "textAlign", label: "Text align", type: "select", options: ALIGNMENT_OPTIONS },
        { name: "maxWidth", label: "Max width (e.g. 100%, 800px)", type: "text" },
        { name: "marginTop", label: "Top margin", type: "select", options: SPACING_OPTIONS },
        { name: "marginBottom", label: "Bottom margin", type: "select", options: SPACING_OPTIONS },
        { name: "paddingX", label: "Horizontal padding", type: "select", options: SPACING_OPTIONS },
        { name: "paddingY", label: "Vertical padding", type: "select", options: SPACING_OPTIONS },
      ]),
      ...spacingFields,
      ...boxStyleFields,
      ...animationFields,
    },
    defaultProps: {
      text: "Design Without Limits",
      level: "h2",
      ...typographyDefaults,
      fontSize: 42,
      fontWeight: "800",
      lineHeight: 1.15,
      letterSpacing: -1,
      color: "#0f172a",
      ...commonDesignDefaults,
      marginBottom: "16px",
      responsive: {
        tablet: {
          fontSize: 32,
        },
        mobile: {
          fontSize: 24,
          textAlign: "center",
        },
      },
      ...animationDefaults,
    },
    render: typographyViews.Heading,
  },

  // ------------------------------------------------------------------------
  // TEXT / PARAGRAPH
  // ------------------------------------------------------------------------
  Text: {
    label: "Paragraph",
    fields: {
      text: textareaField("Paragraph text content"),
      dropCap: radioField("Drop cap (First big letter)", [
        { label: "Disabled", value: false },
        { label: "Enabled", value: true },
      ]),
      ...typographyFields,
      responsive: responsiveField("Responsive overrides", [
        { name: "fontSize", label: "Font size (px)", type: "number", min: 8, max: 80 },
        { name: "lineHeight", label: "Line height", type: "number", min: 0.5, max: 3, step: 0.1 },
        { name: "textAlign", label: "Text align", type: "select", options: ALIGNMENT_OPTIONS },
        { name: "maxWidth", label: "Max width (e.g. 100%, 650px)", type: "text" },
        { name: "marginTop", label: "Top margin", type: "select", options: SPACING_OPTIONS },
        { name: "marginBottom", label: "Bottom margin", type: "select", options: SPACING_OPTIONS },
        { name: "paddingX", label: "Horizontal padding", type: "select", options: SPACING_OPTIONS },
        { name: "paddingY", label: "Vertical padding", type: "select", options: SPACING_OPTIONS },
      ]),
      ...spacingFields,
      ...boxStyleFields,
      ...animationFields,
    },
    defaultProps: {
      text: "Empower your creative vision with unprecedented control. Every element, spacing, typography, and animation can be tuned with precision to match your highest standards.",
      dropCap: false,
      ...typographyDefaults,
      fontSize: 18,
      color: "#475569",
      lineHeight: 1.75,
      ...commonDesignDefaults,
      marginBottom: "20px",
      responsive: {
        tablet: {
          fontSize: 16,
        },
        mobile: {
          fontSize: 15,
        },
      },
      ...animationDefaults,
    },
    render: typographyViews.Text,
  },

  // ------------------------------------------------------------------------
  // RICH TEXT
  // ------------------------------------------------------------------------
  RichText: {
    label: "Rich Text",
    fields: {
      text: textareaField("Rich content (accepts HTML or paragraphs)"),
      ...typographyFields,
      responsive: responsiveField("Responsive overrides", [
        { name: "fontSize", label: "Font size (px)", type: "number", min: 8, max: 80 },
        { name: "lineHeight", label: "Line height", type: "number", min: 0.5, max: 3, step: 0.1 },
        { name: "textAlign", label: "Text align", type: "select", options: ALIGNMENT_OPTIONS },
        { name: "maxWidth", label: "Max width (e.g. 100%, 750px)", type: "text" },
        { name: "marginTop", label: "Top margin", type: "select", options: SPACING_OPTIONS },
        { name: "marginBottom", label: "Bottom margin", type: "select", options: SPACING_OPTIONS },
        { name: "paddingX", label: "Horizontal padding", type: "select", options: SPACING_OPTIONS },
        { name: "paddingY", label: "Vertical padding", type: "select", options: SPACING_OPTIONS },
      ]),
      ...spacingFields,
      ...boxStyleFields,
      ...animationFields,
    },
    defaultProps: {
      text: "Elevate your digital presence. Craft bespoke visual identities with modular design components engineered for speed, beauty, and conversion.",
      ...typographyDefaults,
      fontSize: 16,
      color: "#334155",
      lineHeight: 1.8,
      ...commonDesignDefaults,
      marginBottom: "16px",
      responsive: {},
      ...animationDefaults,
    },
    render: typographyViews.RichText,
  },

  // ------------------------------------------------------------------------
  // LABEL / EYEBROW
  // ------------------------------------------------------------------------
  Label: {
    label: "Badge / Eyebrow Text",
    fields: {
      text: textField("Badge text"),
      icon: selectField("Icon (Optional)", ICON_PRESETS),
      pillStyle: selectField("Style preset", [
        { label: "Modern Violet", value: "violet" },
        { label: "Emerald Success", value: "emerald" },
        { label: "Blue Tech", value: "blue" },
        { label: "Amber Warning", value: "amber" },
        { label: "Dark Minimal", value: "dark" },
        { label: "Ghost / Outline", value: "outline" },
        { label: "Custom Colors", value: "custom" },
      ]),
      customBg: colorField("Custom background"),
      customColor: colorField("Custom text color"),
      customBorder: colorField("Custom border color"),
      borderRadius: selectField("Corner radius", RADIUS_OPTIONS),
      fontSize: numberField("Font size (px)", 8, 30),
      responsive: responsiveField("Responsive overrides", [
        { name: "fontSize", label: "Font size (px)", type: "number", min: 8, max: 30 },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      text: "NEXT GENERATION STUDIO",
      icon: "sparkles",
      pillStyle: "violet",
      customBg: "#f5f3ff",
      customColor: "#6d28d9",
      customBorder: "#ddd6fe",
      borderRadius: 9999,
      fontSize: 12,
      marginTop: "0px",
      marginBottom: "12px",
      responsive: {},
      ...animationDefaults,
    },
    render: typographyViews.Label,
  },

  // ------------------------------------------------------------------------
  // BLOCKQUOTE
  // ------------------------------------------------------------------------
  Blockquote: {
    label: "Blockquote / Pull Quote",
    fields: {
      quote: textareaField("Quote text"),
      author: textField("Author name"),
      role: textField("Author role / company"),
      avatarUrl: textField("Author avatar image URL"),
      accentColor: colorField("Accent border color"),
      quoteSize: numberField("Quote font size (px)", 14, 48),
      responsive: responsiveField("Responsive overrides", [
        { name: "fontSize", label: "Quote size (px)", type: "number", min: 12, max: 60 },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      quote:
        "Good design is obvious. Great design is transparent. We don't just build websites; we build the future of brand experiences.",
      author: "Marcus Vance",
      role: "Chief Design Officer, Apex Global",
      avatarUrl: "https://i.pravatar.cc/150?u=quote",
      accentColor: "#6366f1",
      quoteSize: 22,
      marginTop: "16px",
      marginBottom: "24px",
      responsive: {},
      ...animationDefaults,
    },
    render: typographyViews.Blockquote,
  },
};

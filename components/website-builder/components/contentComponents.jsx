"use client";
import { contentViews } from "../views/contentViews.jsx";

import { animationFields, animationDefaults } from "../fields/animationFields.js";
import { boxStyleFields, spacingFields } from "../fields/boxStyleFields.js";
import { selectField, numberField, textField, textareaField, radioField, colorField, imageField, responsiveField } from "../fields/helpers.js";

import { SPACING_OPTIONS } from "../tokens/index.js";

export const contentComponents = {
  // ------------------------------------------------------------------------
  // CARD (SLOT & CONTENT - HIGHLY CUSTOMIZABLE)
  // ------------------------------------------------------------------------
  Card: {
    label: "Card (Slot & Content)",
    fields: {
      content: { type: "slot" },
      imageUrl: imageField("Header image URL (Optional)"),
      imageHeight: numberField("Image height (px)", 100, 600),
      imageFit: selectField("Image object-fit", [
        { label: "Cover (Fill)", value: "cover" },
        { label: "Contain (Natural)", value: "contain" },
      ]),
      title: textField("Card title"),
      titleSize: numberField("Title font size (px)", 14, 48),
      titleColor: colorField("Title text color"),
      description: textareaField("Card description"),
      descriptionColor: colorField("Description text color"),
      badge: textField("Small badge text (Optional)"),
      badgeBg: colorField("Badge background color"),
      badgeColor: colorField("Badge text color"),
      primaryButtonText: textField("Action button text (Optional)"),
      primaryButtonUrl: textField("Action link"),
      primaryButtonBg: colorField("Primary button background"),
      primaryButtonColor: colorField("Primary button text color"),
      secondaryButtonText: textField("Secondary link text (Optional)"),
      secondaryButtonUrl: textField("Secondary link URL"),
      responsive: responsiveField("Responsive overrides", [
        { name: "width", label: "Width (e.g. 100%, 400px)", type: "text" },
        { name: "maxWidth", label: "Max width (e.g. 100%, 600px)", type: "text" },
        { name: "paddingY", label: "Vertical padding (px)", type: "number", min: 0, max: 120 },
        { name: "paddingX", label: "Horizontal padding (px)", type: "number", min: 0, max: 120 },
        { name: "marginTop", label: "Top margin", type: "select", options: SPACING_OPTIONS },
        { name: "marginBottom", label: "Bottom margin", type: "select", options: SPACING_OPTIONS },
      ]),
      ...boxStyleFields,
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      content: [],
      imageUrl:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      imageHeight: 220,
      imageFit: "cover",
      title: "Modern Flagship Experience",
      titleSize: 20,
      titleColor: "#0f172a",
      description:
        "Transform complex operational requirements into fluid, distinctive digital experiences that convert.",
      descriptionColor: "#64748b",
      badge: "FEATURED",
      badgeBg: "#eff6ff",
      badgeColor: "#1d4ed8",
      primaryButtonText: "Explore Project",
      primaryButtonUrl: "#",
      primaryButtonBg: "#4f46e5",
      primaryButtonColor: "#ffffff",
      secondaryButtonText: "",
      secondaryButtonUrl: "#",
      backgroundColor: "#ffffff",
      borderRadius: 16,
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
      hoverEffect: "lift-md",
      marginTop: "16px",
      marginBottom: "24px",
      ...animationDefaults,
    },
    render: contentViews.Card,
  },

  // ------------------------------------------------------------------------
  // BADGE
  // ------------------------------------------------------------------------
  Badge: {
    label: "Micro Badge / Status Pill",
    fields: {
      text: textField("Badge text"),
      customBg: colorField("Background color"),
      customColor: colorField("Text color"),
      customDotColor: colorField("Pulse dot indicator color"),
      fontSize: numberField("Font size (px)", 9, 24),
      hasDot: radioField("Show pulse dot indicator", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      ...animationFields,
    },
    defaultProps: {
      text: "System Operational",
      customBg: "#ecfdf5",
      customColor: "#047857",
      customDotColor: "#10b981",
      fontSize: 12,
      hasDot: true,
      ...animationDefaults,
    },
    render: contentViews.Badge,
  },

  // ------------------------------------------------------------------------
  // LIST
  // ------------------------------------------------------------------------
  List: {
    label: "List with Icons",
    fields: {
      items: {
        type: "array",
        label: "List items",
        arrayFields: {
          text: textField("Item text"),
        },
        defaultItemProps: {
          text: "Modular architecture designed for rapid iteration",
        },
        getItemSummary: (item) => item.text || "Item",
      },
      icon: selectField("Bullet Icon", [
        { label: "Checkmark", value: "check" },
        { label: "Star", value: "star" },
        { label: "Zap", value: "zap" },
        { label: "Arrow Right", value: "arrow-right" },
        { label: "Sparkles", value: "sparkles" },
        { label: "None", value: "none" },
      ]),
      iconColor: colorField("Icon color"),
      color: colorField("Text color"),
      fontSize: numberField("Font size (px)", 12, 32),
      gap: numberField("Item spacing (px)", 4, 40),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      items: [
        { text: "Production-ready TypeScript & React architecture" },
        { text: "Zero layout shift with fluid clamp typography" },
        { text: "Server-side caching and sub-second asset streaming" },
      ],
      icon: "check",
      iconColor: "#10b981",
      color: "#334155",
      fontSize: 15,
      gap: 12,
      marginTop: "12px",
      marginBottom: "16px",
      ...animationDefaults,
    },
    render: contentViews.List,
  },

  // ------------------------------------------------------------------------
  // ALERT BANNER / NOTICE
  // ------------------------------------------------------------------------
  AlertBanner: {
    label: "Alert / Notification Box",
    fields: {
      title: textField("Alert title"),
      message: textareaField("Alert message content"),
      icon: selectField("Icon", [
        { label: "Sparkles", value: "sparkles" },
        { label: "Checkmark", value: "check" },
        { label: "Flame", value: "flame" },
        { label: "Shield", value: "shield" },
        { label: "Bell", value: "bell" },
        { label: "None", value: "none" },
      ]),
      bgColor: colorField("Background color"),
      borderColor: colorField("Border line color"),
      textColor: colorField("Text color"),
      dismissible: radioField("Allow dismiss button", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      title: "Scheduled Maintenance Window",
      message: "Platform updates are scheduled for Sunday at 02:00 UTC. Zero downtime expected.",
      icon: "sparkles",
      bgColor: "#eff6ff",
      borderColor: "#bfdbfe",
      textColor: "#1e40af",
      dismissible: true,
      marginTop: "16px",
      marginBottom: "20px",
      ...animationDefaults,
    },
    render: contentViews.AlertBanner,
  },
};

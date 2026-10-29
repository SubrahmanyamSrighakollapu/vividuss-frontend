"use client";
import { mediaViews } from "../views/mediaViews.jsx";

import { animationFields, animationDefaults } from "../fields/animationFields.js";
import { spacingFields, commonDesignDefaults } from "../fields/boxStyleFields.js";
import { selectField, numberField, textField, textareaField, radioField, colorField, imageField, responsiveField } from "../fields/helpers.js";

import { ALIGNMENT_OPTIONS, HOVER_EFFECT_OPTIONS, RADIUS_OPTIONS, SHADOW_PRESETS, SPACING_OPTIONS } from "../tokens/index.js";
import { ICON_PRESETS } from "./icons.jsx";

export const mediaComponents = {
  // ------------------------------------------------------------------------
  // IMAGE
  // ------------------------------------------------------------------------
  Image: {
    label: "Image (Single)",
    fields: {
      src: imageField("Image URL"),
      alt: textField("Alternative text"),
      caption: textField("Image caption (Optional)"),
      aspectRatio: selectField("Aspect ratio", [
        { label: "Auto (Natural)", value: "auto" },
        { label: "16:9 (Landscape)", value: "16 / 9" },
        { label: "4:3 (Classic)", value: "4 / 3" },
        { label: "1:1 (Square)", value: "1 / 1" },
        { label: "9:16 (Story / Vertical)", value: "9 / 16" },
        { label: "21:9 (Cinematic)", value: "21 / 9" },
      ]),
      objectFit: selectField("Image fit", [
        { label: "Cover", value: "cover" },
        { label: "Contain", value: "contain" },
        { label: "Fill", value: "fill" },
      ]),
      height: numberField("Height (px, 0 for auto)", 0, 1600),
      borderRadius: selectField("Corner radius", RADIUS_OPTIONS),
      boxShadow: selectField("Shadow preset", SHADOW_PRESETS),
      opacity: numberField("Opacity (%)", 0, 100),
      hoverEffect: selectField("Hover micro-animation", HOVER_EFFECT_OPTIONS),
      responsive: responsiveField("Responsive overrides", [
        {
          name: "width",
          label: "Width (e.g. 100%, 80%, 400px)",
          type: "text",
        },
        {
          name: "maxWidth",
          label: "Max Width (e.g. 100%, 600px, none)",
          type: "text",
        },
        {
          name: "aspectRatio",
          label: "Aspect ratio",
          type: "select",
          options: [
            { label: "Auto (Natural)", value: "auto" },
            { label: "16:9 (Landscape)", value: "16 / 9" },
            { label: "4:3 (Classic)", value: "4 / 3" },
            { label: "1:1 (Square)", value: "1 / 1" },
            { label: "9:16 (Story / Vertical)", value: "9 / 16" },
            { label: "21:9 (Cinematic)", value: "21 / 9" },
          ],
        },
        { name: "height", label: "Height (px, 0 for auto)", type: "number", min: 0, max: 1600 },
        {
          name: "objectFit",
          label: "Image fit",
          type: "select",
          options: [
            { label: "Cover", value: "cover" },
            { label: "Contain", value: "contain" },
            { label: "Fill", value: "fill" },
          ],
        },
        {
          name: "textAlign",
          label: "Alignment",
          type: "select",
          options: ALIGNMENT_OPTIONS,
        },
        { name: "marginTop", label: "Top margin", type: "select", options: SPACING_OPTIONS },
        { name: "marginBottom", label: "Bottom margin", type: "select", options: SPACING_OPTIONS },
        { name: "paddingX", label: "Horizontal padding", type: "select", options: SPACING_OPTIONS },
        { name: "paddingY", label: "Vertical padding", type: "select", options: SPACING_OPTIONS },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      alt: "Creative studio workspace",
      caption: "",
      aspectRatio: "16 / 9",
      objectFit: "cover",
      height: 0,
      borderRadius: 16,
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.09)",
      opacity: 100,
      hoverEffect: "lift-sm",
      ...commonDesignDefaults,
      responsive: {},
      ...animationDefaults,
    },
    render: mediaViews.Image,
  },

  // ------------------------------------------------------------------------
  // IMAGE GALLERY
  // ------------------------------------------------------------------------
  ImageGallery: {
    label: "Image Gallery Grid",
    fields: {
      columns: selectField("Gallery columns", [
        { label: "1 Column (Mobile)", value: "1" },
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ]),
      gap: numberField("Grid gap (px)", 4, 60),
      images: {
        type: "array",
        label: "Gallery images list",
        arrayFields: {
          url: imageField("Image URL"),
          alt: textField("Alt description"),
          caption: textField("Caption"),
        },
        defaultItemProps: {
          url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
          alt: "Code and design",
          caption: "Modern architecture",
        },
        getItemSummary: (item) => item.caption || item.alt || "Gallery item",
      },
      aspectRatio: selectField("Aspect ratio", [
        { label: "Square (1:1)", value: "1 / 1" },
        { label: "Landscape (4:3)", value: "4 / 3" },
        { label: "Widescreen (16:9)", value: "16 / 9" },
      ]),
      borderRadius: selectField("Corner radius", RADIUS_OPTIONS),
      responsive: responsiveField("Responsive overrides", [
        {
          name: "columns",
          label: "Gallery columns",
          type: "select",
          options: [
            { label: "1 Column (Stacked)", value: "1" },
            { label: "2 Columns", value: "2" },
            { label: "3 Columns", value: "3" },
            { label: "4 Columns", value: "4" },
          ],
        },
        { name: "gap", label: "Grid gap (px)", type: "number", min: 4, max: 60 },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      columns: "3",
      gap: 16,
      images: [
        {
          url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
          alt: "Analytics",
          caption: "Data Driven",
        },
        {
          url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
          alt: "Collaboration",
          caption: "Team Synergy",
        },
        {
          url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
          alt: "Fintech",
          caption: "Financial Growth",
        },
      ],
      aspectRatio: "4 / 3",
      borderRadius: 12,
      marginTop: "16px",
      marginBottom: "24px",
      responsive: {},
      ...animationDefaults,
    },
    render: mediaViews.ImageGallery,
  },

  // ------------------------------------------------------------------------
  // VIDEO PLAYER
  // ------------------------------------------------------------------------
  Video: {
    label: "Video Embed (YouTube / MP4)",
    fields: {
      url: textField("Video URL (YouTube embed or MP4 direct link)"),
      aspectRatio: selectField("Aspect ratio", [
        { label: "16:9 (Standard Widescreen)", value: "16 / 9" },
        { label: "4:3 (Classic TV)", value: "4 / 3" },
        { label: "1:1 (Square)", value: "1 / 1" },
        { label: "9:16 (Shorts / Reels)", value: "9 / 16" },
      ]),
      borderRadius: selectField("Corner radius", RADIUS_OPTIONS),
      boxShadow: selectField("Shadow preset", SHADOW_PRESETS),
      autoplay: radioField("Autoplay (Muted)", [
        { label: "No", value: false },
        { label: "Yes", value: true },
      ]),
      responsive: responsiveField("Responsive overrides", [
        {
          name: "aspectRatio",
          label: "Aspect ratio",
          type: "select",
          options: [
            { label: "16:9 (Standard Widescreen)", value: "16 / 9" },
            { label: "4:3 (Classic TV)", value: "4 / 3" },
            { label: "1:1 (Square)", value: "1 / 1" },
            { label: "9:16 (Shorts / Reels)", value: "9 / 16" },
          ],
        },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      aspectRatio: "16 / 9",
      borderRadius: 16,
      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
      autoplay: false,
      marginTop: "16px",
      marginBottom: "24px",
      responsive: {},
      ...animationDefaults,
    },
    render: mediaViews.Video,
  },

  // ------------------------------------------------------------------------
  // ICON BOX
  // ------------------------------------------------------------------------
  IconBox: {
    label: "Icon / Feature Badge",
    fields: {
      icon: selectField("Icon Symbol", ICON_PRESETS),
      iconSize: numberField("Icon size (px)", 12, 120),
      iconColor: colorField("Icon color"),
      backgroundShape: selectField("Background container shape", [
        { label: "None (Raw icon)", value: "none" },
        { label: "Circle", value: "circle" },
        { label: "Rounded square", value: "rounded" },
        { label: "Sharp square", value: "square" },
      ]),
      backgroundColor: colorField("Background color"),
      border: radioField("Include border ring", [
        { label: "No border", value: false },
        { label: "1px border ring", value: true },
      ]),
      borderColor: colorField("Border ring color"),
      alignment: selectField("Alignment", ALIGNMENT_OPTIONS),
      hoverEffect: selectField("Hover micro-animation", HOVER_EFFECT_OPTIONS),
      responsive: responsiveField("Responsive overrides", [
        { name: "iconSize", label: "Icon size (px)", type: "number", min: 12, max: 120 },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      icon: "zap",
      iconSize: 28,
      iconColor: "#4f46e5",
      backgroundShape: "rounded",
      backgroundColor: "#eef2ff",
      border: true,
      borderColor: "#c7d2fe",
      alignment: "left",
      hoverEffect: "lift-sm",
      marginTop: "8px",
      marginBottom: "16px",
      responsive: {},
      ...animationDefaults,
    },
    render: mediaViews.IconBox,
  },

  // ------------------------------------------------------------------------
  // MAP EMBED
  // ------------------------------------------------------------------------
  MapEmbed: {
    label: "Map Embed",
    fields: {
      location: textField("Location query or address"),
      zoom: numberField("Zoom level", 1, 20),
      height: numberField("Height (px)", 150, 800),
      borderRadius: selectField("Corner radius", RADIUS_OPTIONS),
      responsive: responsiveField("Responsive overrides", [
        { name: "height", label: "Height (px)", type: "number", min: 150, max: 800 },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      location: "San Francisco, CA",
      zoom: 14,
      height: 380,
      borderRadius: 16,
      marginTop: "16px",
      marginBottom: "24px",
      responsive: {},
      ...animationDefaults,
    },
    render: mediaViews.MapEmbed,
  },

  // ------------------------------------------------------------------------
  // CODE SNIPPET (TERMINAL WINDOW)
  // ------------------------------------------------------------------------
  CodeSnippet: {
    label: "Code Snippet / Terminal",
    fields: {
      code: textareaField("Code contents"),
      language: textField("Language badge (e.g. typescript, bash, python)"),
      windowTitle: textField("Window title (Optional)"),
      theme: selectField("Terminal theme", [
        { label: "Dark Slate", value: "dark" },
        { label: "Monokai Black", value: "black" },
        { label: "Clean White", value: "light" },
      ]),
      fontSize: numberField("Font size (px)", 10, 24),
      responsive: responsiveField("Responsive overrides", [
        { name: "fontSize", label: "Font size (px)", type: "number", min: 10, max: 24 },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      code: `import { createClient } from "@studio/engine";\n\nconst client = createClient({\n  apiKey: process.env.API_KEY,\n  environment: "production"\n});\n\nawait client.sites.deploy();`,
      language: "typescript",
      windowTitle: "terminal ~ bash",
      theme: "dark",
      fontSize: 14,
      marginTop: "16px",
      marginBottom: "24px",
      responsive: {},
      ...animationDefaults,
    },
    render: mediaViews.CodeSnippet,
  },
};

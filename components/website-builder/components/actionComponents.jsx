"use client";
import { actionViews } from "../views/actionViews.jsx";

import { animationFields, animationDefaults } from "../fields/animationFields.js";
import { spacingFields, commonDesignDefaults } from "../fields/boxStyleFields.js";
import { selectField, numberField, textField, radioField, colorField, responsiveField } from "../fields/helpers.js";
import { typographyFields, typographyDefaults } from "../fields/typographyFields.js";

import { ALIGNMENT_OPTIONS, FONT_WEIGHT_OPTIONS, HOVER_EFFECT_OPTIONS, RADIUS_OPTIONS } from "../tokens/index.js";
import { ICON_PRESETS } from "./icons.jsx";

export const actionComponents = {
  // ------------------------------------------------------------------------
  // BUTTON
  // ------------------------------------------------------------------------
  Button: {
    label: "Interactive Button",
    fields: {
      label: textField("Button text"),
      href: textField("Destination link URL"),
      target: selectField("Open target", [
        { label: "Same tab (_self)", value: "_self" },
        { label: "New tab (_blank)", value: "_blank" },
      ]),
      variant: selectField("Button style variant", [
        { label: "Solid Primary", value: "solid" },
        { label: "Gradient Glow", value: "gradient" },
        { label: "Clean Outline", value: "outline" },
        { label: "Soft Tint", value: "soft" },
        { label: "Glassmorphism Blur", value: "glass" },
      ]),
      backgroundColor: colorField("Background color (for Solid)"),
      color: colorField("Text color"),
      gradientFrom: colorField("Gradient color 1 (From)"),
      gradientTo: colorField("Gradient color 2 (To)"),
      icon: selectField("Leading / Trailing Icon", ICON_PRESETS),
      iconPosition: selectField("Icon position", [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ]),
      fontSize: numberField("Font size (px)", 10, 36),
      fontWeight: selectField("Font weight", FONT_WEIGHT_OPTIONS),
      paddingX: numberField("Horizontal padding (px)", 4, 80),
      paddingY: numberField("Vertical padding (px)", 4, 60),
      borderRadius: selectField("Corner radius", RADIUS_OPTIONS),
      hoverEffect: selectField("Hover micro-animation", HOVER_EFFECT_OPTIONS),
      fullWidth: radioField("Full width width", [
        { label: "Auto width", value: false },
        { label: "Full width (100%)", value: true },
      ]),
      alignment: selectField("Alignment in container", ALIGNMENT_OPTIONS),
      responsive: responsiveField("Responsive overrides", [
        { name: "fontSize", label: "Font size (px)", type: "number", min: 10, max: 36 },
        { name: "paddingX", label: "Horizontal padding (px)", type: "number", min: 4, max: 80 },
        { name: "paddingY", label: "Vertical padding (px)", type: "number", min: 4, max: 60 },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      label: "Get Started Now",
      href: "#",
      target: "_self",
      variant: "solid",
      backgroundColor: "#0f172a",
      color: "#ffffff",
      gradientFrom: "#4f46e5",
      gradientTo: "#06b6d4",
      icon: "arrow-right",
      iconPosition: "right",
      fontSize: 15,
      fontWeight: "600",
      paddingX: 24,
      paddingY: 13,
      borderRadius: 10,
      hoverEffect: "lift-sm",
      fullWidth: false,
      alignment: "left",
      marginTop: "8px",
      marginBottom: "16px",
      responsive: {
        mobile: {
          fullWidth: true,
          fontSize: 14,
        },
      },
      ...animationDefaults,
    },
    render: actionViews.Button,
  },

  // ------------------------------------------------------------------------
  // BUTTON GROUP
  // ------------------------------------------------------------------------
  ButtonGroup: {
    label: "Button Pair / Actions Group",
    fields: {
      primaryText: textField("Primary button text"),
      primaryUrl: textField("Primary link URL"),
      primaryBg: colorField("Primary background color"),
      primaryColor: colorField("Primary text color"),
      secondaryText: textField("Secondary button text"),
      secondaryUrl: textField("Secondary link URL"),
      secondaryBg: colorField("Secondary background color"),
      secondaryColor: colorField("Secondary text color"),
      alignment: selectField("Alignment", ALIGNMENT_OPTIONS),
      gap: numberField("Spacing between buttons (px)", 0, 60),
      responsive: responsiveField("Responsive overrides", [
        {
          name: "direction",
          label: "Stacking direction",
          type: "select",
          options: [
            { label: "Row (Side by side)", value: "row" },
            { label: "Column (Stacked vertically)", value: "column" },
          ],
        },
        { name: "gap", label: "Spacing between buttons (px)", type: "number", min: 0, max: 60 },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      primaryText: "Start Building Free",
      primaryUrl: "#signup",
      primaryBg: "#0f172a",
      primaryColor: "#ffffff",
      secondaryText: "Book a Demo",
      secondaryUrl: "#demo",
      secondaryBg: "transparent",
      secondaryColor: "#0f172a",
      alignment: "left",
      gap: 16,
      marginTop: "16px",
      marginBottom: "24px",
      responsive: {
        mobile: {
          direction: "column",
          fullWidth: true,
        },
      },
      ...animationDefaults,
    },
    render: actionViews.ButtonGroup,
  },

  // ------------------------------------------------------------------------
  // LINK
  // ------------------------------------------------------------------------
  Link: {
    label: "Text Link",
    fields: {
      text: textField("Link label text"),
      href: textField("Destination URL"),
      target: selectField("Target", [
        { label: "Same tab (_self)", value: "_self" },
        { label: "New tab (_blank)", value: "_blank" },
      ]),
      arrow: radioField("Show animated arrow", [
        { label: "None", value: false },
        { label: "Include arrow →", value: true },
      ]),
      ...typographyFields,
      responsive: responsiveField("Responsive overrides", [
        { name: "fontSize", label: "Font size (px)", type: "number", min: 10, max: 36 },
        { name: "textAlign", label: "Text align", type: "select", options: ALIGNMENT_OPTIONS },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      text: "Explore our documentation",
      href: "#",
      target: "_self",
      arrow: true,
      ...typographyDefaults,
      color: "#4f46e5",
      fontWeight: "600",
      textDecoration: "none",
      ...commonDesignDefaults,
      responsive: {},
      ...animationDefaults,
    },
    render: actionViews.Link,
  },
};

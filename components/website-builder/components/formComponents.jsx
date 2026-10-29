"use client";
import { formViews } from "../views/formViews.jsx";

import { animationFields, animationDefaults } from "../fields/animationFields.js";
import { spacingFields } from "../fields/boxStyleFields.js";
import { textField, textareaField, radioField, colorField, responsiveField } from "../fields/helpers.js";

export const formComponents = {
  // ------------------------------------------------------------------------
  // CONTACT FORM
  // ------------------------------------------------------------------------
  ContactForm: {
    label: "Contact & Lead Form",
    fields: {
      heading: textField("Form title"),
      description: textareaField("Form subtitle"),
      buttonText: textField("Submit button label"),
      accentColor: colorField("Button background color"),
      includePhone: radioField("Include Phone Number input", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      includeSubject: radioField("Include Subject selector", [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ]),
      responsive: responsiveField("Responsive overrides", [
        { name: "width", label: "Form width (e.g. 100%, 600px)", type: "text" },
        { name: "maxWidth", label: "Max width (e.g. 100%, 700px)", type: "text" },
        { name: "gap", label: "Field spacing gap (px)", type: "number", min: 4, max: 48 },
        { name: "paddingY", label: "Vertical padding (px)", type: "number", min: 16, max: 80 },
        { name: "paddingX", label: "Horizontal padding (px)", type: "number", min: 12, max: 60 },
        { name: "marginTop", label: "Top margin (px)", type: "text" },
        { name: "marginBottom", label: "Bottom margin (px)", type: "text" },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      heading: "Start a Conversation",
      description:
        "Tell us about your project or inquiry. Our engineering team responds within 24 hours.",
      buttonText: "Send Inquiry",
      accentColor: "#4f46e5",
      includePhone: true,
      includeSubject: true,
      marginTop: "16px",
      marginBottom: "28px",
      responsive: {
        tablet: {
          paddingY: 36,
          paddingX: 20,
        },
        mobile: {
          paddingY: 24,
          paddingX: 16,
        },
      },
      ...animationDefaults,
    },
    render: formViews.ContactForm,
  },

  // ------------------------------------------------------------------------
  // NEWSLETTER CAPTURE
  // ------------------------------------------------------------------------
  Newsletter: {
    label: "Newsletter / Email Bar",
    fields: {
      headline: textField("Headline"),
      description: textField("Subtext"),
      buttonText: textField("Button text"),
      placeholder: textField("Input placeholder"),
      guarantee: textField("Privacy guarantee footnote"),
      accentColor: colorField("Button color"),
      responsive: responsiveField("Responsive overrides", [
        { name: "width", label: "Form width (e.g. 100%, 600px)", type: "text" },
        { name: "maxWidth", label: "Max width (e.g. 100%, 700px)", type: "text" },
        { name: "gap", label: "Field spacing gap (px)", type: "number", min: 4, max: 48 },
        { name: "paddingY", label: "Vertical padding (px)", type: "number", min: 16, max: 80 },
        { name: "paddingX", label: "Horizontal padding (px)", type: "number", min: 12, max: 60 },
        { name: "marginTop", label: "Top margin (px)", type: "text" },
        { name: "marginBottom", label: "Bottom margin (px)", type: "text" },
      ]),
      ...spacingFields,
      ...animationFields,
    },
    defaultProps: {
      headline: "Stay Ahead of Digital Innovation",
      description:
        "Join 15,000+ engineers, designers, and founders getting our weekly architectural teardowns.",
      buttonText: "Subscribe",
      placeholder: "Enter your work email...",
      guarantee: "Zero spam. One-click unsubscribe anytime.",
      accentColor: "#0f172a",
      marginTop: "20px",
      marginBottom: "24px",
      responsive: {
        mobile: {
          paddingY: 20,
        },
      },
      ...animationDefaults,
    },
    render: formViews.Newsletter,
  },
};

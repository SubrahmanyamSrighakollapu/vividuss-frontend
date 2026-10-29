"use client";
import "./animation/animation.css";
import contracts from "../../shared/website-contract/component-contracts.json";
import { pageViews } from "./views/PageRoot.jsx";
import { layoutViews } from "./views/layoutViews.jsx";
import { typographyViews } from "./views/typographyViews.jsx";
import { actionViews } from "./views/actionViews.jsx";
import { mediaViews } from "./views/mediaViews.jsx";
import { contentViews } from "./views/contentViews.jsx";
import { navigationViews } from "./views/navigationViews.jsx";
import { marketingViews } from "./views/marketingViews.jsx";
import { formViews } from "./views/formViews.jsx";
import { industryViews } from "./views/industryViews.jsx";

export const sharedViews = { ...layoutViews, ...typographyViews, ...actionViews,
  ...mediaViews, ...contentViews, ...navigationViews, ...marketingViews, ...formViews, ...industryViews,
  Header: navigationViews.Navbar, Features: marketingViews.FeatureCard };
// Puck needs structural slot descriptors to turn JSON arrays into renderable
// slot components. No property-panel controls or custom field renderers belong here.
function renderFields(properties) {
  return Object.fromEntries(Object.entries(properties).flatMap(([key,field]) => {
    if (field.type === "slot") return [[key, { type: "slot" }]];
    if (field.type === "array") return [[key, { type: "array", arrayFields: renderFields(field.properties) }]];
    if (field.type === "object") return [[key, { type: "object", objectFields: renderFields(field.properties) }]];
    return [];
  }));
}
export const publicConfig = {
  root: { render: pageViews.root, defaultProps: contracts.root.defaults },
  components: Object.fromEntries(Object.entries(sharedViews).map(([type, render]) =>
    [type, { render, fields: renderFields(contracts.components[type].properties), defaultProps: contracts.components[type].defaults }])),
};
export default publicConfig;

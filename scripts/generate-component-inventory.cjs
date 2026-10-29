const fs=require('node:fs'),path=require('node:path');
const {generate}=require('./generate-component-contracts.cjs');
const registry=generate();
const lines=['# Component registry inventory','',
  'Generated from actual editor fields/defaults by `node scripts/generate-component-inventory.cjs`. Data authority: [component-contracts.json](../shared/website-contract/component-contracts.json). Registry v1: **57 registered types = 55 distinct views + Header/Features compatibility aliases**, 13 palette categories. Earlier reports counted only the 55 distinct views. Neither alias is in the palette.','',
  'All listed types are active Puck registrations. Views, style builders, animation, tokens and StudioContext are active shared utilities. Required component prop: stable `id`; panel props are optional and retain existing omission/render defaults. All slot children may use any registered type (no existing allowlists). Each contract has version 1. Full types, numeric bounds, enums, defaults, array/object fields and responsive descriptors live in the JSON entries. Default-only historical props remain accepted; exact shipped defaults may precede current panel options.','',
  '| Category | Component types |','|---|---|'];
for(const [name,c]of Object.entries(registry.categories))lines.push(`| ${name}: ${c.title} | ${c.components.join(', ')} |`);
lines.push('','| Type | Categories | Editor source / shared view | Slots | Responsive keys | URL/media fields |','|---|---|---|---|---|---|');
function paths(properties,prefix='',predicate) {
  return Object.entries(properties).flatMap(([k,f])=>{const p=prefix+k;return [...(predicate(f)?[p]:[]),...(f.properties&&f.type!=='responsive'?paths(f.properties,p+'.',predicate):[])];});
}
for(const [type,c]of Object.entries(registry.components)) {
  const source=`[${path.basename(c.source)}](../${c.source}) / [${path.basename(c.view)}.${c.aliasOf||type}](../${c.view})`;
  lines.push(`| ${type}${c.aliasOf?` (alias of ${c.aliasOf})`:''} | ${c.categories.join(', ')||'Compatibility only'} | ${source} | ${paths(c.properties,'',f=>f.type==='slot').join(', ')||'—'} | ${Object.keys(c.properties.responsive?.properties||{}).join(', ')||'—'} | ${paths(c.properties,'',f=>['url','link-list'].includes(f.semantic)).join(', ')||'—'} |`);
}
lines.push('','## Per-type field inventory','', 'For each type, `component-contracts.json.components.<Type>.properties` contains field contracts and `.defaults` contains actual defaults. All fields below are optional; `id` is required separately. Unknown historical fields are retained/reported, not stripped.','');
for(const [type,c]of Object.entries(registry.components))lines.push(`- **${type}**: ${Object.keys(c.properties).map(k=>'`'+k+'`').join(', ')}.`);
lines.push('','## Known existing limits','',
  '- Form, newsletter and storefront components are presentation views, not implemented submission/payment backends.',
  '- Button/ButtonGroup carry a historical mobile fullWidth default absent from responsive controls; the shared CSS variable map does not implement that override. Preserved, not claimed fixed.',
  '- Countdown initial state is shared, but animation/time and interactive behavior need browser checks.',
  '- Registry additions require editor fields, explicit shared view, generated contract and public registration; coverage tests fail on mismatches. Namespaced extensions require reviewed code/contracts and a registry version policy; no runtime JSON code loader exists.','');
fs.writeFileSync(path.join(__dirname,'../docs/COMPONENT_REGISTRY_INVENTORY.md'),lines.join('\n'));

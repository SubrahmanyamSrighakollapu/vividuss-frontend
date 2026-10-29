import { downloadLocalDraft } from "../../lib/publication-client.mjs";
// Isolated shared-view browser harness. This never bypasses app authentication:
// it does not navigate to a Vividuss route or access a backend/database.
import { test, expect } from "@playwright/test";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
const require = createRequire(import.meta.url);
const { createLoader } = require("../../scripts/source-loader.cjs");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { Render } = require("@puckeditor/core");
const load = createLoader();
const base = path.resolve(import.meta.dirname, "../../components/website-builder");
const editor = load(path.join(base, "puck-config.js")).puckConfig;
const publicConfig = load(path.join(base, "public-config.js")).publicConfig;
test("isolated nested shared views have equal preview/public pixels and responsive CSS", async ({ page }, info) => {
  const cssDir=path.resolve(base,"../../.next/static/chunks");
  expect(fs.existsSync(cssDir),"Run npm run build before test:render").toBe(true);
  const css=fs.readdirSync(cssDir).filter(f=>f.endsWith('.css')).map(f=>fs.readFileSync(path.join(cssDir,f),'utf8')).join('\n');
  const data={root:{props:editor.root.defaultProps},content:[{type:'Section',props:{...editor.components.Section.defaultProps,id:'section',content:[{type:'Heading',props:{...editor.components.Heading.defaultProps,id:'heading',text:'Vividuss shared view',responsive:{desktop:{fontSize:42},tablet:{fontSize:32},mobile:{fontSize:24}}}}]}}]};
  await page.route('**/*',route=>route.abort());
  const html=(config,wrapper)=>`<!doctype html><html><head><style>${css}</style><style>body{margin:0}</style></head><body><div class="${wrapper}" style="width:100%;container-type:inline-size;container-name:studio-preview">${renderToStaticMarkup(React.createElement(Render,{config,data}))}</div></body></html>`;
  await page.setContent(html(editor,`studio-preview-${info.project.name}`));
  const heading=page.getByRole('heading',{name:'Vividuss shared view'});
  const size={desktop:'42px',tablet:'32px',mobile:'24px'}[info.project.name];
  await expect(heading).toHaveCSS('font-size',size);
  const preview=await page.locator('.website-page-root').screenshot({animations:'disabled'});
  await page.setContent(html(publicConfig,'puck-public-responsive-container'));
  await expect(heading).toHaveCSS('font-size',size);
  const published=await page.locator('.website-page-root').screenshot({animations:'disabled'});
  expect(published.equals(preview),'Shared preview/public fixture pixels differ').toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await info.attach('shared-render.png',{body:published,contentType:'image/png'});
});

test("local draft recovery downloads exact unsaved JSON without server writes", async ({page}) => {
  await page.setContent("<html><body>Local recovery fixture</body></html>");
  const draft={documentId:"unsaved",root:{props:{}},content:[{type:"Heading",props:{id:"h",text:"Unsaved caf? ??"}}],unknown:{keep:true}};
  const downloading=page.waitForEvent("download");
  await page.evaluate(downloadLocalDraft,draft);
  const download=await downloading;
  expect(download.suggestedFilename()).toBe("vividuss-local-draft.json");
  expect(JSON.parse(fs.readFileSync(await download.path(),"utf8"))).toEqual(draft);
});

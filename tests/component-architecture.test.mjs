import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import crypto from 'node:crypto';
const require=createRequire(import.meta.url);
const {createLoader}=require('../scripts/source-loader.cjs');
const {generate}=require('../scripts/generate-component-contracts.cjs');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const {Render}=require('@puckeditor/core');
const load=createLoader();
const base=path.resolve(import.meta.dirname,'../components/website-builder');
const editor=load(path.join(base,'puck-config.js')).puckConfig;
const publicConfig=load(path.join(base,'public-config.js')).publicConfig;
const {registry,detectDocumentFormat}=require('../shared/website-contract/index.cjs');
const markup=(config,data)=>renderToStaticMarkup(React.createElement(Render,{config,data}));
const keyset=o=>Object.keys(o).sort();
test('extracted render function source matches all 56 original expressions from Milestone 1.5',()=>{
  const baseline=require('./fixtures/render-source-baseline.json');
  const ts=require('typescript');const hashes={};
  for(const file of fs.readdirSync(path.join(base,'views')).filter(f=>f.endsWith('.jsx'))) {
    const source=fs.readFileSync(path.join(base,'views',file),'utf8'),ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.JSX);
    const visit=n=>{if(ts.isPropertyAssignment(n)&&(ts.isArrowFunction(n.initializer)||ts.isFunctionExpression(n.initializer))) hashes[n.name.getText(ast)]=crypto.createHash('sha256').update(n.initializer.getText(ast).replace(/\r\n/g,'\n')).digest('hex');ts.forEachChild(n,visit);};visit(ast);
  }
  assert.equal(Object.keys(baseline.sha256).length,56);
  for(const [type,hash] of Object.entries(baseline.sha256))assert.equal(hashes[type],hash,type);
});

test('actual editor, data contracts and public registry cover 55 visual types plus two compatibility aliases',()=>{
  assert.equal(Object.keys(editor.components).length,57);
  assert.equal(Object.keys(editor.categories).length,13);
  assert.deepEqual(keyset(editor.components),keyset(publicConfig.components));
  assert.deepEqual(keyset(editor.components),keyset(registry.components));
  assert.deepEqual(generate(),registry,'Regenerate contracts after a field/default/category change');
  for(const [type,component] of Object.entries(editor.components)) assert.equal(component.render,publicConfig.components[type].render,type);
  assert.equal(editor.root.render,publicConfig.root.render);
  for(const category of Object.values(editor.categories)) for(const type of category.components) assert.ok(publicConfig.components[type],type);
  assert.equal(publicConfig.components.Header.render,publicConfig.components.Navbar.render);
  assert.equal(publicConfig.components.Features.render,publicConfig.components.FeatureCard.render);
});

test('every Puck default fixture produces identical editor/public SSR markup',()=>{
  for(const [type,c] of Object.entries(editor.components)) {
    const data={root:{props:editor.root.defaultProps},content:[{type,props:{...c.defaultProps,id:`fixture-${type}`}}]};
    assert.equal(markup(publicConfig,data),markup(editor,data),type);
  }
});

test('canonical/unversioned fixtures and nested slots render through both registries',()=>{
  for(const name of ['canonical','unversioned']) {
    const data=require(`../shared/website-contract/fixtures/${name}.json`);
    assert.equal(markup(publicConfig,data),markup(editor,data));
    assert.match(markup(publicConfig,data),name==='canonical'?/Welcome to Vividuss/:/Legacy café/);
  }
  const data={root:{props:{}},content:[{type:'Columns',props:{...editor.components.Columns.defaultProps,id:'c',column1:[{type:'Card',props:{...editor.components.Card.defaultProps,id:'card',content:[{type:'Heading',props:{...editor.components.Heading.defaultProps,id:'h',text:'Deep nested slot'}}]}}]}}]};
  assert.match(markup(publicConfig,data),/Deep nested slot/);
  assert.equal(markup(publicConfig,data),markup(editor,data));
});

test('all 13 legacy types retain the original React view and render without property panel dependencies',()=>{
  const legacy=load(path.resolve(base,'../sections/sectionRegistry.js')).default;
  const renderOnly=load(path.resolve(base,'../sections/public-section-registry.js')).publicSections;
  assert.equal(keyset(legacy).length,13);assert.deepEqual(keyset(legacy),keyset(renderOnly));
  for(const [type,d] of Object.entries(legacy)) {
    assert.equal(renderOnly[type],d.component,type);
    const props={content:d.defaultContent,config:d.defaultConfig,websiteSlug:'fixture'};
    assert.equal(renderToStaticMarkup(React.createElement(renderOnly[type],props)),renderToStaticMarkup(React.createElement(d.component,props)),type);
  }
});

test('public source dependency graph excludes editor adapters, property panels, media picker and auth UI',()=>{
  const seen=new Set();
  function walk(file) {
    file=path.resolve(file);
    if(!path.extname(file)) file=['.js','.jsx','.mjs','.cjs'].map(x=>file+x).find(x=>fs.existsSync(x));
    if(!file||seen.has(file)||file.endsWith('.json')||file.endsWith('.css'))return;
    seen.add(file);
    assert.doesNotMatch(file,/puck-config|PuckEditorClient|[\\/]fields[\\/]|[\\/]builder[\\/]properties|MediaLibraryModal|sectionRegistry\.js|Components\.jsx$/,file);
    const s=fs.readFileSync(file,'utf8');
    assert.doesNotMatch(s,/(?:from\s*|require\(\s*)["'](?:@clerk|@craftjs|@dnd-kit)/,file);
    for(const match of s.matchAll(/(?:from\s*|require\(\s*)["']([^"']+)["']/g)) {
      const name=match[1];
      if(name.startsWith('.'))walk(path.resolve(path.dirname(file),name));
      else if(name.startsWith('@/'))walk(path.resolve(base,'../../',name.slice(2)));
    }
  }
  walk(path.join(base,'PublishedPage.jsx'));walk(path.join(base,'PuckPublicRenderer.jsx'));
  assert.ok(seen.size>15);
});

test('responsive style implementation retains desktop/tablet/mobile inheritance and preview rules',()=>{
  const {buildResponsiveStyles,resolveResponsiveValue}=load(path.join(base,'layout/responsiveStyles.js'));
  const responsive={desktop:{fontSize:42},tablet:{fontSize:32},mobile:{fontSize:24}};
  const {css}=buildResponsiveStyles({responsive});
  for(const size of [42,32,24])assert.match(css,new RegExp(`font-size: ${size}px`));
  assert.match(css,/@media/);assert.match(css,/@container studio-preview/);assert.match(css,/studio-preview-mobile/);
  assert.equal(resolveResponsiveValue({desktop:{fontSize:42},tablet:{fontSize:32}},'fontSize','mobile',16),32);
  const sparse={root:{props:{}},content:[]};assert.equal(detectDocumentFormat({editorData:sparse}),'unversioned-puck');
});

test("website-owned chrome is explicit revision data; unknown historical globalLayout stays inert",()=>{
  const Page=load(path.join(base,"PublishedPage.jsx")).default;
  const page={id:"legacy",slug:"home",sections:[]};
  const snapshot={name:"Site",slug:"site",pages:[page],globalLayout:{header:{enabled:true,logoText:"Frozen brand",links:[{label:"About",href:"/about"}]}}};
  const render=s=>renderToStaticMarkup(React.createElement(Page,{website:{id:"w"},snapshot:s,page,pages:s.pages,slug:"site"}));
  assert.doesNotMatch(render(snapshot),/Frozen brand/);
  assert.match(render({...snapshot,publication:{revisionId:"r"},layoutPolicy:"website-owned-v1"}),/Frozen brand/);
  assert.match(render({...snapshot,publication:{revisionId:"r"},layoutPolicy:"website-owned-v1"}),/href="\/site\/about"/);
  assert.doesNotMatch(render({...snapshot,publication:{revisionId:"r"},layoutPolicy:"legacy-output"}),/Frozen brand/);
});

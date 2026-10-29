// Derive data-only contracts from the actual trusted editor definitions.
const fs=require('node:fs'),path=require('node:path');
const {createLoader}=require('./source-loader.cjs');
function generate() {
  const config=createLoader()(path.join(__dirname,'../components/website-builder/puck-config.js')).puckConfig;
  function field(f,key) {
    if(f.contract?.type==='responsive') return {type:'responsive',properties:Object.fromEntries(f.contract.settings.map(s=>[s.key||s.name,field(s,s.key||s.name)]))};
    if(f.contract) return f.contract;
    if(['text','textarea'].includes(f.type)) return {type:'string',...(['linksList','quickLinksText'].includes(key)?{semantic:'link-list'}:/url|href|src|image|link|poster|avatar|logo/i.test(key)&&!/text|label|subtitle|alt|size|width|height|position|align|radius|fit|count|gap|color|mode|style|target|ratio/i.test(key)?{semantic:'url'}:{})};
    if(['select','radio'].includes(f.type)) return {type:'enum',values:f.options.map(o=>o.value)};
    if(f.type==='number') return {type:'number',...(f.min!==undefined?{min:f.min}:{}),...(f.max!==undefined?{max:f.max}:{}),...(f.step!==undefined?{step:f.step}:{})};
    if(f.type==='slot') return {type:'slot',allowedChildren:f.allow||null};
    if(f.type==='array') return {type:'array',properties:fields(f.arrayFields||{}),defaultItem:f.defaultItemProps||{}};
    if(f.type==='object') return {type:'object',properties:fields(f.objectFields||{})};
    throw new Error(`Unspecified field contract ${key}: ${f.type}`);
  }
  function fields(def) {return Object.fromEntries(Object.entries(def).map(([k,f])=>[k,{...field(f,k),...(f.label?{label:f.label}:{})}]));}
  const result={registryVersion:1,categories:config.categories,root:{properties:fields(config.root.fields),defaults:config.root.defaultProps},components:{}};
  for(const [type,c] of Object.entries(config.components)) {
    const aliasOf=Object.keys(config.components).find(k=>k!==type&&config.components[k]===c);
    const implementationType=['Header','Features'].includes(type)?aliasOf:type;
    const source=fs.readdirSync(path.join(__dirname,'../components/website-builder/components')).filter(f=>f.endsWith('Components.jsx')).find(f=>new RegExp(`\\b${implementationType}:\\s*\\{`).test(fs.readFileSync(path.join(__dirname,'../components/website-builder/components',f),'utf8')));
    result.components[type]={version:1,label:c.label,...(implementationType!==type?{aliasOf:implementationType}:{}),source:`components/website-builder/components/${source}`,view:`components/website-builder/views/${source.replace('Components','Views')}`,categories:Object.entries(config.categories).filter(([,c])=>c.components.includes(type)).map(([k])=>k),required:['id'],properties:fields(c.fields),defaults:c.defaultProps||{}};
    // Defaults are the supported omission semantics, not additional required fields.
  }
  return result;
}
module.exports={generate};
if(require.main===module) {const file=path.join(__dirname,'../shared/website-contract/component-contracts.json');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,JSON.stringify(generate(),null,2)+'\n');console.log('Generated contracts for '+Object.keys(generate().components).length+' components');}

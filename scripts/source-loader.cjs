// Test/build tooling only: execute trusted repository JSX without a browser.
// No user JSON is evaluated. Public production code never imports this loader.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
function createLoader() {
  const cache = new Map();
  function load(filename) {
    filename = path.resolve(filename);
    if (!path.extname(filename)) filename = ['', '.js', '.jsx', '.mjs', '.cjs', '.json'].map(x => filename + x).find(x => fs.existsSync(x) && fs.statSync(x).isFile()) || filename;
    if (filename.endsWith('.json')) return JSON.parse(fs.readFileSync(filename, 'utf8'));
    if (filename.endsWith('.cjs')) return require(filename);
    if (cache.has(filename)) return cache.get(filename).exports;
    const loadedModule = { exports: {} }; cache.set(filename, loadedModule);
    const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {fileName:filename, compilerOptions:{module:ts.ModuleKind.CommonJS, jsx:ts.JsxEmit.ReactJSX, target:ts.ScriptTarget.ES2022, esModuleInterop:true}}).outputText;
    const localRequire = name => {
      if (name.endsWith('.css')) return {};
      if (name.includes('MediaLibraryModal')) return {__esModule:true, default:() => null};
      if (name === 'next/link') return {__esModule:true, default: props => require('react').createElement('a', props, props.children)};
      if (name.startsWith('@/')) return load(path.join(__dirname, '..', name.slice(2)));
      if (name.startsWith('.')) return load(path.resolve(path.dirname(filename), name));
      return require(name);
    };
    vm.runInThisContext(`(function(require,module,exports){${source}\n})`, {filename})(localRequire,loadedModule,loadedModule.exports);
    return loadedModule.exports;
  }
  return load;
}
module.exports = { createLoader };

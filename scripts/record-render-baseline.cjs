// Review tool: record render-expression hashes from the completed M1.5 commit.
const {execFileSync}=require('node:child_process');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),ts=require('typescript');
const baselineRepository=process.env.VIVIDUSS_BASELINE_REPOSITORY;
if(!baselineRepository)throw new Error('Set VIVIDUSS_BASELINE_REPOSITORY to the original monorepo containing a380ac2. Normal tests use the committed fixture and do not require it.');
const result={baseline:'a380ac2',sha256:{}};
function hash(text){return crypto.createHash('sha256').update(text.replace(/\r\n/g,'\n')).digest('hex');}
for(const file of fs.readdirSync(path.join(__dirname,'../components/website-builder/components')).filter(f=>f.endsWith('Components.jsx')).concat('puck-config.js')) {
  const repoPath='frontend/components/website-builder/'+(file==='puck-config.js'?'':'components/')+file;
  const text=execFileSync('git',['-C',baselineRepository,'show',`a380ac2:${repoPath}`],{encoding:'utf8',maxBuffer:2000000});
  const ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JSX);
  function visit(n){if(ts.isPropertyAssignment(n)&&n.name.getText(ast)==='render'&&(ts.isArrowFunction(n.initializer)||ts.isFunctionExpression(n.initializer))){
    const type=n.parent.parent.name?.getText(ast);if(type)result.sha256[type]=hash(n.initializer.getText(ast));
  }ts.forEachChild(n,visit);}visit(ast);
}
fs.mkdirSync(path.join(__dirname,'../tests/fixtures'),{recursive:true});
fs.writeFileSync(path.join(__dirname,'../tests/fixtures/render-source-baseline.json'),JSON.stringify(result,null,2)+'\n');
console.log(Object.keys(result.sha256).length+' original render expressions recorded');

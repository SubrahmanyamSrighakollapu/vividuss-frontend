import {test} from 'node:test';
import assert from 'node:assert/strict';
import {resolvePublishedPage,publishedMetadata} from '../lib/published-page.mjs';
import contract from '../shared/website-contract/index.cjs';
test('homepage/subpage dispatch agrees for empty Puck, canonical, legacy and unsupported documents',()=>{
  for(const [data,format] of [[null,'legacy-sections'],[{root:{},content:[]},'unversioned-puck'],[contract.createPageDocument('p'),'canonical-puck'],[{root:{},content:[],schemaVersion:999},'unsupported']]) {
    const page={id:'p',slug:'home',editorData:data,sections:[{id:'s',type:'hero'}]};
    const website={publishedData:{pages:[page]}};
    assert.equal(contract.detectDocumentFormat(resolvePublishedPage(website).page),format);
    assert.equal(contract.detectDocumentFormat(resolvePublishedPage(website,'home').page),format);
  }
});
test('resolution, theme and SEO source use published metadata despite changed draft fields',()=>{
  const website={name:'Draft name',theme:{colors:{primary:'draft'}},publishedData:{name:'Published name',theme:{colors:{primary:'published'}},pages:[{id:'p',slug:'about',name:'Published about',order:0,editorData:contract.createPageDocument('p')} ]}};
  assert.equal(publishedMetadata(website).title,'Published name');
  assert.equal(publishedMetadata(website,'about').title,'Published about | Published name');
  assert.equal(resolvePublishedPage(website).snapshot.theme.colors.primary,'published');
  website.publishedData.pages[0].editorData.metadata={title:'SEO title',description:'Description',noIndex:true};
  assert.deepEqual(publishedMetadata(website),{title:'SEO title',description:'Description',robots:{index:false,follow:false}});
  assert.equal(resolvePublishedPage({publishedData:{pages:[]}}),null);
  assert.equal(resolvePublishedPage(website,'missing'),null);
  assert.equal(resolvePublishedPage({publishedData:{format:'unknown',pages:[{}]}}),null);
});

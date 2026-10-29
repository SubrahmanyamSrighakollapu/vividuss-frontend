import {test} from "node:test";
import assert from "node:assert/strict";
import {createConcurrencySession,publicationError} from "../lib/publication-client.mjs";
test("legacy sessions send no preconditions; enabled sessions send both publish tokens",()=>{
  assert.deepEqual(createConcurrencySession().headers(true),{});
  const session=createConcurrencySession({enabled:true,draftVersion:3,publicationVersion:2});
  assert.deepEqual(session.headers(),{"If-Match":'"draft-3"'});
  assert.deepEqual(session.headers(true),{"If-Match":'"draft-3"',"If-Publication-Match":'"publication-2"'});
});
test("acknowledged writes advance tokens; delayed older acknowledgements cannot regress them",()=>{
  const session=createConcurrencySession({enabled:true,draftVersion:0,publicationVersion:0});
  session.acknowledge({concurrency:{enabled:true,draftVersion:2,publicationVersion:1}});
  session.acknowledge({data:{concurrency:{enabled:true,draftVersion:1,publicationVersion:0}}});
  assert.equal(session.current().draftVersion,2);assert.equal(session.current().publicationVersion,1);
});
test("stale loaded snapshots require a full reload instead of silently adopting new versions",()=>{
  const session=createConcurrencySession({enabled:true,draftVersion:0,publicationVersion:0});
  assert.throws(()=>session.assertLoaded({enabled:true,draftVersion:1}),e=>e.kind==="conflict");
  assert.equal(session.current().draftVersion,0);
});
test("conflict, validation and request errors remain distinct and never replace local unsaved JSON",()=>{
  const local={format:"vividuss.puck.page",documentId:"local",root:{props:{}},content:[{type:"Heading",props:{id:"h",text:"Unsaved"}}]};
  const before=JSON.stringify(local),session=createConcurrencySession({enabled:true,draftVersion:0,publicationVersion:0});
  const conflict=publicationError({code:"VERSION_CONFLICT",message:"Newer state",concurrency:{draftVersion:4}},409);
  assert.equal(conflict.kind,"conflict");assert.equal(session.current().draftVersion,0);
  assert.equal(publicationError({code:"VERSION_REQUIRED"},428).kind,"conflict");
  assert.equal(publicationError({errors:[{path:"$.content",reason:"Invalid slot"}]},400).kind,"validation");
  assert.equal(publicationError({message:"Network failed"},500).kind,"request");
  assert.equal(JSON.stringify(local),before);
});
test("snapshot-only homepage and subpage metadata ignore later draft edits and display selected restoration",async()=>{
  const {resolvePublishedPage,publishedMetadata}=await import("../lib/published-page.mjs");
  const original={name:"Revision 1",pages:[{id:"h",slug:"home",name:"Home",editorData:{metadata:{title:"Frozen SEO"}}},{id:"a",slug:"about",name:"About"}]};
  const website={name:"Draft",pages:[{slug:"changed"}],publishedData:original,publication:{revisionId:"r1"}};
  assert.equal(publishedMetadata(website).title,"Frozen SEO");
  assert.equal(resolvePublishedPage(website,"about").snapshot,original);
  assert.equal(resolvePublishedPage(website,"changed"),null);
  website.name="Later draft";assert.equal(publishedMetadata(website,"about").title,"About | Revision 1");
});

test("live link identity uses published routing even when draft names/pages/slugs change",async()=>{
 const {publishedWebsiteIdentity}=await import("../lib/publication-client.mjs");
 const pages=[{id:"p",slug:"old-page"}];
 const website={isPublished:true,slug:"draft-site",pages:[{id:"p",slug:"draft-page"}],publication:{slug:"live-site"},publishedData:{slug:"older-site",pages}};
 assert.deepEqual(publishedWebsiteIdentity(website),{slug:"live-site",pages});
 assert.equal(publishedWebsiteIdentity({isPublished:true,slug:"draft",publicationState:{publishedSlug:"selected"},publishedData:{pages}}).slug,"selected");
 assert.equal(publishedWebsiteIdentity({isPublished:false,slug:"draft"}).slug,null);
});

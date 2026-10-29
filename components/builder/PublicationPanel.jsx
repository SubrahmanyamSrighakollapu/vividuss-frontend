"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { browserApiUrl } from "@/lib/api-url.mjs";
import { publicationError, downloadLocalDraft } from "@/lib/publication-client.mjs";
export default function PublicationPanel({ websiteId, getToken, session, onAcknowledged, beforeWrite, publicationVersion }) {
  const layoutDirtyRef=useRef(false);
  const [history,setHistory]=useState(null),[failure,setFailure]=useState(""),[busy,setBusy]=useState(false);
  const [selected,setSelected]=useState(null),[layoutText,setLayoutText]=useState(""),[layoutDirty,setLayoutDirty]=useState(false);
  const request=useCallback(async(path,method="GET",body,publication=false)=>{
    const token=await getToken();
    if(!token)throw new Error("Authentication required");
    const response=await fetch(browserApiUrl("websites/"+encodeURIComponent(websiteId)+path),{
      method,headers:{Authorization:"Bearer "+token,"Content-Type":"application/json",...(method==="GET"?{}:session.headers(publication))},
      body:body===undefined?undefined:JSON.stringify(body),cache:"no-store"});
    const result=await response.json();
    if(!response.ok||!result.success)throw publicationError(result,response.status);
    if(method!=="GET")onAcknowledged(result);
    return result.data;
  },[websiteId,getToken,session,onAcknowledged]);
  const load=useCallback(async()=> {
    const [list,state]=await Promise.all([request("/revisions"),request("/publication-state")]);
    return {list,state};
  },[request]);
  useEffect(()=>{
    let active=true;
    load().then(value=>{if(active){setHistory(value.list);if(!layoutDirtyRef.current)setLayoutText(JSON.stringify(value.state.globalLayout,null,2));}}).catch(error=>{if(active)setFailure(error.message);});
    return ()=>{active=false;};
  },[load,publicationVersion]);
  useEffect(()=>{
    if(!layoutDirty)return;
    const warn=e=>{e.preventDefault();e.returnValue="";};
    window.addEventListener("beforeunload",warn);return ()=>window.removeEventListener("beforeunload",warn);
  },[layoutDirty]);
  async function restore(revision) {
    if(!window.confirm("Restore publication #"+revision.sequence+" as a NEW revision? Current draft content will remain unchanged."))return;
    setBusy(true);setFailure("");
    try {
      await beforeWrite();
      await request("/revisions/"+encodeURIComponent(revision.id)+"/restore","POST",{},true);
      setHistory((await load()).list);
    } catch(error){setFailure(error.message);}
    finally{setBusy(false);}
  }
  async function inspect(id) {
    setFailure("");
    try{setSelected(await request("/revisions/"+encodeURIComponent(id)));}
    catch(error){setFailure(error.message);}
  }
  const editableLayout=JSON.parse(layoutText || "null") || {};
  function changeLayout(part,key,value) {
    setLayoutText(current => { const previous=JSON.parse(current || "null") || {}; return JSON.stringify({...previous,[part]:{...previous[part],[key]:value}},null,2); });
    layoutDirtyRef.current=true;setLayoutDirty(true);
  }
  async function saveLayout() {
    setBusy(true);setFailure("");
    try{
      const globalLayout=JSON.parse(layoutText);
      await beforeWrite();
      await request("/layout","PUT",{globalLayout});
      layoutDirtyRef.current=false;setLayoutDirty(false);
    }catch(error){setFailure(error.message);}
    finally{setBusy(false);}
  }
  return <details className="max-h-[50vh] shrink-0 overflow-auto border-b border-gray-200 bg-white px-5 py-3">
    <summary className="cursor-pointer text-sm font-semibold">Publication history and website layout</summary>
    {failure&&<p role="alert" className="mt-3 text-sm text-red-700">{failure} Download any unsaved editor JSON before reloading.</p>}
    <p className="mt-3 text-xs text-gray-600">Active revision: {history?.activeRevisionId || "Legacy publication / unpublished"}. Restoring creates a new publication and keeps drafts unchanged.</p>
    <button type="button" disabled={busy} onClick={()=>load().then(value=>setHistory(value.list)).catch(error=>setFailure(error.message))} className="my-2 rounded border px-3 py-1 text-xs">Refresh history</button>
    <ol className="space-y-2">{history?.revisions.map(revision=><li key={revision.id} className="flex flex-wrap items-center gap-3 text-xs">
      <span>#{revision.sequence} ? {new Date(revision.createdAt).toLocaleString()} ? {revision.id}{revision.id===history.activeRevisionId?" ? Active":""}</span>
      {revision.restoredFromRevisionId&&<span>Restored from {revision.restoredFromRevisionId}</span>}
      <button type="button" onClick={()=>inspect(revision.id)} disabled={busy} className="rounded border px-2 py-1">Inspect JSON</button>
      <button type="button" onClick={()=>restore(revision)} disabled={busy} className="rounded border px-2 py-1">Restore</button>
    </li>)}</ol>
    {selected&&<div className="mt-3"><button type="button" onClick={()=>setSelected(null)} className="text-xs underline">Close inspection</button><p className="my-2 text-sm">{selected.snapshot.name || "Website"} ? {selected.snapshot.pages?.length || 0} pages</p><ul className="text-xs">{selected.snapshot.pages?.map(page=><li key={page.id}>{page.name || page.slug} ? /{page.slug}</li>)}</ul><details><summary className="mt-2 cursor-pointer text-xs">Advanced snapshot data</summary><pre className="max-h-80 overflow-auto rounded bg-gray-50 p-3 text-xs">{JSON.stringify(selected,null,2)}</pre></details></div>}
    {layoutDirty&&<p role="status" className="mt-2 text-xs text-amber-700">Layout JSON has unsaved changes. Publish uses the last saved layout.</p>}
    <details className="mt-4"><summary className="cursor-pointer text-xs font-semibold">Website header and footer</summary>
      <p className="my-2 text-xs text-gray-600">The header and footer apply to every page and are captured when you publish.</p>
      {["header","footer"].map(part=><fieldset key={part} className="my-3 grid gap-2 rounded border p-3 text-xs">
        <legend className="px-1 font-semibold capitalize">{part}</legend>
        <label><input type="checkbox" checked={!!editableLayout[part]?.enabled} onChange={event=>changeLayout(part,"enabled",event.target.checked)} /> Enable {part}</label>
        {(part==="header" ? [["logoText","Brand name"],["logoUrl","Logo URL"]] : [["copyrightText","Copyright text"]]).concat([["backgroundColor","Background color"],["textColor","Text color"]]).map(([key,label])=><label key={key} className="grid gap-1">{label}<input value={editableLayout[part]?.[key] || ""} onChange={event=>changeLayout(part,key,event.target.value)} className="rounded border px-2 py-1" /></label>)}
        {(editableLayout[part]?.links || []).map((link,index)=><div key={index} className="flex flex-wrap gap-2">
          <input aria-label={part+" link label "+(index+1)} value={link.label} onChange={event=>changeLayout(part,"links",editableLayout[part].links.map((value,i)=>i===index?{...value,label:event.target.value}:value))} className="min-w-0 flex-1 rounded border px-2 py-1" />
          <input aria-label={part+" link destination "+(index+1)} value={link.href} onChange={event=>changeLayout(part,"links",editableLayout[part].links.map((value,i)=>i===index?{...value,href:event.target.value}:value))} className="min-w-0 flex-1 rounded border px-2 py-1" />
          <button type="button" onClick={()=>changeLayout(part,"links",editableLayout[part].links.filter((_,i)=>i!==index))}>Remove link</button>
        </div>)}
        <button type="button" className="justify-self-start rounded border px-2 py-1" onClick={()=>changeLayout(part,"links",[...(editableLayout[part]?.links || []),{label:"Link",href:"/"}])}>Add link</button>
      </fieldset>)}
      <button type="button" disabled={busy||!layoutDirty} onClick={saveLayout} className="mt-2 rounded border px-3 py-1 text-xs">Save header/footer draft</button>
      {layoutDirty&&<button type="button" onClick={()=>downloadLocalDraft({globalLayout:editableLayout},"vividuss-local-layout.json")} className="ml-2 text-xs underline">Download local layout changes</button>}
    </details>
  </details>;
}

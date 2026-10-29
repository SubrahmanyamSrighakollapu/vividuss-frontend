import { test } from "node:test";
import assert from "node:assert/strict";
import { createSaveQueue, flushLatest, createTransitionGate } from "../components/website-builder/saveQueue.mjs";
import { apiUrl } from "../lib/api-url.mjs";
import { withLayoutDefaults } from "../components/website-builder/globalLayout.mjs";
import { createRequire } from "node:module";
const deferred = () => { let resolve; const promise = new Promise(r => { resolve = r; }); return { promise, resolve }; };
const tick = () => new Promise(resolve => setImmediate(resolve));

test("queued saves coalesce, snapshot values, and all wait for backend acknowledgement", async () => {
  const first = deferred(), second = deferred(), writes = [];
  const queue = createSaveQueue(async value => { writes.push(value); await (writes.length === 1 ? first : second).promise; });
  const data = { v: 1 };
  const a = queue.save(data); data.v = 99;
  const b = queue.save({ v: 2 }); const c = queue.save({ v: 3 });
  let done = false; void a.then(() => { done = true; });
  first.resolve(); await tick();
  assert.deepEqual(writes, [{ v: 1 }, { v: 3 }]); assert.equal(done, false);
  second.resolve(); await Promise.all([a, b, c]); assert.equal(done, true);
});
test("edits during flush are saved before immediate publication", async () => {
  const pending = deferred(), order = []; let current = { v: 1 };
  const queue = createSaveQueue(async doc => { order.push(doc.v); if (doc.v === 1) await pending.promise; });
  const gate = createTransitionGate();
  const publication = gate.run(() => flushLatest(queue, () => current), async () => { order.push("publish"); });
  current = { v: 2 }; pending.resolve(); await publication;
  assert.deepEqual(order, [1, 2, "publish"]);
});
test("failed save aborts publication and switching; explicit retry succeeds", async () => {
  let fail = true, action = 0;
  const queue = createSaveQueue(async () => { if (fail) throw new Error("save failed"); });
  const gate = createTransitionGate(); const flush = () => flushLatest(queue, () => ({ v: 1 }));
  await assert.rejects(gate.run(flush, () => action++), /save failed/);
  assert.equal(action, 0); fail = false;
  await gate.run(flush, () => action++); assert.equal(action, 1);
});
test("page switching waits for save; concurrent publish is rejected", async () => {
  const pending = deferred(); let page = "A", published = 0;
  const gate = createTransitionGate();
  const switchPage = gate.run(() => pending.promise, () => { page = "B"; });
  assert.equal(page, "A"); assert.equal(gate.busy, true);
  assert.equal(await gate.run(async () => {}, () => published++), false);
  pending.resolve(); await switchPage; assert.equal(page, "B"); assert.equal(published, 0);
});
test("page-bound queue disposal rejects waiters", async () => {
  const pending = deferred(); const queue = createSaveQueue(() => pending.promise);
  const result = queue.save({ page: "A" }); queue.dispose();
  await assert.rejects(result, /session ended/); pending.resolve(); await tick();
});
test("URLs and layout defaults preserve existing metadata", () => {
  assert.equal(apiUrl("http://localhost:5000/api///", "/websites"), "http://localhost:5000/api/websites");
  assert.equal(apiUrl(undefined, "templates"), "http://localhost:5000/api/templates");
  const value = { custom: 1, header: { links: [], custom: 2 } };
  assert.equal(withLayoutDefaults(value).custom, 1); assert.equal(withLayoutDefaults(value).header.custom, 2);
});
test("failed queued writes reject every caller and retry persists the latest document", async () => {
  const pending = deferred(); let fail = true; const writes = [];
  const queue = createSaveQueue(async document => {
    writes.push(document);
    if (fail) { await pending.promise; throw new Error("offline"); }
  });
  const a = queue.save({ v: 1 }); const b = queue.save({ v: 2 });
  const results = Promise.allSettled([a, b]); pending.resolve();
  assert.deepEqual((await results).map(result => result.status), ["rejected", "rejected"]);
  fail = false; await queue.save({ v: 3 });
  assert.deepEqual(writes, [{ v: 1 }, { v: 3 }]);
});
test("frontend layout defaults match the paired backend contract snapshot", () => {
  const backend = createRequire(import.meta.url)("./fixtures/backend-global-layout.cjs");
  assert.deepEqual(withLayoutDefaults(null), backend.withLayoutDefaults(null));
});

// All callers wait until the coalesced queue is acknowledged. Failed requests
// reject every waiting caller; a later explicit retry starts a new drain.
export function createSaveQueue(persist) {
  let pending = null;
  let running = false;
  let waiters = [];
  let disposed = false;
  async function drain() {
    running = true;
    try {
      while (pending) {
        const document = pending;
        pending = null;
        await persist(document);
        if (disposed) throw new Error("Editor session ended before save acknowledgement");
      }
      const done = waiters; waiters = [];
      done.forEach(({ resolve }) => resolve());
    } catch (error) {
      pending = null;
      const failed = waiters; waiters = [];
      failed.forEach(({ reject }) => reject(error));
    } finally { running = false; }
  }
  return {
    save(document) {
      if (disposed) return Promise.reject(new Error("Editor session ended"));
      let snapshot;
      try { snapshot = JSON.parse(JSON.stringify(document)); }
      catch (error) { return Promise.reject(error); }
      return new Promise((resolve, reject) => {
        pending = snapshot;
        waiters.push({ resolve, reject });
        if (!running) void drain();
      });
    },
    dispose() {
      disposed = true; pending = null;
      const failed = waiters; waiters = [];
      failed.forEach(({ reject }) => reject(new Error("Editor session ended")));
    },
  };
}

export async function flushLatest(queue, read) {
  for (;;) {
    const document = read();
    if (!document) throw new Error("Editor is not ready to save");
    const serialized = JSON.stringify(document);
    await queue.save(document);
    if (JSON.stringify(read()) === serialized) return;
  }
}

// Shared by publication and page transitions. The caller freezes editing while
// this gate runs. Synchronous locking also rejects same-tick double clicks.
export function createTransitionGate() {
  let locked = false;
  return {
    get busy() { return locked; },
    async run(flush, action) {
      if (locked) return false;
      locked = true;
      try { await flush(); await action(); return true; }
      finally { locked = false; }
    },
  };
}

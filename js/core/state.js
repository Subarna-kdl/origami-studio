// Tiny observable store. Every feature reads/writes shared UI state through here
// instead of reaching into other modules.

const state = {
  activeTool: 'select',
  gridVisible: true,
};

const listeners = {}; // key -> Set of callbacks

export function getState() {
  return state;
}

/** Update one or more keys and notify subscribers of each changed key. */
export function setState(patch) {
  for (const [key, value] of Object.entries(patch)) {
    if (state[key] === value) continue;
    state[key] = value;
    listeners[key]?.forEach((fn) => fn(value));
  }
}

/** Call fn(value) whenever `key` changes. Returns an unsubscribe function. */
export function subscribe(key, fn) {
  (listeners[key] ??= new Set()).add(fn);
  return () => listeners[key].delete(fn);
}

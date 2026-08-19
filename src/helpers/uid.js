export function uid(prefix = "md") { return `${prefix}-${globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`}`; }
export default uid;

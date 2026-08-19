const prefix = "marsdove:";

export const storage = {
  get(key, fallback = null) { try { const value = localStorage.getItem(prefix + key); return value == null ? fallback : JSON.parse(value); } catch { return fallback; } },
  set(key, value) { localStorage.setItem(prefix + key, JSON.stringify(value)); return value; },
  remove(key) { localStorage.removeItem(prefix + key); },
  clear() { Object.keys(localStorage).filter(k => k.startsWith(prefix)).forEach(k => localStorage.removeItem(k)); }
};

export default storage;

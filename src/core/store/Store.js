import { RuntimeEvents } from "../runtime/lifecycle.js";

function clone(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  if (value === undefined) return value;
  return JSON.parse(JSON.stringify(value));
}

function read(source, path) {
  if (!path) return source;
  return String(path).split(".").reduce((value, key) => value?.[key], source);
}

function write(source, path, value) {
  const keys = String(path).split(".").filter(Boolean);
  if (!keys.length) return value;
  let target = source;
  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i];
    if (!target[key] || typeof target[key] !== "object" || Array.isArray(target[key])) target[key] = {};
    target = target[key];
  }
  target[keys.at(-1)] = value;
  return source;
}

export default class Store {
  #state;
  #listeners = new Map();

  constructor(initialState = {}) {
    this.#state = clone(initialState) ?? {};
  }

  get(path, fallback) {
    const value = read(this.#state, path);
    return value === undefined ? fallback : value;
  }

  all() {
    return clone(this.#state);
  }

  set(path, value) {
    if (!path) {
      this.#state = clone(value) ?? {};
      this.#emit(null, this.#state);
      return this;
    }
    write(this.#state, path, value);
    this.#emit(String(path), value);
    return this;
  }

  update(path, updater) {
    if (typeof updater !== "function") throw new TypeError("Store.update(): updater must be a function.");
    return this.set(path, updater(clone(this.get(path))));
  }

  subscribe(path, callback) {
    if (typeof path === "function") {
      callback = path;
      path = null;
    }
    if (typeof callback !== "function") throw new TypeError("Store.subscribe(): callback must be a function.");
    const key = path == null ? "*" : String(path);
    if (!this.#listeners.has(key)) this.#listeners.set(key, new Set());
    const listeners = this.#listeners.get(key);
    listeners.add(callback);
    callback(this.get(path), this.all());
    return () => listeners.delete(callback);
  }

  watch(path, callback) {
    return this.subscribe(path, callback);
  }

  reset(initialState = {}) {
    this.#state = clone(initialState) ?? {};
    this.#emit(null, this.#state);
    return this;
  }

  #emit(path, value) {
    const payload = { path, value, state: this.all(), store: this };
    for (const [key, callbacks] of this.#listeners) {
      if (key === "*" || path === null || key === path || key.startsWith(`${path}.`) || path?.startsWith(`${key}.`)) {
        callbacks.forEach(callback => callback(value, payload.state, payload));
      }
    }
    RuntimeEvents.emit("store:update", payload);
    if (path) RuntimeEvents.emit(`store:${path}`, payload);
  }
}

export { Store };

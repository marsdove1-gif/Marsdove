import { DEFAULT_CONFIG } from "./defaults.js";
import { mergeConfig } from "./merge.js";

export default class Config {
  #value;

  constructor(options = {}) {
    this.#value = mergeConfig(DEFAULT_CONFIG, options);
  }

  all() {
    return structuredClone(this.#value);
  }

  get(path, fallback) {
    if (!path) return this.all();

    const value = path.split(".").reduce((current, key) => {
      if (current == null) return undefined;
      return current[key];
    }, this.#value);

    return value === undefined ? fallback : value;
  }

  set(path, value) {
    if (!path) return this;

    const keys = path.split(".");
    let target = this.#value;

    keys.slice(0, -1).forEach(key => {
      if (!target[key] || typeof target[key] !== "object" || Array.isArray(target[key])) {
        target[key] = {};
      }
      target = target[key];
    });

    target[keys.at(-1)] = value;
    return this;
  }

  merge(options = {}) {
    this.#value = mergeConfig(this.#value, options);
    return this;
  }
}

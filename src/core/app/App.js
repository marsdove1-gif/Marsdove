import Config from "../config/Config.js";
import { applyTheme } from "../theme/index.js";
import { setApp } from "../dom/index.js";

class App {
  #config;
  #plugins = [];
  #ready = false;

  constructor(options = {}) {
    this.#config = new Config(options);
  }

  config(options) {
    if (options !== undefined) {
      this.#config.merge(options);
      if (this.#ready) this.theme();
    }
    return this.#config.all();
  }

  get(key, fallback) {
    return this.#config.get(key, fallback);
  }

  set(key, value) {
    this.#config.set(key, value);
    if (this.#ready && key.startsWith("theme.")) this.theme();
    return this;
  }

  theme() {
    applyTheme(this.get("theme", {}));
    return this;
  }

  root(root) {
    return this.set("root", root);
  }

  view(view) {
    return this.set("view", view);
  }

  router(router) {
    return this.set("router", router);
  }

  store(store) {
    if (store !== undefined) this.set("store", store);
    return this.get("store");
  }

  state(path, fallback) {
    return this.get("store")?.get?.(path, fallback);
  }

  setState(path, value) {
    this.get("store")?.set?.(path, value);
    return this;
  }

  use(plugin) {
    if (typeof plugin === "function") plugin(this);
    this.#plugins.push(plugin);
    return this;
  }

  plugins() {
    return [...this.#plugins];
  }

  ready() {
    setApp(this);
    this.theme();
    this.#ready = true;
    return this;
  }

  isReady() {
    return this.#ready;
  }
}

export default App;

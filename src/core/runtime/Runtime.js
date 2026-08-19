import { RuntimeEvents } from "./lifecycle.js";

class Runtime {

  #modules = new Map();

  #started = false;

  register(name, module) {

    if (!name || !module) {
      return this;
    }

    this.#modules.set(name, module);

    return this;

  }

  unregister(name) {

    this.#modules.delete(name);

    return this;

  }

  module(name) {

    return this.#modules.get(name);

  }

  modules() {

    return [...this.#modules.values()];

  }

  async start() {

    if (this.#started) {
      return;
    }

    RuntimeEvents.emit("before:start");

    for (const module of this.#modules.values()) {

      if (typeof module.boot === "function") {
        await module.boot();
      }

    }

    this.#started = true;

    RuntimeEvents.emit("started");

  }

  async stop() {

    RuntimeEvents.emit("before:stop");

    for (const module of this.#modules.values()) {

      if (typeof module.destroy === "function") {
        await module.destroy();
      }

    }

    this.#started = false;

    RuntimeEvents.emit("stopped");

  }

  started() {

    return this.#started;

  }

}

export default new Runtime();
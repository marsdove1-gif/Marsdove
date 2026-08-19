export * from "./components/index.js";
export * from "./core/app/index.js";
export * from "./core/config/index.js";
export * from "./core/theme/index.js";
export * from "./core/store/index.js";
export * from "./core/boot/index.js";
export * from "./core/render/index.js";
export * from "./core/dom/index.js";
export * from "./core/style/index.js";
export * from "./helpers/index.js";
export * from "./framework/index.js";
export { Router } from "./router/md-router.js";
export { default as Runtime } from "./core/runtime/Runtime.js";
export { RuntimeEvents } from "./core/runtime/lifecycle.js";

export const VERSION = "5.2.0";

export function start(config = {}) {
  return {
    config,
    framework: "Marsdove",
    version: VERSION
  };
}

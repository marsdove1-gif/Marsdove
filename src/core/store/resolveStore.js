import { app } from "../dom/index.js";

export function resolveStore(store) {
  return store || app()?.get("store") || null;
}

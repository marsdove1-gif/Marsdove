import { state } from "./state.js";

export function get(path) {
  if (!path) return state;

  return path.split(".").reduce(
    (acc, key) => acc?.[key],
    state
  );
}

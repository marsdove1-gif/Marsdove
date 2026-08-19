import { get } from "./get.js";
import { set } from "./set.js";
import { clone } from "./clone.js";

export function update(path, updater) {
  if (typeof updater !== "function") {
    throw new TypeError("state.update(): updater must be a function.");
  }

  const current = get(path);

  set(
    path,
    updater(clone(current))
  );
}

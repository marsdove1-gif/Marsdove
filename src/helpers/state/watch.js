import { RuntimeEvents } from "../../core/runtime/lifecycle.js"

export function watch(
  path,
  callback
) {

  return RuntimeEvents.on(
    `store:${path}`,
    callback
  );
}

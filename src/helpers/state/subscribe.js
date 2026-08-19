import {listeners} from "./listeners.js";

export function subscribe(
  path,
  callback
) {

  if (typeof path === "function") {
    callback = path;
    path = null;
  }

  const listener = {
    path,
    callback
  };

  listeners.push(listener);

  return () => {

    const index =
      listeners.indexOf(listener);

    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}

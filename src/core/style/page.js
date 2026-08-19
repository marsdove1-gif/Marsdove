import loadStyle from "./load.js";
import unloadStyle from "./unload.js";

let current = null;

export default async function loadPageStyle(href) {

  if (current === href) {
    return;
  }

  if (current) {
    unloadStyle(current);
  }

  await loadStyle(href);

  current = href;

}
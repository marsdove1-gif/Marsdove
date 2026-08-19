import { setRoot, app } from "./root.js";

import {resolve} from './resolveScope.js';
export function replace(node, scope = null) {

  const appRoot = app()?.get?.("root");
  const target = resolve(scope || appRoot || "#root");

  if (!target) {
    return;
  }

  const fragment =
    document.createDocumentFragment();

  fragment.append(node);

  target.replaceChildren(fragment);

  setRoot(target);


}
import {resolve} from './resolveScope.js';

export function add(node, scope = "#root") {

  const target = resolve(scope);

  if (!target) {
    return;
  }

  target.append(node);

}
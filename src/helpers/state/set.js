import {notify} from './notify.js';
import {state} from './state.js';

export function set(path, value) {
  const keys = path.split(".");
  let target = state;

  for (
    let i = 0;
    i < keys.length - 1;
    i++
  ) {
    const key = keys[i];

    if (!target[key]) {
      target[key] = {};
    }

    target = target[key];
  }

  target[keys.at(-1)] = value;

  
  notify(path, value);
}
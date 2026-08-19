import { RuntimeEvents } from "../../core/runtime/lifecycle.js";
import {state} from './state.js';
import {listeners} from './listeners.js';

export function notify(path, value) {

  listeners.forEach(listener => {

    if (
      listener.path === null ||
      path.startsWith(listener.path) ||
      listener.path.startsWith(path)
    ) {

      listener.callback(
        value,
        state
      );
    }
  });

  RuntimeEvents.emit(
    "store:update",
    {
      path,
      value,
      state
    }
  );

  RuntimeEvents.emit(
    `store:${path}`,
    {
      path,
      value,
      state
    }
  );
  
  console.log(
  "[NOTIFY]",
  path,
  value
);
}

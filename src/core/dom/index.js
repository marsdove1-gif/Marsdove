import { _$ } from "./create.js";
import { $, $$ } from "./query.js";
import { add } from "./add.js";
import { replace } from "./replace.js";
import { on, once, off } from "./events.js";
import { root, app, setRoot, setApp } from "./root.js";

export {
  on, off, once,
  $, $$,
  _$,
  add, replace,
  root, app, setRoot, setApp
};

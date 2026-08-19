import { replace } from "../dom/index.js";

export default function render(view, target = "#root") {

  if (!(view instanceof Node)) {
    throw new TypeError(
      "Render: view must be a DOM Node."
    );
  }

  replace(view, target);

  return view;

}
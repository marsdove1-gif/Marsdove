import { _$ } from "../../core/dom/index.js";

export default function List(
  tag = "ul",
  { className = "", ...props } = {},
  ...children
) {
  return _$(tag, {
    ...props,
    className: ["list", className].filter(Boolean).join(" ")
  }, ...children);
}

export { List };

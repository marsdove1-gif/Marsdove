import { _$ } from "../../core/dom/index.js";

export default function Label(
  tag = "label",
  { className = "", ...props } = {},
  ...children
) {
  return _$(tag, {
    ...props,
    className: ["label", className].filter(Boolean).join(" ")
  }, ...children);
}

export { Label };

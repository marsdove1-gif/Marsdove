import { _$ } from "../../core/dom/index.js";

export default function Divider(
  tag = "hr",
  { className = "", ...props } = {},
  ...children
) {
  return _$(tag, {
    ...props,
    className: ["divider", className].filter(Boolean).join(" ")
  }, ...children);
}

export { Divider };

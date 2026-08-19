import { _$ } from "../../core/dom/index.js";

export default function Box(
  tag = "div",
  { className = "", ...props } = {},
  ...children
) {
  return _$(tag, { ...props, className }, ...children);
}

export { Box };

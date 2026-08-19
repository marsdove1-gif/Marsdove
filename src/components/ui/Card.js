import { _$ } from "../../core/dom/index.js";

export default function Card(
  tag = "article",
  { className = "", ...props } = {},
  ...children
) {
  return _$(tag, {
    ...props,
    className: ["card", className].filter(Boolean).join(" ")
  }, ...children);
}

export { Card };

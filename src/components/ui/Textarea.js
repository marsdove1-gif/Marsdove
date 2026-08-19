import { _$ } from "../../core/dom/index.js";

export default function Textarea(
  tag = "textarea",
  { className = "", ...props } = {},
  ...children
) {
  return _$(tag, {
    ...props,
    className: ["textarea", className].filter(Boolean).join(" ")
  }, ...children);
}

export { Textarea };

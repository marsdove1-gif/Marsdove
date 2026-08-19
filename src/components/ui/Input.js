import { _$ } from "../../core/dom/index.js";

export default function Input(
  tag = "input",
  { className = "", ...props } = {},
  ...children
) {
  return _$(tag, {
    ...props,
    className: ["input", className].filter(Boolean).join(" ")
  }, ...children);
}

export { Input };

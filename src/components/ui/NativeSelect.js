import { _$ } from "../../core/dom/index.js";

export default function NativeSelect(
  tag = "select",
  { className = "", ...props } = {},
  ...children
) {
  return _$(tag, {
    ...props,
    className: ["select-native", className].filter(Boolean).join(" ")
  }, ...children);
}

export { NativeSelect };

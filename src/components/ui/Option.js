import { _$ } from "../../core/dom/index.js";

export default function Option(
  tag = "option",
  { value = "", className = "", ...props } = {},
  ...children
) {
  return _$(tag, {
    value,
    ...props,
    className
  }, ...children);
}

export { Option };

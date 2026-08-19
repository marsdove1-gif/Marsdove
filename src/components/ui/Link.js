import { _$ } from "../../core/dom/index.js";

export default function Link(
  tag = "a",
  { href = "#", className = "", ...props } = {},
  ...children
) {
  return _$(tag, {
    href,
    ...props,
    className: ["link", className].filter(Boolean).join(" ")
  }, ...children);
}

export { Link };

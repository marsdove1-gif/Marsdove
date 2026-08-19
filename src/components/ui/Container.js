import { _$ } from "../../core/dom/index.js";

export default function Container(
  tag = "div",
  { size = "default", className = "", ...props } = {},
  ...children
) {
  return _$(tag, {
    ...props,
    className: [
      "container",
      size !== "default" && `container-${size}`,
      className
    ].filter(Boolean).join(" ")
  }, ...children);
}

export { Container };

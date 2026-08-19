import { _$ } from "../../core/dom/index.js";

export default function Image(
  tag = "img",
  { src = "", alt = "", className = "", ...props } = {},
  ...children
) {
  return _$(tag, {
    src,
    alt,
    ...props,
    className: ["image", className].filter(Boolean).join(" ")
  }, ...children);
}

export { Image };

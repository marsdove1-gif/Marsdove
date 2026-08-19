import { _$ } from "../../core/dom/index.js";
import Image from "./Image.js";

export default function Avatar(
  tag = "div",
  { src, alt = "", size = "md", className = "", ...props } = {},
  ...children
) {
  const content = src
    ? Image("img", { src, alt })
    : children;

  return _$(tag, {
    ...props,
    className: ["avatar", `avatar-${size}`, className].filter(Boolean).join(" ")
  }, ...(Array.isArray(content) ? content : [content]));
}

export { Avatar };

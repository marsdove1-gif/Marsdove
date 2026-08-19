import { _$ } from "../../core/dom/index.js";

export default function Paragraph(
  tag = "p",
  { className = "", ...props } = {},
  ...children
) {
  return _$(tag, {
    ...props,
    className: ["paragraph", className].filter(Boolean).join(" ")
  }, ...children);
}

export { Paragraph };

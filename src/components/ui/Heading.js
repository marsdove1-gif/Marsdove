import { _$ } from "../../core/dom/index.js";

export default function Heading(
  tag = "h2",
  {
    tone = "default",
    weight = "bold",
    align = "",
    className = "",
    ...props
  } = {},
  ...children
) {
  return _$(tag, {
    ...props,
    className: [
      "heading",
      `heading-${tag}`,
      tone && `text-${tone}`,
      weight && `text-${weight}`,
      align && `text-${align}`,
      className
    ].filter(Boolean).join(" ")
  }, ...children);
}

export { Heading };

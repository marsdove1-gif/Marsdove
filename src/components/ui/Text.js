import { _$ } from "../../core/dom/index.js";

export default function Text(
  tag = "span",
  {
    tone = "default",
    size = "md",
    weight = "normal",
    align = "",
    className = "",
    ...props
  } = {},
  ...children
) {
  return _$(tag, {
    ...props,
    className: [
      "text",
      tone && `text-${tone}`,
      size && `text-${size}`,
      weight && `text-${weight}`,
      align && `text-${align}`,
      className
    ].filter(Boolean).join(" ")
  }, ...children);
}

export { Text };

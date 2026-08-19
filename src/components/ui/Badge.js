import { _$ } from "../../core/dom/index.js";

export default function Badge(
  tag = "span",
  {
    variant = "neutral",
    size = "md",
    dot = false,
    className = "",
    ...props
  } = {},
  ...children
) {
  return _$(tag, {
    ...props,
    className: [
      "badge",
      `badge-${variant}`,
      `badge-${size}`,
      dot && "badge-dot",
      className
    ].filter(Boolean).join(" ")
  }, ...children);
}

export { Badge };

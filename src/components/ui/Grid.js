import { _$ } from "../../core/dom/index.js";

export default function Grid(
  tag = "div",
  {
    columns = "auto",
    gap = "md",
    min = "220px",
    className = "",
    ...props
  } = {},
  ...children
) {
  return _$(tag, {
    ...props,
    style: {
      ...(props.style || {}),
      ...(columns !== "auto" ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : {}),
      ...(columns === "auto" ? { gridTemplateColumns: `repeat(auto-fit, minmax(${min}, 1fr))` } : {}),
      ...(typeof gap === "number" ? { gap: `${gap}px` } : {})
    },
    className: ["grid", gap && `grid-gap-${gap}`, className].filter(Boolean).join(" ")
  }, ...children);
}

export { Grid };

import { _$ } from "../../core/dom/index.js";

export default function Stack(
  tag = "div",
  {
    direction = "column",
    gap = "md",
    align = "",
    justify = "",
    wrap = false,
    className = "",
    ...props
  } = {},
  ...children
) {
  const gapValue = typeof gap === "number" ? `${gap}px` : gap;

  return _$(tag, {
    ...props,
    style: {
      ...(props.style || {}),
      ...(gapValue && !["xs", "sm", "md", "lg", "xl"].includes(gapValue)
        ? { gap: gapValue }
        : {})
    },
    className: [
      "stack",
      `stack-${direction}`,
      gap && `stack-gap-${gap}`,
      align && `stack-align-${align}`,
      justify && `stack-justify-${justify}`,
      wrap && "stack-wrap",
      className
    ].filter(Boolean).join(" ")
  }, ...children);
}

export { Stack };

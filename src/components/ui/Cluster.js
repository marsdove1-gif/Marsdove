import { _$ } from "../../core/dom/index.js";

export default function Cluster(
  tag = "div",
  {
    gap = "sm",
    align = "center",
    justify = "start",
    className = "",
    ...props
  } = {},
  ...children
) {
  return _$(tag, {
    ...props,
    className: [
      "cluster",
      gap && `cluster-gap-${gap}`,
      `cluster-align-${align}`,
      `cluster-justify-${justify}`,
      className
    ].filter(Boolean).join(" ")
  }, ...children);
}

export { Cluster };

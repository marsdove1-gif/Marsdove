import Box from "../ui/Box.js";

export default function Skeleton(
  tag = "span",
  { width = "100%", height = "1rem", radius = "sm", className = "", ...props } = {},
  ...children
) {
  return Box(tag, {
    ...props,
    style: {
      ...(props.style || {}),
      width,
      height
    },
    className: ["skeleton", `skeleton-${radius}`, className]
      .filter(Boolean).join(" ")
  }, ...children);
}

export { Skeleton };

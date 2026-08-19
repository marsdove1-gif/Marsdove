import Box from "../ui/Box.js";

export default function ButtonGroup(
  tag = "div",
  { className = "", orientation = "horizontal", ...props } = {},
  ...children
) {
  return Box(tag, {
    ...props,
    role: props.role ?? "group",
    className: [
      "button-group",
      `button-group-${orientation}`,
      className
    ].filter(Boolean).join(" ")
  }, ...children);
}

export { ButtonGroup };

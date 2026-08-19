import Input from "./Input.js";

export default function Checkbox(
  tag = "input",
  { className = "", ...props } = {},
  ...children
) {
  return Input(tag, {
    ...props,
    type: "checkbox",
    className: ["checkbox", className].filter(Boolean).join(" ")
  }, ...children);
}

export { Checkbox };

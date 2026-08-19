import Input from "./Input.js";

export default function Radio(
  tag = "input",
  { className = "", ...props } = {},
  ...children
) {
  return Input(tag, {
    ...props,
    type: "radio",
    className: ["radio", className].filter(Boolean).join(" ")
  }, ...children);
}

export { Radio };

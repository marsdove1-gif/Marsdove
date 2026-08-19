import Button from "../ui/Button.js";

export default function OutlineButton(tag = "button", props = {}, ...children) {
  return Button(tag, {
    ...props,
    variant: props.variant ?? "outline",
    className: ["outline-button", props.className].filter(Boolean).join(" ")
  }, ...children);
}

export { OutlineButton };

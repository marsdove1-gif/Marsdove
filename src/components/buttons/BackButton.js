import Button from "../ui/Button.js";

export default function BackButton(tag = "button", props = {}, ...children) {
  return Button(tag, {
    ...props,
    variant: props.variant ?? "back",
    className: ["back-button", props.className].filter(Boolean).join(" ")
  }, ...children);
}

export { BackButton };

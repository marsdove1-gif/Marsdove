import Button from "../ui/Button.js";

export default function SecondaryButton(tag = "button", props = {}, ...children) {
  return Button(tag, {
    ...props,
    variant: props.variant ?? "secondary",
    className: ["secondary-button", props.className].filter(Boolean).join(" ")
  }, ...children);
}

export { SecondaryButton };

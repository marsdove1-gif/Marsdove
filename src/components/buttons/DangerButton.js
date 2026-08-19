import Button from "../ui/Button.js";

export default function DangerButton(tag = "button", props = {}, ...children) {
  return Button(tag, {
    ...props,
    variant: props.variant ?? "danger",
    className: ["danger-button", props.className].filter(Boolean).join(" ")
  }, ...children);
}

export { DangerButton };

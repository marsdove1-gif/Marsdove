import Button from "../ui/Button.js";

export default function SuccessButton(tag = "button", props = {}, ...children) {
  return Button(tag, {
    ...props,
    variant: props.variant ?? "success",
    className: ["success-button", props.className].filter(Boolean).join(" ")
  }, ...children);
}

export { SuccessButton };

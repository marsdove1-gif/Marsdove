import Button from "../ui/Button.js";

export default function PrimaryButton(tag = "button", props = {}, ...children) {
  return Button(tag, {
    ...props,
    variant: props.variant ?? "primary",
    className: ["primary-button", props.className].filter(Boolean).join(" ")
  }, ...children);
}

export { PrimaryButton };

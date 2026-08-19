import Button from "../ui/Button.js";

export default function LinkButton(tag = "button", props = {}, ...children) {
  return Button(tag, {
    ...props,
    variant: props.variant ?? "link",
    className: ["link-button", props.className].filter(Boolean).join(" ")
  }, ...children);
}

export { LinkButton };

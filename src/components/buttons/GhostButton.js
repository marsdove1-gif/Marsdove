import Button from "../ui/Button.js";

export default function GhostButton(tag = "button", props = {}, ...children) {
  return Button(tag, {
    ...props,
    variant: props.variant ?? "ghost",
    className: ["ghost-button", props.className].filter(Boolean).join(" ")
  }, ...children);
}

export { GhostButton };

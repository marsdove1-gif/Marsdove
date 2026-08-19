import Button from "../ui/Button.js";
import Icon from "../ui/Icon.js";

export default function IconButton(
  tag = "button",
  {
    name = "",
    label,
    iconType = "icon",
    className = "",
    ...props
  } = {},
  ...children
) {
  const icon = name
    ? Icon("span", { name, type: iconType, label })
    : null;

  return Button(tag, {
    ...props,
    "aria-label": props["aria-label"] ?? label,
    variant: props.variant ?? "ghost",
    className: ["icon-button", className].filter(Boolean).join(" ")
  }, icon, ...children);
}

export { IconButton };

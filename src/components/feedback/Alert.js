import Box from "../ui/Box.js";
import Icon from "../ui/Icon.js";
import Text from "../ui/Text.js";

const ICONS = {
  success: "check",
  warning: "warning",
  danger: "x",
  info: "info"
};

export default function Alert(
  tag = "div",
  {
    variant = "info",
    title,
    icon = ICONS[variant],
    className = "",
    ...props
  } = {},
  ...children
) {
  return Box(tag, {
    ...props,
    role: props.role ?? "alert",
    className: ["alert", `alert-${variant}`, className]
      .filter(Boolean).join(" ")
  },
    icon ? Icon("span", { name: icon, className: "alert-icon" }) : null,
    Box("div", { className: "alert-content" },
      title ? Text("strong", { className: "alert-title", weight: "bold" }, title) : null,
      ...children
    )
  );
}

export { Alert };

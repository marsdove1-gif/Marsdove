import { _$ } from "../../core/dom/index.js";
import styleCom from "../../helpers/styleCom.js";

styleCom("/styles/ui/ui.css");

export default function Spinner(
  tag = "span",
  { size = "md", label = "Loading", className = "", ...props } = {},
  ...children
) {
  return _$(tag, {
    role: "status",
    "aria-label": label,
    ...props,
    className: ["spinner", `spinner-${size}`, className]
      .filter(Boolean).join(" ")
  }, ...children);
}

export { Spinner };

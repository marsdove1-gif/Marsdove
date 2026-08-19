import { _$ } from "../../core/dom/index.js";
import styleCom from "../../helpers/styleCom.js";

styleCom("/styles/ui/icon.css");

/**
 * Low-level UI primitive for icons.
 *
 * Component contract:
 * Icon(tag, props, ...children)
 */
export default function Icon(
  tag = "span",
  {
    name = "",
    type = "icon",
    size = "",
    label,
    className = "",
    ...props
  } = {},
  ...children
) {
  return _$(tag, {
    ...props,
    "data-icon": name || undefined,
    "data-icon-type": type,
    "aria-label": label,
    "aria-hidden": label ? undefined : "true",
    className: [
      "icon",
      name && `icon-${name}`,
      size && `icon-${size}`,
      className
    ].filter(Boolean).join(" ")
  }, ...children);
}

export { Icon };

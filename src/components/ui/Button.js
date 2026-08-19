import { _$ } from "../../core/dom/index.js";
import styleCom from "../../helpers/styleCom.js";

styleCom("/styles/components/buttons.css");

export default function Button(
  tag = "button",
  {
    className = "",
    onClick,
    type = "button",
    disabled = false,
    loading = false,
    size = "md",
    variant = "",
    fullWidth = false,
    ...props
  } = {},
  ...children
) {
  return _$(tag, {
    type: tag === "button" ? type : undefined,
    disabled: disabled || loading,
    "aria-busy": loading ? "true" : undefined,
    onClick,
    className: [
      "btn",
      size && `btn-${size}`,
      variant && `btn-${variant}`,
      loading && "is-loading",
      disabled && "is-disabled",
      fullWidth && "btn-full",
      className
    ].filter(Boolean).join(" "),
    ...props
  }, ...children);
}

export { Button };

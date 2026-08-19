import { _$ } from "../../core/dom/index.js";

export default function ListItem(
  tag = "li",
  { className = "", ...props } = {},
  ...children
) {
  return _$(tag, {
    ...props,
    className: ["list-item", className].filter(Boolean).join(" ")
  }, ...children);
}

export { ListItem };

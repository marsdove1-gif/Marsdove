import Box from "../ui/Box.js";
import NavItem from "./NavItem.js";

export default function Nav(
  tag = "nav",
  { items = [], className = "", ...props } = {},
  ...children
) {
  const links = items.map((item) => NavItem("a", {
    href: item.href ?? "#",
    active: Boolean(item.active),
    className: item.className
  }, item.label ?? item.name ?? ""));

  return Box(tag, {
    ...props,
    "aria-label": props["aria-label"] ?? "Primary navigation",
    className: ["nav", className].filter(Boolean).join(" ")
  }, ...links, ...children);
}

export { Nav };

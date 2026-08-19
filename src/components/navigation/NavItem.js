import Link from "../ui/Link.js";

export default function NavItem(
  tag = "a",
  { href = "#", active = false, className = "", ...props } = {},
  ...children
) {
  return Link(tag, {
    ...props,
    href,
    "aria-current": active ? "page" : undefined,
    className: ["nav-item", active && "is-active", className]
      .filter(Boolean).join(" ")
  }, ...children);
}

export { NavItem };

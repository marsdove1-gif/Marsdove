import Box from "../ui/Box.js";
import NavItem from "./NavItem.js";

export default function Breadcrumbs(
  tag = "nav",
  { items = [], separator = "/", className = "", ...props } = {},
  ...children
) {
  return Box(tag, {
    ...props,
    "aria-label": props["aria-label"] ?? "Breadcrumb",
    className: ["breadcrumbs", className].filter(Boolean).join(" ")
  },
    ...items.flatMap((item, index) => [
      NavItem("a", {
        href: item.href ?? "#",
        active: index === items.length - 1,
        className: "breadcrumb-item"
      }, item.label ?? ""),
      index < items.length - 1
        ? Box("span", { className: "breadcrumb-separator", "aria-hidden": "true" }, separator)
        : null
    ]),
    ...children
  );
}

export { Breadcrumbs };

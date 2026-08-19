import Box from "../ui/Box.js";
import Avatar from "../ui/Avatar.js";

export default function AvatarGroup(
  tag = "div",
  { items = [], max, size = "md", className = "", ...props } = {},
  ...children
) {
  const visible = Number.isFinite(max) ? items.slice(0, max) : items;
  const remaining = Math.max(items.length - visible.length, 0);

  return Box(tag, {
    ...props,
    className: ["avatar-group", className].filter(Boolean).join(" ")
  },
    ...visible.map((item) => Avatar("span", {
      src: item.src,
      alt: item.alt ?? item.name ?? "",
      size,
      title: item.name
    })),
    remaining
      ? Avatar("span", { size, className: "avatar-more", alt: `+${remaining}` }, `+${remaining}`)
      : null,
    ...children
  );
}

export { AvatarGroup };

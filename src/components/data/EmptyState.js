import Box from "../ui/Box.js";
import Icon from "../ui/Icon.js";
import Heading from "../ui/Heading.js";
import Paragraph from "../ui/Paragraph.js";

export default function EmptyState(
  tag = "section",
  { icon = "inbox", title = "Nothing here yet", description = "", className = "", ...props } = {},
  ...children
) {
  return Box(tag, {
    ...props,
    className: ["empty-state", className].filter(Boolean).join(" ")
  },
    Icon("span", { name: icon, className: "empty-state-icon" }),
    Heading("h3", { className: "empty-state-title" }, title),
    description ? Paragraph("p", {}, description) : null,
    ...children
  );
}

export { EmptyState };

import Box from "../ui/Box.js";
import Container from "../ui/Container.js";
import Logo from "../ui/Logo.js";
import Text from "../ui/Text.js";

export default function Footer(
  tag = "footer",
  { copyright, className = "", ...props } = {},
  ...children
) {
  return Box(tag, {
    ...props,
    className: ["site-footer", className].filter(Boolean).join(" ")
  },
    Container("div", { className: "footer-inner" },
      Logo("a", { showName: true }),
      Text("small", { tone: "muted" }, copyright ?? ""),
      ...children
    )
  );
}

export { Footer };

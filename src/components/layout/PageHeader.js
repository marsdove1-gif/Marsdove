import Box from "../ui/Box.js";
import Stack from "../ui/Stack.js";
import Heading from "../ui/Heading.js";
import Text from "../ui/Text.js";
export default function PageHeader(tag="header", { title, description, eyebrow, className="", ...props }={}, ...children) {
  return Box(tag, { ...props, className:["page-header", className].filter(Boolean).join(" ") },
    Stack("div", { gap:"xs" },
      eyebrow ? Text("span", { tone:"accent", className:"page-header-eyebrow" }, eyebrow) : null,
      title ? Heading("h1", {}, title) : null,
      description ? Text("p", { tone:"secondary" }, description) : null,
      ...children
    )
  );
}
export { PageHeader };

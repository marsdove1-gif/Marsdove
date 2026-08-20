import Box from "../ui/Box.js";
import Stack from "../ui/Stack.js";
import Heading from "../ui/Heading.js";
import Text from "../ui/Text.js";

/**
 * Reusable section heading. Keep application-specific content outside Marsdove.
 */
export default function FeatureHeader(
  tag = "div",
  { title = "", subtitle = "", action = null, className = "", ...props } = {},
  ...children
) {
  return Box(tag, {
    ...props,
    className: ["feature-header", className].filter(Boolean).join(" ")
  },
    Stack("div", { gap: "xs", className: "feature-header-text" },
      title ? Heading("h2", { className: "feature-title" }, title) : null,
      subtitle ? Text("p", { className: "feature-subtitle" }, subtitle) : null,
      ...children
    ),
    action ? Box("div", { className: "feature-action" }, action) : null
  );
}

export { FeatureHeader };

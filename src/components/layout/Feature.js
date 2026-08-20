import Box from "../ui/Box.js";
import FeatureHeader from "./FeatureHeader.js";
import styleCom from "../../helpers/styleCom.js";

styleCom("/styles/components/feature.css");

/**
 * Reusable content section. It composes FeatureHeader instead of creating
 * a private one-off heading internally.
 */
export default function Feature(
  tag = "section",
  { title = "", subtitle = "", action = null, header = true, className = "", ...props } = {},
  ...children
) {
  return Box(tag, {
    ...props,
    className: ["feature", className].filter(Boolean).join(" ")
  },
    header && (title || subtitle || action)
      ? FeatureHeader("div", { title, subtitle, action })
      : null,
    Box("div", { className: "feature-content" }, ...children)
  );
}

export { Feature };

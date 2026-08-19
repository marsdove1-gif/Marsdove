import Container from "./Container.js";
import Box from "./Box.js";

export default function Section(
  tag = "section",
  { contained = true, className = "", ...props } = {},
  ...children
) {
  const content = contained ? Container("div", {}, ...children) : children;
  return Box(tag, {
    ...props,
    className: ["section", className].filter(Boolean).join(" ")
  }, content);
}

export { Section };

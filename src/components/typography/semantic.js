import Text from "../ui/Text.js";
import Heading from "../ui/Heading.js";

function makeText(defaults, className) {
  return function SemanticText(tag = "span", props = {}, ...children) {
    return Text(tag, {
      ...props,
      ...Object.fromEntries(Object.entries(defaults).map(([key, value]) => [key, props[key] ?? value])),
      className: [className, props.className].filter(Boolean).join(" ")
    }, ...children);
  };
}

export const PrimaryText = makeText({ tone: "default", size: "md" }, "primary-text");
export const SecondaryText = makeText({ tone: "secondary", size: "md" }, "secondary-text");
export const MutedText = makeText({ tone: "muted", size: "sm" }, "muted-text");
export const AccentText = makeText({ tone: "accent", size: "md" }, "accent-text");
export const DangerText = makeText({ tone: "danger", size: "md" }, "danger-text");
export const SuccessText = makeText({ tone: "success", size: "md" }, "success-text");

export function Display(tag = "h1", props = {}, ...children) {
  return Heading(tag, {
    ...props,
    level: props.level ?? 1,
    className: ["display", props.className].filter(Boolean).join(" ")
  }, ...children);
}

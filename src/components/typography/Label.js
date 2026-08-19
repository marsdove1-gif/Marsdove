import Text from "../ui/Text.js";

export default function Label(tag = "label", props = {}, ...children) {
  return Text(tag, {
    ...props,
    tone: props.tone ?? "default",
    size: props.size ?? "sm",
    weight: props.weight ?? "medium",
    className: ["label", props.className].filter(Boolean).join(" ")
  }, ...children);
}

export { Label };

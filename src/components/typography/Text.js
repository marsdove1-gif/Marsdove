import TextPrimitive from "../ui/Text.js";

export default function Text(tag = "span", props = {}, ...children) {
  return TextPrimitive(tag, props, ...children);
}

export { Text };

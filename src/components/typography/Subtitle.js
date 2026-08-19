import Text from "../ui/Text.js";

export default function Subtitle(tag = "p", props = {}, ...children) {
  return Text(tag, {
    ...props,
    tone: props.tone ?? "secondary",
    size: props.size ?? "lg",
    className: ["subtitle", props.className].filter(Boolean).join(" ")
  }, ...children);
}

export { Subtitle };

import Text from "../ui/Text.js";

export default function Paragraph(tag = "p", props = {}, ...children) {
  return Text(tag, {
    ...props,
    className: ["paragraph", props.className].filter(Boolean).join(" ")
  }, ...children);
}

export { Paragraph };

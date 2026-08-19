import Heading from "../ui/Heading.js";

export default function Title(tag = "h1", props = {}, ...children) {
  return Heading(tag, {
    ...props,
    className: ["title", props.className].filter(Boolean).join(" ")
  }, ...children);
}

export { Title };

import BadgePrimitive from "../ui/Badge.js";

export default function Badge(tag = "span", props = {}, ...children) {
  return BadgePrimitive(tag, props, ...children);
}

export { Badge };

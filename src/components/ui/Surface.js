import Box from "./Box.js";

export default function Surface(tag = "div", { variant = "default", ...props } = {}, ...children) {
  return Box(tag, {
    ...props,
    className: ["surface", `surface-${variant}`, props.className].filter(Boolean).join(" ")
  }, ...children);
}

export { Surface };

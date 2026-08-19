import { app } from "../../core/dom/index.js";
import Image from "./Image.js";
import Link from "./Link.js";
import Text from "./Text.js";

export default function Logo(
  tag = "a",
  {
    href = "/",
    showName = true,
    src,
    name,
    alt,
    className = "",
    ...props
  } = {},
  ...children
) {
  const activeApp = app();
  const brand = activeApp?.get("brand", {}) || {};
  const logo = src ?? brand.logo ?? "";
  const brandName = name ?? brand.name ?? "";
  const content = [];

  if (logo) {
    content.push(Image("img", {
      src: logo,
      alt: alt ?? brandName,
      className: "logo-image"
    }));
  }

  if (showName && brandName) {
    content.push(Text("span", {
      className: "logo-name"
    }, brandName));
  }

  if (children.length) content.push(...children);

  return Link(tag, {
    ...props,
    href,
    className: ["logo", className].filter(Boolean).join(" ")
  }, ...content);
}

export { Logo };

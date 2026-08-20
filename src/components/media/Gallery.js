import Box from "../ui/Box.js";
import Stack from "../ui/Stack.js";
import Image from "../ui/Image.js";
import Button from "../ui/Button.js";
import styleCom from "../../helpers/styleCom.js";

styleCom("/styles/components/media.css");

function resolveItem(item, index, getSrc, getAlt) {
  const source = getSrc ? getSrc(item, index) : item;
  const src = typeof source === "string" ? source : source?.url || source?.src || "";
  const alt = getAlt ? getAlt(item, index) : (typeof item === "object" ? item?.alt : "") || "Image";
  return { src, alt };
}

/**
 * Generic image gallery. It owns gallery interaction, not product/business logic.
 */
export default function Gallery(
  tag = "div",
  {
    items = [],
    value = 0,
    onChange,
    getSrc,
    getAlt,
    thumbnails = true,
    className = "",
    ...props
  } = {},
  ...children
) {
  const safeItems = Array.isArray(items) ? items : [];
  let active = Math.min(Math.max(Number(value) || 0, 0), Math.max(safeItems.length - 1, 0));

  const root = Box(tag, {
    ...props,
    className: ["gallery", className].filter(Boolean).join(" ")
  });

  if (!safeItems.length) {
    root.append(...children);
    return root;
  }

  const main = Box("div", { className: "gallery-main" });
  const thumbs = Stack("div", {
    direction: "row",
    gap: "sm",
    wrap: true,
    className: "gallery-thumbnails"
  });

  function render() {
    const current = resolveItem(safeItems[active], active, getSrc, getAlt);
    main.replaceChildren(
      current.src
        ? Image("img", { src: current.src, alt: current.alt, className: "gallery-image" })
        : null
    );

    if (!thumbnails) return;

    thumbs.replaceChildren(...safeItems.map((item, index) => {
      const image = resolveItem(item, index, getSrc, getAlt);
      return Button("button", {
        type: "button",
        className: ["gallery-thumb", index === active && "is-active"].filter(Boolean).join(" "),
        "aria-label": `View image ${index + 1}`,
        "aria-pressed": index === active ? "true" : "false",
        onClick: () => {
          active = index;
          onChange?.(item, index);
          render();
        }
      }, image.src ? Image("img", { src: image.src, alt: image.alt }) : null);
    }));
  }

  root.append(main);
  if (thumbnails) root.append(thumbs);
  root.append(...children);
  render();

  return root;
}

export { Gallery };

import Box from "../ui/Box.js";
import Container from "../ui/Container.js";
import Stack from "../ui/Stack.js";
import Heading from "../ui/Heading.js";
import Text from "../ui/Text.js";
import Image from "../ui/Image.js";
import styleCom from "../../helpers/styleCom.js";
styleCom("/styles/components/feature.css");

export default function Hero(tag = "section", { eyebrow, title, description, media, actions = [], align = "left", className = "", ...props } = {}, ...children) {
  return Box(tag, { ...props, className: ["hero", `hero-${align}`, className].filter(Boolean).join(" ") },
    Container("div", {},
      Box("div", { className: "hero-grid" },
        Stack("div", { gap: "md", className: "hero-content" },
          eyebrow ? Text("span", { className: "hero-eyebrow", tone: "accent" }, eyebrow) : null,
          title ? Heading("h1", {}, title) : null,
          description ? Text("p", { size: "lg", tone: "secondary" }, description) : null,
          actions.length ? Box("div", { className: "hero-actions" }, ...actions) : null,
          ...children
        ),
        media ? (typeof media === "string" ? Image("img", { src: media, className: "hero-media" }) : media) : null
      )
    )
  );
}
export { Hero };

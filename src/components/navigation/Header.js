import Box from "../ui/Box.js";
import Container from "../ui/Container.js";
import Logo from "../ui/Logo.js";
import Nav from "./Nav.js";
import styleCom from "../../helpers/styleCom.js";

styleCom("/styles/components/header.css");

export default function Header(
  tag = "header",
  {
    items = [],
    logo = {},
    actions = [],
    className = "",
    containerProps = {},
    ...props
  } = {},
  ...children
) {
  const actionNodes = actions.map((action) => action?.node).filter(Boolean);

  return Box(tag, {
    ...props,
    className: ["site-header", className].filter(Boolean).join(" ")
  },
    Container("div", {
      ...containerProps,
      className: ["header-inner", containerProps.className].filter(Boolean).join(" ")
    },
      Box("div", { className: "header-brand" }, Logo("a", logo)),
      items.length ? Nav("nav", { items }) : null,
      Box("div", { className: "header-actions" }, ...actionNodes),
      ...children
    )
  );
}

export { Header };

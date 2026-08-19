import Box from "../ui/Box.js";
import Text from "../ui/Text.js";

export default function Table(
  tag = "table",
  { columns = [], rows = [], caption, className = "", ...props } = {},
  ...children
) {
  const head = Box("thead", {},
    Box("tr", {}, ...columns.map((column) =>
      Box("th", { scope: "col" }, column.label ?? column.key ?? "")
    ))
  );

  const body = Box("tbody", {}, ...rows.map((row) =>
    Box("tr", {}, ...columns.map((column) => {
      const value = typeof column.render === "function"
        ? column.render(row)
        : row?.[column.key];
      return Box("td", {}, value ?? "");
    }))
  ));

  return Box(tag, {
    ...props,
    className: ["data-table", className].filter(Boolean).join(" ")
  },
    caption ? Text("caption", { className: "table-caption" }, caption) : null,
    head,
    body,
    ...children
  );
}

export { Table };

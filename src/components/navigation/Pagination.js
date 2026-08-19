import Box from "../ui/Box.js";
import Button from "../ui/Button.js";
import { resolveStore } from "../../core/store/resolveStore.js";

export default function Pagination(
  tag = "nav",
  { page = 1, pages = 1, onChange, store, storePath, className = "", ...props } = {},
  ...children
) {
  const storeRef = resolveStore(store);
  let currentPage = Number(storeRef && storePath ? storeRef.get(storePath, page) : page) || 1;
  const go = (next) => {
    if (next < 1 || next > pages || next === currentPage) return;
    currentPage = next;
    if (storeRef && storePath) storeRef.set(storePath, next);
    onChange?.(next);
  };

  const buttons = [];
  for (let current = 1; current <= pages; current += 1) {
    buttons.push(Button("button", {
      type: "button",
      variant: current === currentPage ? "primary" : "ghost",
      "aria-current": current === currentPage ? "page" : undefined,
      onClick: () => go(current),
      className: "pagination-item"
    }, String(current)));
  }

  return Box(tag, {
    ...props,
    "aria-label": props["aria-label"] ?? "Pagination",
    className: ["pagination", className].filter(Boolean).join(" ")
  },
    Button("button", { type: "button", variant: "ghost", disabled: currentPage <= 1, onClick: () => go(currentPage - 1) }, "Previous"),
    ...buttons,
    Button("button", { type: "button", variant: "ghost", disabled: currentPage >= pages, onClick: () => go(currentPage + 1) }, "Next"),
    ...children
  );
}

export { Pagination };

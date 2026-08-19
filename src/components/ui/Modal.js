import { _$ } from "../../core/dom/index.js";
import styleCom from "../../helpers/styleCom.js";
import { resolveStore } from "../../core/store/resolveStore.js";

styleCom("/styles/modal.css");

export default function Modal(
  tag = "dialog",
  { open = false, store, storePath, className = "", onClose, ...props } = {},
  ...children
) {
  const storeRef = resolveStore(store);
  const initialOpen = storeRef && storePath ? Boolean(storeRef.get(storePath, open)) : Boolean(open);
  const node = _$(tag, {
    ...props,
    className: ["modal", className].filter(Boolean).join(" "),
    onClose
  }, ...children);

  if (tag === "dialog" && initialOpen) {
    if (typeof node.showModal === "function") node.showModal();
    else node.setAttribute("open", "");
  }

  if (storeRef && storePath) {
    storeRef.subscribe(storePath, next => {
      if (tag !== "dialog") { node.hidden = !next; return; }
      if (next && !node.open && typeof node.showModal === "function") node.showModal();
      else if (next) node.setAttribute("open", "");
      else if (node.open && typeof node.close === "function") node.close();
      else node.removeAttribute("open");
    });
  }

  return node;
}

export { Modal };

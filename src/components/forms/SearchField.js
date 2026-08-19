import Box from "../ui/Box.js";
import Icon from "../ui/Icon.js";
import Input from "../ui/Input.js";
import { resolveStore } from "../../core/store/resolveStore.js";

export default function SearchField(
  tag = "div",
  { className = "", icon = "search", store, storePath, onInput, ...props } = {},
  ...children
) {
  const storeRef = resolveStore(store);
  const input = Input("input", { ...props, type: "search", className: "search-field-input", value: storeRef && storePath ? (storeRef.get(storePath, props.value ?? "") ?? "") : props.value, onInput: event => { storeRef && storePath && storeRef.set(storePath, event.target.value); onInput?.(event); } });

  if (storeRef && storePath) storeRef.subscribe(storePath, value => { if (value != null && input.value !== String(value)) input.value = String(value); });

  return Box(tag, {
    className: ["search-field", className].filter(Boolean).join(" ")
  },
    Icon("span", { name: icon, className: "search-field-icon" }),
    input,
    ...children
  );
}

export { SearchField };

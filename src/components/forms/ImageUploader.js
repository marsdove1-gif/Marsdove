import Box from "../ui/Box.js";
import Button from "../ui/Button.js";
import Image from "../ui/Image.js";
import Input from "../ui/Input.js";
import Text from "../ui/Text.js";
import { resolveStore } from "../../core/store/resolveStore.js";
import styleCom from "../../helpers/styleCom.js";

styleCom("/styles/components/media.css");

export default function ImageUploader(
  tag = "div",
  {
    value = [],
    multiple = true,
    accept = "image/*",
    store,
    storePath,
    onChange,
    label = "Upload images",
    hint = "Select one or more images.",
    maxFiles,
    className = "",
    ...props
  } = {},
  ...children
) {
  const root = Box(tag, { ...props, className: ["image-uploader", className].filter(Boolean).join(" ") });
  const input = Input("input", { type: "file", accept, multiple, className: "image-uploader-input", "aria-label": label });
  const preview = Box("div", { className: "image-uploader-preview", "aria-live": "polite" });
  const storeRef = resolveStore(store);
  let items = Array.isArray(value) ? [...value] : (value ? [value] : []);

  const title = Text("strong", { className: "image-uploader-label" }, label);
  const helper = Text("span", { className: "image-uploader-hint", tone: "muted", size: "sm" }, hint);
  const trigger = Button("button", { type: "button", variant: "outline", onClick: () => input.click() }, "Choose images");

  function emit() {
    onChange?.(items, input.files);
    if (storeRef && storePath) storeRef.set(storePath, items);
  }

  function render() {
    preview.replaceChildren();
    items.forEach((item, index) => {
      const src = typeof item === "string" ? item : item?.url || item?.src || "";
      if (!src) return;
      preview.append(
        Box("figure", { className: "image-uploader-item" },
          Image("img", { src, alt: item?.name || `Selected image ${index + 1}` }),
          Button("button", { type: "button", variant: "ghost", className: "image-uploader-remove", "aria-label": `Remove image ${index + 1}`, onClick: () => { items.splice(index, 1); render(); emit(); } }, "Remove")
        )
      );
    });
  }

  input.addEventListener("change", () => {
    const files = [...(input.files || [])];
    const selected = multiple ? files : files.slice(0, 1);
    const limited = maxFiles ? selected.slice(0, Math.max(0, maxFiles - items.length)) : selected;
    limited.forEach(file => items.push({ file, name: file.name, url: URL.createObjectURL(file) }));
    render();
    emit();
  });

  if (storeRef && storePath) {
    const stored = storeRef.get(storePath);
    if (Array.isArray(stored)) items = [...stored];
    storeRef.subscribe(storePath, next => {
      if (Array.isArray(next)) { items = [...next]; render(); }
    });
  }

  root.append(title, helper, trigger, input, preview, ...children);
  render();
  return root;
}

export { ImageUploader };

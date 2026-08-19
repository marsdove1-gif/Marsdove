import { on } from "../../core/dom/index.js";
import Button from "./Button.js";
import Box from "./Box.js";
import Icon from "./Icon.js";
import Input from "./Input.js";
import Option from "./Option.js";
import styleCom from "../../helpers/styleCom.js";
import { resolveStore } from "../../core/store/resolveStore.js";

styleCom("/styles/select.css");

function normalizeOptions(options = []) {
  return options.map((option, index) => {
    if (typeof option === "string" || typeof option === "number") {
      return { value: String(option), label: String(option), disabled: false, index };
    }

    return {
      value: String(option?.value ?? ""),
      label: String(option?.label ?? option?.value ?? ""),
      disabled: Boolean(option?.disabled),
      index
    };
  });
}

export default function Select(
  tag = "div",
  {
    options = [],
    value = "",
    placeholder = "Select an option",
    searchable = false,
    disabled = false,
    name,
    id,
    className = "",
    onChange,
    store,
    storePath,
    ...props
  } = {},
  ...children
) {
  const list = normalizeOptions(options);

  const root = Box(tag, {
    ...props,
    id,
    className: ["select", disabled && "disabled", className]
      .filter(Boolean).join(" "),
    attr: { "data-select": "" }
  });

  const valueNode = Box("span", { className: "select-value" });

  const trigger = Button(
    "button",
    {
      type: "button",
      className: "select-trigger",
      disabled,
      "aria-haspopup": "listbox",
      "aria-expanded": "false"
    },
    valueNode,
    Icon("span", {
      name: "chevron-down",
      type: "icon",
      className: "select-icon"
    })
  );

  const dropdown = Box("div", {
    className: "select-dropdown",
    hidden: true
  });

  let search = null;

  if (searchable) {
    search = Input("input", {
      type: "search",
      className: "select-search-input",
      placeholder: "Search..."
    });

    dropdown.append(
      Box("div", { className: "select-search" }, search)
    );
  }

  const optionsNode = Box("div", {
    className: "select-options",
    role: "listbox"
  });

  dropdown.append(optionsNode);

  const hidden = name
    ? Input("input", { type: "hidden", name, value })
    : null;

  root.append(
    ...(hidden ? [hidden] : []),
    trigger,
    dropdown,
    ...children
  );

  const storeRef = resolveStore(store);
  let current = String(storeRef && storePath ? (storeRef.get(storePath, value) ?? "") : (value ?? ""));
  let open = false;

  function selectedOption() {
    return list.find(item => item.value === current);
  }

  function updateValue() {
    const selected = selectedOption();

    valueNode.textContent = selected?.label ?? placeholder;
    valueNode.classList.toggle("select-placeholder", !selected);

    if (hidden) hidden.value = current;

    trigger.classList.toggle("open", open);
    trigger.setAttribute("aria-expanded", String(open));
  }

  function renderOptions(filter = "") {
    optionsNode.replaceChildren();

    const normalized = filter.trim().toLowerCase();
    const visible = list.filter(item =>
      !normalized || item.label.toLowerCase().includes(normalized)
    );

    if (!visible.length) {
      optionsNode.append(
        Box("div", { className: "select-empty" }, "No options found")
      );
      return;
    }

    visible.forEach(item => {
      const option = Option(
        "div",
        {
          value: item.value,
          role: "option",
          tabindex: item.disabled ? undefined : "0",
          "aria-selected": String(item.value === current),
          className: [
            "select-option",
            item.value === current && "selected",
            item.disabled && "disabled"
          ].filter(Boolean).join(" ")
        },
        item.label
      );

      const choose = () => {
        if (item.disabled) return;

        current = item.value;
        updateValue();
        close();

        if (storeRef && storePath) storeRef.set(storePath, current);
        if (typeof onChange === "function") {
          onChange(current, item);
        }
      };

      on(option, "click", choose);
      on(option, "keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          choose();
        }
      });

      optionsNode.append(option);
    });
  }

  function openMenu() {
    if (disabled || open) return;

    open = true;
    dropdown.hidden = false;
    updateValue();
    renderOptions(search?.value || "");
  }

  function close() {
    if (!open) return;

    open = false;
    dropdown.hidden = true;
    updateValue();
  }

  on(trigger, "click", () => open ? close() : openMenu());
  on(document, "click", event => {
    if (!root.contains(event.target)) close();
  });
  on(document, "keydown", event => {
    if (event.key === "Escape") close();
  });

  if (search) {
    on(search, "input", () => renderOptions(search.value));
  }

  if (storeRef && storePath) {
    storeRef.subscribe(storePath, next => {
      if (next == null || String(next) === current) return;
      current = String(next);
      updateValue();
      renderOptions(search?.value || "");
    });
  }

  updateValue();
  renderOptions();

  return root;
}

export { Select };

export function _$(tag, props = {}, ...children) {

  if (typeof tag !== "string") {
    throw new TypeError("DOM.create(): tag must be a string.");
  }

  const el = document.createElement(tag);

  for (const [key, value] of Object.entries(props)) {

    if (value == null) continue;

    switch (key) {

      case "text":
        el.textContent = value;
        break;

      case "html":
        el.innerHTML = value;
        break;

      case "class":
      case "className":
        el.className = value;
        break;

      case "style":
        Object.assign(el.style, value);
        break;

      case "dataset":
        Object.assign(el.dataset, value);
        break;

      case "attr":
        Object.entries(value).forEach(([k, v]) => {
          el.setAttribute(k, v);
        });
        break;

      case "route":

        el.href = value;

        el.addEventListener("click", e => {

          e.preventDefault();

          window.Router?.navigate(value);

        });

        break;

      default:

        if (
          key.startsWith("on") &&
          typeof value === "function"
        ) {

          el.addEventListener(
            key.slice(2).toLowerCase(),
            value
          );

        }

        else {

          el[key] = value;

        }

    }

  }

  const append = child => {

    if (child == null) return;

    if (Array.isArray(child)) {
      child.forEach(append);
      return;
    }

    if (
      typeof child === "string" ||
      typeof child === "number"
    ) {

      el.append(
        document.createTextNode(child)
      );

      return;

    }

    if (
      child instanceof Node
    ) {

      el.append(child);

      return;

    }

  };

  children.forEach(append);

  return el;

}
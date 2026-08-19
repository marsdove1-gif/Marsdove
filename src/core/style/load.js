import styles from "./registry.js";
import resolveStyleHref from "./resolve.js";

export default function loadStyle(href) {
  if (!href) {
    throw new Error("Style href is required.");
  }

  const resolvedHref = resolveStyleHref(href);

  if (styles.has(resolvedHref)) {
    return styles.get(resolvedHref);
  }

  const promise = new Promise((resolve, reject) => {
    let link = document.querySelector(
      `link[data-style="${resolvedHref}"]`
    );

    if (link) {
      resolve(link);
      return;
    }

    link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = resolvedHref;
    link.dataset.style = resolvedHref;

    link.onload = () => resolve(link);

    link.onerror = () => {
      styles.delete(resolvedHref);
      reject(new Error(`Unable to load "${href}" (${resolvedHref}).`));
    };

    document.head.append(link);
  });

  styles.set(resolvedHref, promise);
  return promise;
}

import styles from "./registry.js";
import resolveStyleHref from "./resolve.js";

export default function unloadStyle(href) {
  const resolvedHref = resolveStyleHref(href);

  const link = document.querySelector(
    `link[data-style="${resolvedHref}"]`
  );

  if (link) {
    link.remove();
  }

  styles.delete(resolvedHref);
}

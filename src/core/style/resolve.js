/**
 * Resolve framework style paths to the framework's own styles directory.
 *
 * Component code intentionally uses stable public paths such as
 * `/styles/components/header.css`. In a browser-native build that path is
 * relative to the application origin, which breaks when the framework is
 * served from `/docs/`, `/demo/`, a subfolder, or a static package.
 *
 * The framework root is known relative to this module, so framework-owned
 * styles are resolved from the module location instead of the current URL.
 */
export default function resolveStyleHref(href) {
  if (!href) return href;

  const value = String(href);

  if (!value.startsWith("/styles/")) {
    return new URL(value, document.baseURI).href;
  }

  const relative = value.slice(1);
  return new URL(`../../../${relative}`, import.meta.url).href;
}

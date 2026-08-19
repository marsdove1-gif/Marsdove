export function resolve(scope) {
  if (scope instanceof Element) return scope;
  if (typeof scope === "string") return document.querySelector(scope);
  return null;
}

export default resolve;

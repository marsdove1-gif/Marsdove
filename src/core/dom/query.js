export function $(selector) {

  if (typeof selector !== "string") {
    console.warn("DOM.$: selector must be a string.", selector);
    return null;
  }

  return document.querySelector(selector);

}

export function $$(selector) {

  if (typeof selector !== "string") {
    console.warn("DOM.$$: selector must be a string.", selector);
    return [];
  }

  return [...document.querySelectorAll(selector)];

}
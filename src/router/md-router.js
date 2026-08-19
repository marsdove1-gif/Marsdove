import { replace } from "../core/dom/index.js";
import { RuntimeEvents } from "../core/runtime/lifecycle.js";


const routes = [];
let notFound = null;

let basePath = "";
let beforeEachHooks = [];
let appName = "App";

// --------------------
// START ROUTER
// --------------------
export function start() {
  window.onpopstate = () => {
    render(location.pathname + location.search);
  };

  interceptLinks();
  render(location.pathname + location.search);
}

// --------------------
// CONFIG
// --------------------
function setConfig(options = {}) {
  if (options.basePath) basePath = options.basePath;
  if (options.appName) appName = options.appName;
}

// --------------------
// GLOBAL MIDDLEWARE
// --------------------
function beforeEach(fn) {
  beforeEachHooks.push(fn);
}

// --------------------
// REGISTER ROUTE
// --------------------
function register(path, page, options = {}) {
  routes.push({
    path,
    parts: path.split("/").filter(Boolean),
    page,

    title: options.title || null,
    description: options.description || null,
    meta: options.meta || {},

    layout: options.layout || null,
    guards: options.guards || [],
    beforeEnter: options.beforeEnter || null
  });
}

// --------------------
// UTILITIES
// --------------------
function getCleanPath(path) {
  let clean = path || "/";

  // Browser-native documentation/demo pages may be opened as
  // `/docs/index.html` instead of `/docs/`. Treat both forms identically.
  clean = clean.replace(/\/index\.html$/, "/");

  if (basePath && clean.startsWith(basePath)) {
    clean = clean.replace(basePath, "") || "/";
  }

  if (!clean.startsWith("/")) clean = `/${clean}`;
  if (clean.length > 1 && !clean.endsWith("/") && clean === "/docs") {
    clean += "/";
  }

  return clean;
}

function parseQuery() {
  const params = new URLSearchParams(location.search);
  return Object.fromEntries(params.entries());
}

// --------------------
// ROUTE MATCHER
// --------------------
function match(path) {
  const urlParts = path.split("/").filter(Boolean);

  for (const route of routes) {
    const params = {};
    let matched = true;

    for (let i = 0; i < route.parts.length; i++) {
      const routePart = route.parts[i];
      const urlPart = urlParts[i];

      if (routePart === "*") {
        params["*"] = urlParts.slice(i).join("/");
        return { route, params };
      }

      if (!urlPart) {
        matched = false;
        break;
      }

      if (routePart.startsWith(":")) {
        params[routePart.slice(1)] = decodeURIComponent(urlPart);
      } else if (routePart !== urlPart) {
        matched = false;
        break;
      }
    }

    if (matched && route.parts.length === urlParts.length) {
      return { route, params };
    }
  }

  return null;
}

// --------------------
// GUARDS
// --------------------
async function runGuards(guards, context) {
  for (const guard of guards) {
    const result = await guard(context);

    if (result === false) return false;

    if (typeof result === "string") {
      redirect(result);
      return "REDIRECTED";
    }
  }
  return true;
}

// --------------------
// SEO ENGINE
// --------------------
function applySEO(route, context) {
  applyTitle(route, context);
  applyDescription(route, context);
  applyMeta(route, context);
}

// TITLE
function applyTitle(route, context) {
  if (!route.title) return;

  const title =
    typeof route.title === "function"
      ? route.title(context)
      : route.title;

  document.title = title.includes(appName)
    ? title
    : `${title} | ${appName}`;
}

// DESCRIPTION
function applyDescription(route, context) {
  if (!route.description) return;

  const desc =
    typeof route.description === "function"
      ? route.description(context)
      : route.description;

  let meta = document.querySelector('meta[name="description"]');

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", desc);
}

// EXTRA META (future-proof)
function applyMeta(route, context) {
  if (!route.meta) return;

  for (const [key, value] of Object.entries(route.meta)) {
    let tag = document.querySelector(`meta[name="${key}"]`);

    if (!tag) {
      tag = document.createElement("meta");
      tag.name = key;
      document.head.appendChild(tag);
    }

    tag.setAttribute(
      "content",
      typeof value === "function" ? value(context) : value
    );
  }
}

// --------------------
// RENDER ENGINE
// --------------------
async function render(rawUrl) {


  try {

    const url =
      rawUrl.split("?")[0];

    const path =
      getCleanPath(url);

    const result =
      match(path);

    const query =
      parseQuery();

    if (!result) {

      if (notFound) {
        replace(
          notFound()
        );
      }

      return;
    }

    const {
      route,
      params
    } = result;

    const context = {
      path,
      params,
      query,

      navigate,
      redirect,

      setTitle: (
        title
      ) => {

        document.title =
          title.includes(
            appName
          )
            ? title
            : `${title} | ${appName}`;
      }
    };

    /* =====================
       GLOBAL MIDDLEWARE
    ===================== */

    for (const hook of beforeEachHooks) {

      const res =
        await hook(
          context
        );

      if (
        res === false
      ) {
        return;
      }

      if (
        typeof res ===
        "string"
      ) {

        redirect(res);

        return;
      }
    }

    /* =====================
       SEO
    ===================== */

    applySEO(
      route,
      context
    );

    /* =====================
       BEFORE ENTER
    ===================== */

    if (
      route.beforeEnter
    ) {

      const ok =
        await route.beforeEnter(
          context
        );

      if (
        !ok ||
        ok ===
          "REDIRECTED"
      ) {
        return;
      }
    }

    /* =====================
       GUARDS
    ===================== */

    const allowed =
      await runGuards(
        route.guards,
        context
      );

    if (
      !allowed ||
      allowed ===
        "REDIRECTED"
    ) {
      return;
    }

    /* =====================
       PAGE
    ===================== */

    let pageNode =
      route.page(
        context
      );

    if (
      pageNode instanceof
      Promise
    ) {

      pageNode =
        await pageNode;
    }

    /* =====================
       LAYOUT
    ===================== */

    if (
      route.layout
    ) {

      pageNode =
        route.layout(
          pageNode
        );
    }

    replace(
      pageNode
    );

    window.scrollTo(
      0,
      0
    );
    
RuntimeEvents.emit(
  "route:change",
  {
    path,
    params,
    query
  }
);

  } finally {


  }
}




// --------------------
// NAVIGATION
// --------------------
function navigate(url) {
  if (url === location.pathname + location.search) return;

  history.pushState({}, "", basePath + url);
  render(url);
}

function redirect(url) {
  history.replaceState({}, "", basePath + url);
  render(url);
}

// --------------------
// LINK INTERCEPTOR
// --------------------
function interceptLinks() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const url = link.getAttribute("href");

    if (
      !url ||
      link.target === "_blank" ||
      link.hasAttribute("download") ||
      url.startsWith("http") ||
      url.startsWith("#") ||
      !url.startsWith("/")
    ) return;

    e.preventDefault();
    navigate(url);
  });
}

// --------------------
// NOT FOUND
// --------------------
function set404(page) {
  notFound = page;
}

// --------------------
// EXPORT
// --------------------
export const Router = {
  register,
  navigate,
  redirect,
  start,
  beforeEach,
  setConfig,
  set404
};

// --------------------
// DEV DEBUG
// --------------------
if (typeof window !== "undefined") {
  window.Router = Router;
}
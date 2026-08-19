import { start } from "./src/index.js";
import { Router } from "./src/router/md-router.js";

window.addEventListener("DOMContentLoaded", () => {
  window.Router = Router;
  start();
  Router.start();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(() => console.log("Marsdove SW active 🚀"))
      .catch(error => console.log("SW failed:", error));
  });
}

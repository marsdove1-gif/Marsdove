import Runtime from "../runtime/Runtime.js";
import { render } from "../render/index.js";
import { setApp, setRoot } from "../dom/index.js";

export default async function boot(app) {

  if (!app) {
    throw new Error("Boot requires an application instance.");
  }

  Runtime.start();
  setApp(app);

  const root = app.get("root");
  if (root) setRoot(root);

  const view = app.get("view");

  if (view) {
    render(view, root);
  }

  app.ready();

  return app;

}
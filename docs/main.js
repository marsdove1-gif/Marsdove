import { createApp, Store, Router } from "../src/index.js";
import Overview from "./pages/Overview.js";
import Components from "./pages/Components.js";
import Systems from "./pages/Systems.js";

const app = createApp({
  brand: { name: "Marsdove", tagline: "A browser-native framework for reusable products" },
  root: "#docs"
});
app.store(new Store({ ui: { tab: "overview", drawer: false }, form: { quantity: 1, images: [] } }));
app.ready();

Router.register("/docs/", Overview, { title: "Overview" });
Router.register("/docs/components", Components, { title: "Components" });
Router.register("/docs/systems", Systems, { title: "Systems" });
Router.set404(() => Overview());
Router.setConfig({ appName: app.get("brand.name") });
Router.start();

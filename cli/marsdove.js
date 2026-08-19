#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const command = process.argv[2] || "help";
const target = path.resolve(process.argv[3] || "marsdove-app");
const here = path.dirname(fileURLToPath(import.meta.url));

function init() {
  fs.mkdirSync(target, { recursive: true });
  const dirs = ["src", "styles", "public"];
  dirs.forEach(dir => fs.mkdirSync(path.join(target, dir), { recursive: true }));
  fs.writeFileSync(path.join(target, "package.json"), JSON.stringify({ name: path.basename(target), type:"module", scripts:{start:"node node_modules/marsdove-framework/cli/serve.js . 4173"}, dependencies:{"marsdove-framework":"^5.2.0"} }, null, 2));
  fs.writeFileSync(path.join(target, "index.html"), `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Marsdove App</title></head><body><main id="app"></main><script type="module" src="./src/main.js"></script></body></html>`);
  fs.writeFileSync(path.join(target, "src/main.js"), `import { createApp, Store, Container, Heading, Text } from "marsdove-framework";\n\nconst app = createApp({ brand: { name: "My Marsdove App" } });\napp.store(new Store({ user: null }));\napp.ready();\n\ndocument.querySelector("#app").append(Container("main", {}, Heading("h1", {}, app.get("brand.name")), Text("p", {}, "Marsdove is ready.")));\n`);
  console.log(`Marsdove app created at ${target}`);
  console.log("Run: cd " + target + " && npm install && npm start");
}

if (command === "init") init();
else if (command === "version") console.log("Marsdove Framework 5.2.0");
else console.log("Marsdove CLI\n\nCommands:\n  marsdove init [directory]\n  marsdove version");

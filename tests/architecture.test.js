import assert from "node:assert/strict";
import { DEFAULT_CONFIG } from "../src/core/config/defaults.js";
import { mergeConfig } from "../src/core/config/merge.js";

const config = mergeConfig(DEFAULT_CONFIG, {
  brand: { name: "Example" },
  theme: { colors: { primary: "#000000" } }
});

assert.equal(config.brand.name, "Example");
assert.equal(config.brand.tagline, DEFAULT_CONFIG.brand.tagline);
assert.equal(config.theme.colors.primary, "#000000");
assert.equal(config.theme.colors.accent, DEFAULT_CONFIG.theme.colors.accent);

console.log("Marsdove architecture checks passed.");

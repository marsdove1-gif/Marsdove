/**
 * Marsdove Framework capability registry.
 *
 * This is deliberately tiny and dependency-free. It gives the framework one
 * stable place to expose optional systems without coupling components to the
 * old application architecture.
 */
const capabilities = new Map();

export function registerCapability(name, capability) {
  if (!name || typeof name !== "string") {
    throw new TypeError("Capability name must be a non-empty string.");
  }

  if (capabilities.has(name)) {
    throw new Error(`Marsdove capability already registered: ${name}`);
  }

  capabilities.set(name, capability);
  return capability;
}

export function hasCapability(name) {
  return capabilities.has(name);
}

export function getCapability(name) {
  return capabilities.get(name);
}

export function listCapabilities() {
  return [...capabilities.keys()];
}

export function unregisterCapability(name) {
  return capabilities.delete(name);
}

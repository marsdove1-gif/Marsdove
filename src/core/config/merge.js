export function mergeConfig(base, ...sources) {
  const result = { ...base };

  for (const source of sources) {
    if (!source || typeof source !== "object") continue;

    for (const [key, value] of Object.entries(source)) {
      const current = result[key];

      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        current &&
        typeof current === "object" &&
        !Array.isArray(current)
      ) {
        result[key] = mergeConfig(current, value);
      } else {
        result[key] = value;
      }
    }
  }

  return result;
}

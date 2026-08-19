import { useStyle } from "../core/style/index.js";

export function styleCom(...styles) {
  return useStyle(...styles.flat().filter(Boolean));
}

export default styleCom;

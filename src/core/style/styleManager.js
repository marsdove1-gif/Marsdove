import styles from "./registry.js";

import loadStyle from "./load.js";
import unloadStyle from "./unload.js";
import preloadStyles from "./preload.js";
import loadPageStyle from "./page.js";

const StyleManager = {
  
  load: loadStyle,
  
  unload: unloadStyle,
  
  preload: preloadStyles,
  
  page: loadPageStyle,
  
  has(href) {
    return styles.has(href);
  },
  
  clear() {
    
    for (const href of styles.keys()) {
      unloadStyle(href);
    }
    
  },
  
  entries() {
    return [...styles.keys()];
  }
  
};

export default StyleManager;
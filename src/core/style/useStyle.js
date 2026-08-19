import loadStyle from "./load.js";

export default function useStyle(...styles) {
  return styles.flat().filter(Boolean).map((href) =>
    loadStyle(href).catch((error) => {
      console.error(error);
      return null;
    })
  );
}

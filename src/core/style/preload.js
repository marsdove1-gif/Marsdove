import loadStyle from "./load.js";

export default async function preloadStyles(...hrefs) {

  await Promise.all(
    hrefs.flat().map(loadStyle)
  );

}
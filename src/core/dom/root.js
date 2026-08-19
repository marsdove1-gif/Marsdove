import state from "./state.js";

export function root() {
  return state.root;
}

export function app() {
  return state.app;
}

export function setRoot(value) {
  state.root = value;
}

export function setApp(value) {
  state.app = value;
}

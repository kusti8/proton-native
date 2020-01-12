export let BACKEND: "qt" | "wx" = "qt";

export function setBackend(backend: "qt" | "wx") {
  BACKEND = backend;
}

export function getBackend() {
  return require(`./${BACKEND}`);
}

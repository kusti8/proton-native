import { Window, Text, App } from '../components/';

const COMPONENTS = {
  ROOT: () => new App(),
  TEXT: () => new Text(hostContex, props),
  WINDOW: () => new Window(hostContex, props),
  default: undefined,
};

// Creates an element with an element type, props and a root instance
function createElement(type, props, hostContex) {
  return COMPONENTS[type]() || COMPONENTS.default;
}

export {
  createElement,
  COMPONENTS
}

import { Root, App, View, Window } from '../components/';

// Creates an element with an element type, props and a root instance
function createElement(type, props) {
  const COMPONENTS = {
    ROOT: () => new Root(),
    APP: () => new App(props),
    VIEW: () => new View(props),
    WINDOW: () => new Window(props),
    default: undefined,
  };
  return COMPONENTS[type]() || COMPONENTS.default;
}

export { createElement };

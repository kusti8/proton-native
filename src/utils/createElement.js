import { View, Window } from '../components/';
import { ROOT_NODE } from '../render/';

function getHostContextNode(rootNode) {
  return ROOT_NODE;
}

// Creates an element with an element type, props and a root instance
function createElement(type, props) {
  const COMPONENTS = {
    VIEW: () => new View(ROOT_NODE, props),
    WINDOW: () => new Window(ROOT_NODE, props),
    default: undefined,
  };

  return COMPONENTS[type]() || COMPONENTS.default;
}

export { createElement, getHostContextNode };

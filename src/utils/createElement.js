import {
  App,
  Text,
  Root,
  Window,
  Button,
  VerticalBox,
  HorizontalBox,
  Entry,
  PasswordEntry,
  MultilineEntry,
  ColorButton,
  Form,
  Tab,
  Group,
} from '../components/';
import { ROOT_NODE } from '../render/';

function getHostContextNode(rootNode) {
  if (typeof rootNode !== undefined) {
    return ROOT_NODE;
  } else {
    console.warn(
      `${rootNode} is not an instance of officegen docx constructor.`
    );

    return ROOT_NODE;
  }
}

// Creates an element with an element type, props and a root instance
function createElement(type, props) {
  const COMPONENTS = {
    ROOT: () => new Root(),
    TEXT: () => new Text(ROOT_NODE, props),
    APP: () => new App(ROOT_NODE, props),
    WINDOW: () => new Window(ROOT_NODE, props),
    BUTTON: () => new Button(ROOT_NODE, props),
    VERTICALBOX: () => new VerticalBox(ROOT_NODE, props),
    HORIZONTALBOX: () => new HorizontalBox(ROOT_NODE, props),
    ENTRY: () => new Entry(ROOT_NODE, props),
    PASSWORDENTRY: () => new PasswordEntry(ROOT_NODE, props),
    MULTILINEENTRY: () => new MultilineEntry(ROOT_NODE, props),
    COLORBUTTON: () => new ColorButton(ROOT_NODE, props),
    FORM: () => new Form(ROOT_NODE, props),
    TAB: () => new Tab(ROOT_NODE, props),
    GROUP: () => new Group(ROOT_NODE, props),
    default: undefined,
  };

  return COMPONENTS[type]() || COMPONENTS.default;
}

export { createElement, getHostContextNode };

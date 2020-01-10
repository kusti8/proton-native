import {
  Root,
  App,
  View,
  Window,
  VirtualText,
  RootText,
  Image,
  TextInput,
  PickerInternal,
  Button
} from "../components/";

// Creates an element with an element type, props and a root instance
function createElement(type: string, props: any): any {
  const COMPONENTS = {
    ROOT: () => Root(props),
    APP: () => App(props),
    VIEW: () => View(props),
    WINDOW: () => Window(props),
    VIRTUALTEXT: () => VirtualText(props),
    ROOTTEXT: () => RootText(props),
    IMAGE: () => Image(props),
    TEXTINPUT: () => TextInput(props),
    PICKERINTERNAL: () => PickerInternal(props),
    BUTTON: () => Button(props),
    default: undefined
  };
  return (COMPONENTS as any)[type]() || COMPONENTS.default;
}

export { createElement };

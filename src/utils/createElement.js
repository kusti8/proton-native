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
  Grid,
  Checkbox,
  Spinbox,
  Slider,
  Combobox,
  RadioButton,
  EditableCombobox,
  HorizontalSeparator,
  VerticalSeparator,
  ProgressBar,
  MenuBar,
  FontButton,
  Area,
} from '../components/';
import { ROOT_NODE } from '../render/';

function getHostContextNode(rootNode) {
  return ROOT_NODE;
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
    GRID: () => new Grid(ROOT_NODE, props),
    CHECKBOX: () => new Checkbox(ROOT_NODE, props),
    SPINBOX: () => new Spinbox(ROOT_NODE, props),
    SLIDER: () => new Slider(ROOT_NODE, props),
    COMBOBOX: () => new Combobox(ROOT_NODE, props),
    COMBOBOXITEM: () => new Combobox.Item(ROOT_NODE, props),
    RADIOBUTTON: () => new RadioButton(ROOT_NODE, props),
    RADIOBUTTONITEM: () => new RadioButton.Item(ROOT_NODE, props),
    EDITABLECOMBOBOX: () => new EditableCombobox(ROOT_NODE, props),
    HORIZONTALSEPARATOR: () => new HorizontalSeparator(ROOT_NODE, props),
    VERTICALSEPARATOR: () => new VerticalSeparator(ROOT_NODE, props),
    PROGRESSBAR: () => new ProgressBar(ROOT_NODE, props),
    MENUBAR: () => new MenuBar(ROOT_NODE, props),
    MENUBARITEM: () => new MenuBar.Item(ROOT_NODE, props),
    FONTBUTTON: () => new FontButton(ROOT_NODE, props),
    AREA: () => new Area(ROOT_NODE, props),
    AREARECTANGLE: () => new Area.Rectangle(ROOT_NODE, props),
    AREALINE: () => new Area.Line(ROOT_NODE, props),
    AREAARC: () => new Area.Arc(ROOT_NODE, props),
    AREABEZIER: () => new Area.Bezier(ROOT_NODE, props),
    AREAPATH: () => new Area.Path(ROOT_NODE, props),
    AREAGROUP: () => new Area.Group(ROOT_NODE, props),
    AREACIRCLE: () => new Area.Circle(ROOT_NODE, props),
    default: undefined,
  };

  return COMPONENTS[type]() || COMPONENTS.default;
}

export { createElement, getHostContextNode };

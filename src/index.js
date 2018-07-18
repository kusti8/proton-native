import render from './render';
import {
  Box,
  TextInput,
  Picker,
  RadioButtons,
  Separator,
  Menu,
  Area,
  StyledText,
} from './react-components';
import { Dialog } from './components';

// Aliases for createElement method
const Text = 'TEXT';
const App = 'APP';
const Window = 'WINDOW';
const Button = 'BUTTON';
const VerticalBox = 'VERTICALBOX';
const HorizontalBox = 'HORIZONTALBOX';
const Entry = 'ENTRY';
const PasswordEntry = 'PASSWORDENTRY';
const MultilineEntry = 'MULTILINEENTRY';
const ColorButton = 'COLORBUTTON';
const Form = 'FORM';
const Tab = 'TAB';
const Group = 'GROUP';
const Grid = 'GRID';
const Checkbox = 'CHECKBOX';
const Spinbox = 'SPINBOX';
const Slider = 'SLIDER';
const Combobox = 'COMBOBOX';
const ComboboxItem = 'COMBOBOXITEM';
const RadioButton = 'RADIOBUTTON';
const RadioButtonItem = 'RADIOBUTTONITEM';
const EditableCombobox = 'EDITABLECOMBOBOX';
const VerticalSeparator = 'VERTICALSEPARATOR';
const HorizontalSeparator = 'HORIZONTALSEPARATOR';
const ProgressBar = 'PROGRESSBAR';
const MenuBar = 'MENUBAR';
const MenuBarItem = 'MENUBARITEM';
const FontButton = 'FONTBUTTON';
const AreaInternal = 'AREA';
Area.Rectangle = 'AREARECTANGLE';
Area.Line = 'AREALINE';
Area.Arc = 'AREAARC';
Area.Bezier = 'AREABEZIER';
Area.Path = 'AREAPATH';
Area.Group = 'AREAGROUP';
Area.Circle = 'AREACIRCLE';
Area.Text = 'AREATEXT';
Area.Gradient = 'AREAGRADIENT';
Area.GradientStop = 'AREAGRADIENTSTOP';

export {
  render,
  Text,
  App,
  Window,
  Button,
  VerticalBox,
  HorizontalBox,
  Box,
  Entry,
  PasswordEntry,
  TextInput,
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
  ComboboxItem,
  Picker,
  RadioButton,
  RadioButtonItem,
  RadioButtons,
  EditableCombobox,
  VerticalSeparator,
  HorizontalSeparator,
  Separator,
  ProgressBar,
  MenuBar,
  MenuBarItem,
  Menu,
  FontButton,
  Dialog,
  AreaInternal,
  Area,
  StyledText,
};

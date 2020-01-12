import AppRegistry from "./render";
import {
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Picker
} from "./react-components";
import { StyleSheet } from "./misc";
import { setBackend } from "./backends";

require("./utils/requireImpl");

// Aliases for createElement method
const Window = "WINDOW";
const View = "VIEW";
const App = "APP";
const VirtualText = "VIRTUALTEXT";
const RootText = "ROOTTEXT";
const Image = "IMAGE";
const TextInput = "TEXTINPUT";
const PickerInternal = "PICKERINTERNAL";
const Button = "BUTTON";

export {
  AppRegistry,
  Window,
  View,
  App,
  RootText,
  VirtualText,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  Image,
  TextInput,
  PickerInternal,
  Picker,
  setBackend
};

import AppRegistry from './render';
import {
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  Picker,
} from './react-components';
import { StyleSheet } from './misc';

require('./utils/requireImpl');

// Aliases for createElement method
const Window = 'WINDOW';
const View = 'VIEW';
const App = 'APP';
const VirtualText = 'VIRTUALTEXT';
const RootText = 'ROOTTEXT';
const Image = 'IMAGE';
const TextInput = 'TEXTINPUT';
const PickerInternal = 'PICKERINTERNAL';

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
};

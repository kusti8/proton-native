'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHostContextNode = exports.createElement = undefined;

var _components = require('../components/');

var _render = require('../render/');

function getHostContextNode(rootNode) {
  return _render.ROOT_NODE;
}

// Creates an element with an element type, props and a root instance
function createElement(type, props) {
  var COMPONENTS = {
    ROOT: function ROOT() {
      return new _components.Root();
    },
    TEXT: function TEXT() {
      return new _components.Text(_render.ROOT_NODE, props);
    },
    APP: function APP() {
      return new _components.App(_render.ROOT_NODE, props);
    },
    WINDOW: function WINDOW() {
      return new _components.Window(_render.ROOT_NODE, props);
    },
    BUTTON: function BUTTON() {
      return new _components.Button(_render.ROOT_NODE, props);
    },
    VERTICALBOX: function VERTICALBOX() {
      return new _components.VerticalBox(_render.ROOT_NODE, props);
    },
    HORIZONTALBOX: function HORIZONTALBOX() {
      return new _components.HorizontalBox(_render.ROOT_NODE, props);
    },
    ENTRY: function ENTRY() {
      return new _components.Entry(_render.ROOT_NODE, props);
    },
    PASSWORDENTRY: function PASSWORDENTRY() {
      return new _components.PasswordEntry(_render.ROOT_NODE, props);
    },
    MULTILINEENTRY: function MULTILINEENTRY() {
      return new _components.MultilineEntry(_render.ROOT_NODE, props);
    },
    COLORBUTTON: function COLORBUTTON() {
      return new _components.ColorButton(_render.ROOT_NODE, props);
    },
    FORM: function FORM() {
      return new _components.Form(_render.ROOT_NODE, props);
    },
    TAB: function TAB() {
      return new _components.Tab(_render.ROOT_NODE, props);
    },
    GROUP: function GROUP() {
      return new _components.Group(_render.ROOT_NODE, props);
    },
    GRID: function GRID() {
      return new _components.Grid(_render.ROOT_NODE, props);
    },
    CHECKBOX: function CHECKBOX() {
      return new _components.Checkbox(_render.ROOT_NODE, props);
    },
    SPINBOX: function SPINBOX() {
      return new _components.Spinbox(_render.ROOT_NODE, props);
    },
    SLIDER: function SLIDER() {
      return new _components.Slider(_render.ROOT_NODE, props);
    },
    COMBOBOX: function COMBOBOX() {
      return new _components.Combobox(_render.ROOT_NODE, props);
    },
    COMBOBOXITEM: function COMBOBOXITEM() {
      return new _components.Combobox.Item(_render.ROOT_NODE, props);
    },
    RADIOBUTTON: function RADIOBUTTON() {
      return new _components.RadioButton(_render.ROOT_NODE, props);
    },
    RADIOBUTTONITEM: function RADIOBUTTONITEM() {
      return new _components.RadioButton.Item(_render.ROOT_NODE, props);
    },
    EDITABLECOMBOBOX: function EDITABLECOMBOBOX() {
      return new _components.EditableCombobox(_render.ROOT_NODE, props);
    },
    HORIZONTALSEPARATOR: function HORIZONTALSEPARATOR() {
      return new _components.HorizontalSeparator(_render.ROOT_NODE, props);
    },
    VERTICALSEPARATOR: function VERTICALSEPARATOR() {
      return new _components.VerticalSeparator(_render.ROOT_NODE, props);
    },
    PROGRESSBAR: function PROGRESSBAR() {
      return new _components.ProgressBar(_render.ROOT_NODE, props);
    },
    MENUBAR: function MENUBAR() {
      return new _components.MenuBar(_render.ROOT_NODE, props);
    },
    MENUBARITEM: function MENUBARITEM() {
      return new _components.MenuBar.Item(_render.ROOT_NODE, props);
    },
    FONTBUTTON: function FONTBUTTON() {
      return new _components.FontButton(_render.ROOT_NODE, props);
    },
    default: undefined
  };

  return COMPONENTS[type]() || COMPONENTS.default;
}

exports.createElement = createElement;
exports.getHostContextNode = getHostContextNode;
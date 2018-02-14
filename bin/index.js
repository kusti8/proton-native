'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialog = exports.FontButton = exports.Menu = exports.MenuBarItem = exports.MenuBar = exports.ProgressBar = exports.Separator = exports.HorizontalSeparator = exports.VerticalSeparator = exports.EditableCombobox = exports.RadioButtons = exports.RadioButtonItem = exports.RadioButton = exports.Picker = exports.ComboboxItem = exports.Combobox = exports.Slider = exports.Spinbox = exports.Checkbox = exports.Grid = exports.Group = exports.Tab = exports.Form = exports.ColorButton = exports.MultilineEntry = exports.TextInput = exports.PasswordEntry = exports.Entry = exports.Box = exports.HorizontalBox = exports.VerticalBox = exports.Button = exports.Window = exports.App = exports.Text = exports.render = undefined;

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _reactComponents = require('./react-components');

var _components = require('./components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Aliases for createElement method
var Text = 'TEXT';
var App = 'APP';
var Window = 'WINDOW';
var Button = 'BUTTON';
var VerticalBox = 'VERTICALBOX';
var HorizontalBox = 'HORIZONTALBOX';
var Entry = 'ENTRY';
var PasswordEntry = 'PASSWORDENTRY';
var MultilineEntry = 'MULTILINEENTRY';
var ColorButton = 'COLORBUTTON';
var Form = 'FORM';
var Tab = 'TAB';
var Group = 'GROUP';
var Grid = 'GRID';
var Checkbox = 'CHECKBOX';
var Spinbox = 'SPINBOX';
var Slider = 'SLIDER';
var Combobox = 'COMBOBOX';
var ComboboxItem = 'COMBOBOXITEM';
var RadioButton = 'RADIOBUTTON';
var RadioButtonItem = 'RADIOBUTTONITEM';
var EditableCombobox = 'EDITABLECOMBOBOX';
var VerticalSeparator = 'VERTICALSEPARATOR';
var HorizontalSeparator = 'HORIZONTALSEPARATOR';
var ProgressBar = 'PROGRESSBAR';
var MenuBar = 'MENUBAR';
var MenuBarItem = 'MENUBARITEM';
var FontButton = 'FONTBUTTON';

exports.render = _render2.default;
exports.Text = Text;
exports.App = App;
exports.Window = Window;
exports.Button = Button;
exports.VerticalBox = VerticalBox;
exports.HorizontalBox = HorizontalBox;
exports.Box = _reactComponents.Box;
exports.Entry = Entry;
exports.PasswordEntry = PasswordEntry;
exports.TextInput = _reactComponents.TextInput;
exports.MultilineEntry = MultilineEntry;
exports.ColorButton = ColorButton;
exports.Form = Form;
exports.Tab = Tab;
exports.Group = Group;
exports.Grid = Grid;
exports.Checkbox = Checkbox;
exports.Spinbox = Spinbox;
exports.Slider = Slider;
exports.Combobox = Combobox;
exports.ComboboxItem = ComboboxItem;
exports.Picker = _reactComponents.Picker;
exports.RadioButton = RadioButton;
exports.RadioButtonItem = RadioButtonItem;
exports.RadioButtons = _reactComponents.RadioButtons;
exports.EditableCombobox = EditableCombobox;
exports.VerticalSeparator = VerticalSeparator;
exports.HorizontalSeparator = HorizontalSeparator;
exports.Separator = _reactComponents.Separator;
exports.ProgressBar = ProgressBar;
exports.MenuBar = MenuBar;
exports.MenuBarItem = MenuBarItem;
exports.Menu = _reactComponents.Menu;
exports.FontButton = FontButton;
exports.Dialog = _components.Dialog;
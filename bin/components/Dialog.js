'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Dialog;

var _Window = require('./Window');

var _libuiNode = require('libui-node');

var _libuiNode2 = _interopRequireDefault(_libuiNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCurrentDialog = {
  Open: function Open() {
    return _libuiNode2.default.UiDialogs.openFile(_Window.CURRENT_WINDOW);
  },
  Save: function Save() {
    return _libuiNode2.default.UiDialogs.saveFile(_Window.CURRENT_WINDOW);
  },
  Message: function Message(_ref) {
    var title = _ref.title,
        description = _ref.description;

    return _libuiNode2.default.UiDialogs.msgBox(_Window.CURRENT_WINDOW, title, options);
  },
  Error: function Error(_ref2) {
    var title = _ref2.title,
        description = _ref2.description;

    return _libuiNode2.default.UiDialogs.msgBoxError(_Window.CURRENT_WINDOW, title, description);
  }
};

function Dialog(type, options) {
  if (!_Window.CURRENT_WINDOW) {
    return;
  }
  if (typeof options !== 'undefined') {
    if (typeof options.title === 'undefined') {
      options.title = '';
    }
    if (typeof options.description === 'undefined') {
      options.description = '';
    }
  }

  return getCurrentDialog[type](options);
}
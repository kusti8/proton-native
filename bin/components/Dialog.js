'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Dialog;

var _Window = require('./Window');

var _libuiNode = require('libui-node');

var _libuiNode2 = _interopRequireDefault(_libuiNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  if (type == 'Open') {
    return _libuiNode2.default.UiDialogs.openFile(_Window.CURRENT_WINDOW);
  } else if (type == 'Save') {
    return _libuiNode2.default.UiDialogs.saveFile(_Window.CURRENT_WINDOW);
  } else if (type == 'Message') {
    _libuiNode2.default.UiDialogs.msgBox(_Window.CURRENT_WINDOW, options.title, options.description);
  } else if (type == 'Error') {
    _libuiNode2.default.UiDialogs.msgBoxError(_Window.CURRENT_WINDOW, options.title, options.description);
  }
}
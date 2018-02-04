'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.Window = exports.Text = exports.render = undefined;

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// Aliases for createElement method
var Text = 'TEXT';
var Window = 'WINDOW';

exports.render = _render2.default;
exports.Text = Text;
exports.Window = Window;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;
exports.stop = stop;

var _libuiNode = require('libui-node');

var _libuiNode2 = _interopRequireDefault(_libuiNode);

var _timers = require('timers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STARTED = false;
var timeout = null;

function start() {
  if (STARTED) {
    return;
  } else {
    STARTED = true;
  }
  _libuiNode2.default.Ui.mainSteps();
  timeout = (0, _timers.setInterval)(function () {
    return _libuiNode2.default.Ui.mainStep(1);
  }, 16);
}

function stop() {
  if (!STARTED) {
    return;
  } else {
    STARTED = false;
  }
  if (timeout) {
    (0, _timers.clearInterval)(timeout);
  }
}
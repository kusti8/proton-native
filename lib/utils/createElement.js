'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COMPONENTS = exports.createElement = undefined;

var _components = require('../components/');

var COMPONENTS = {
  ROOT: function ROOT() {
    return new _components.App();
  },
  TEXT: function TEXT() {
    return new _components.Text(hostContex, props);
  },
  WINDOW: function WINDOW() {
    return new _components.Window(hostContex, props);
  },
  default: undefined
};

// Creates an element with an element type, props and a root instance
function createElement(type, props, hostContex) {
  return COMPONENTS[type]() || COMPONENTS.default;
}

exports.createElement = createElement;
exports.COMPONENTS = COMPONENTS;
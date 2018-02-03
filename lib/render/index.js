'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactDesktop = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _createElement = require('../utils/createElement');

var _reconciler = require('../reconciler/');

var _reconciler2 = _interopRequireDefault(_reconciler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Renders the input component

var roots = new Map();
var defaultContainer = {};

var ReactDesktop = exports.ReactDesktop = {
  render: function render(element, callback, container) {
    var containerKey = typeof container === 'undefined' ? defaultContainer : container;
    var root = roots.get(containerKey);
    if (!root) {
      root = _reconciler2.default.createContainer(containerKey);
      roots.set(container, root);
    }
    _reconciler2.default.updateContainer(element, root, null);
    var publicInst = _reconciler2.default.getPublicRootInstance(root);
    return publicInst;
  },
  unmountComponentAtNode: function unmountComponentAtNode(container) {
    var containerKey = typeof container === 'undefined' ? defaultContainer : container;
    var root = roots.get(containerKey);
    if (root) {
      _reconciler2.default.updateContainer(null, root, null, function () {
        roots.delete(container);
      });
    }
  }
};

exports.default = ReactDesktop;
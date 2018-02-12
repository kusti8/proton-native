'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createElement = require('./utils/createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var _reconciler = require('./reconciler');

var _reconciler2 = _interopRequireDefault(_reconciler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(element) {
  var container = (0, _createElement2.default)('ROOT');
  var node = _reconciler2.default.createContainer(container);

  _reconciler2.default.updateContainer(element, node, null);

  return container;
}

exports.default = render;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROOT_NODE = undefined;

var _createElement = require('../utils/createElement');

var _reconciler = require('../reconciler/');

var _reconciler2 = _interopRequireDefault(_reconciler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_NODE = exports.ROOT_NODE = {};

// Renders the input component
function render(element) {
  exports.ROOT_NODE = ROOT_NODE = (0, _createElement.createElement)('ROOT');
  var container = ROOT_NODE;

  // Returns the current fiber (flushed fiber)
  var node = _reconciler2.default.createContainer(ROOT_NODE);

  // Schedules a top level update with current fiber and a priority level (depending upon the context)
  _reconciler2.default.updateContainer(element, node, null);
  ROOT_NODE.render();
  // DesktopRenderer.injectIntoDevTools({
  //   bundleType: 1,
  //   version: '0.1.0',
  //   rendererPackageName: 'custom-renderer',
  //   findHostInstanceByFiber: DesktopRenderer.findHostInstance
  // })
}

exports.default = render;
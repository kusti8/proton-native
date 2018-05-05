import { createElement } from '../utils/createElement';
import DesktopRenderer from '../reconciler/';

let connectToDevTools = () => {};

// from jaredhanson/node-parent-require
const prequire = function(id) {
  for (let parent = module.parent; parent; parent = parent.parent) {
    try {
      return parent.require(id);
    } catch (e) {}
  }
  throw new Error("Cannot find module '" + id + "' from parent");
};

try {
  global.window = global;
  global.window.WebSocket = prequire('ws');
  connectToDevTools = prequire('react-devtools-core').connectToDevTools;
} catch (e) {}

export let ROOT_NODE = {};

// Renders the input component
function render(element) {
  connectToDevTools();
  DesktopRenderer.injectIntoDevTools({
    bundleType: 1,
    version: '0.1.0',
    rendererPackageName: 'custom-renderer',
    findHostInstanceByFiber: DesktopRenderer.findHostInstance,
  });

  const container = ROOT_NODE;
  ROOT_NODE = createElement('ROOT');
  // Returns the current fiber (flushed fiber)
  const node = DesktopRenderer.createContainer(ROOT_NODE);

  // Schedules a top level update with current fiber and a priority level (depending upon the context)
  DesktopRenderer.updateContainer(element, node, null);
  ROOT_NODE.render();
}

export default render;

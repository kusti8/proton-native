let connectToDevTools, WebSocket;

// from jaredhanson/node-parent-require
const prequire = function(id) {
  for (let parent = module.parent; parent; parent = parent.parent) {
    try {
      return parent.require(id);
    } catch (e) {}
  }
  throw new Error("Cannot find module '" + id + "' from parent");
};

if (process.env.NODE_ENV !== 'production') {
  try {
    const defineProperty = Object.defineProperty;
    defineProperty(global, 'WebSocket', {
      value: require('ws'),
    });
    defineProperty(global, 'window', {
      value: global,
    });
    connectToDevTools = require('react-devtools-core').connectToDevTools;
  } catch (e) {}
}

let ws;

function connectDevtools(reconciler) {
  if (connectToDevTools) {
    connectToDevTools({
      host: 'localhost',
      port: 8097,
      resolveRNStyle: null,
    });
    reconciler.injectIntoDevTools({
      bundleType: 1,
      version: '2.0.0',
      rendererPackageName: 'proton-renderer',
      findHostInstanceByFiber: reconciler.findHostInstance,
    });
  }
}

function disconnectDevtools() {
  if (
    ws &&
    WebSocket &&
    (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN)
  ) {
    ws.close();
  }
}

export { connectDevtools, disconnectDevtools };

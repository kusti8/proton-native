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
    global.window = global;
    WebSocket = prequire('ws');
    connectToDevTools = prequire('react-devtools-core').connectToDevTools;
  } catch (e) {}
}

let ws;

function connectDevtools(reconciler) {
  if (connectToDevTools && WebSocket) {
    ws = new WebSocket('ws://localhost:8097');
    connectToDevTools({ websocket: ws });
    reconciler.injectIntoDevTools({
      bundleType: 1,
      version: '0.1.0',
      rendererPackageName: 'custom-renderer',
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

import { Reconciler } from "react-reconciler";
import { Component } from "./components/Base";
import { TextChild } from "./components/TextFuncs";

export type DesktopReconciler = Reconciler<Component, TextChild, any, any>;

let connectToDevTools: any;

if (process.env.NODE_ENV !== "production") {
  try {
    const defineProperty = Object.defineProperty;
    defineProperty(global, "WebSocket", {
      value: require("ws")
    });
    defineProperty(global, "window", {
      value: global
    });
    connectToDevTools = require("react-devtools-core").connectToDevTools;
  } catch (e) {}
}

function connectDevtools(reconciler: DesktopReconciler) {
  if (connectToDevTools) {
    connectToDevTools({
      host: "localhost",
      port: 8097,
      resolveRNStyle: null
    });
    reconciler.injectIntoDevTools({
      bundleType: 1,
      version: "2.0.0",
      rendererPackageName: "proton-renderer",
      //@ts-ignore
      findHostInstanceByFiber: reconciler.findHostInstance
    });
  }
}

function disconnectDevtools() {
  process.exit(0); // TODO: There has to be a better way to disconnect
}

export { connectDevtools, disconnectDevtools };

// taken from https://github.com/nodegui/react-nodegui/pull/52/files
import createProxy, { ReactProxyComponent } from "react-proxy";
import * as React from "react";

export let appProxy: ReactProxyComponent; // need to export it so that it stays without being gc'd

export function hot(Component: React.ComponentType) {
  if (appProxy) {
    appProxy.update(Component);
  } else {
    appProxy = createProxy((Component as any).type); // TODO: Fix this
  }
  return React.createElement(appProxy.get(), null);
}

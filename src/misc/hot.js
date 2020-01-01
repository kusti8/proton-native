// taken from https://github.com/nodegui/react-nodegui/pull/52/files
import { createProxy } from 'react-proxy';
import React from 'react';

export let appProxy; // need to export it so that it stays without being gc'd

export function hot(Component) {
  if (appProxy) {
    return appProxy.update(Component);
  } else {
    appProxy = createProxy(Component.type);
  }
  return React.createElement(appProxy.get(), null);
}

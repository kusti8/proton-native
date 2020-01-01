import { connectDevtools } from '../devtools';
import DesktopRenderer from '../reconciler';
import { createElement } from '../utils/createElement';
import { hot } from '../misc/hot';
import { getForceUpdate } from 'react-proxy';
import React from 'react';

export let ROOT_NODE = {};

export let container = {};

const AppRegistry = {
  registerComponent: (name, component) => {
    const newComponent =
      process.env.NODE_ENV === 'production' ? component : hot(component);
    connectDevtools(DesktopRenderer);
    ROOT_NODE = createElement('ROOT');

    container = DesktopRenderer.createContainer(ROOT_NODE);
    DesktopRenderer.updateContainer(newComponent, container, null);
  },
  updateProxy: app => {
    if (container) {
      const mountedInstances = hot(app);
      const forceUpdate = getForceUpdate(React);
      mountedInstances.forEach(forceUpdate);
    }
  },
};

export default AppRegistry;

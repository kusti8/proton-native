import { connectDevtools } from '../devtools';
import DesktopRenderer from '../reconciler';
import { createElement } from '../utils/createElement';

export let ROOT_NODE = {};

const AppRegistry = {
  registerComponent: (name, component) => {
    connectDevtools(DesktopRenderer);

    ROOT_NODE = createElement('ROOT');

    const container = DesktopRenderer.createContainer(ROOT_NODE);
    DesktopRenderer.updateContainer(component, container, null);
  },
};

export default AppRegistry;

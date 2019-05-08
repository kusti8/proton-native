import { connectDevtools } from '../devtools';
import DesktopRenderer from '../reconciler';
import { createElement } from '../utils/createElement';

const AppRegistry = {
  registerComponent: (name, component) => {
    connectDevtools(DesktopRenderer);

    const ROOT_NODE = createElement('ROOT');

    const container = DesktopRenderer.createContainer(ROOT_NODE);
    DesktopRenderer.updateContainer(component, container, null);
  },
};

export default AppRegistry;

import { connectDevtools } from '../devtools';
import DesktopRenderer from '../reconciler';

function registerComponent(name, component) {
  connectDevtools(DesktopRenderer);

  const container = DesktopRenderer.createContainer(window);
  DesktopRenderer.updateContainer(element, container, null);
}

export default render;

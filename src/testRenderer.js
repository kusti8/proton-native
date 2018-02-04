import createElement from './utils/createElement';
import DesktopRenderer from './reconciler';

function render(element) {
  const container = createElement('ROOT');
  const node = DesktopRenderer.createContainer(container);

  DesktopRenderer.updateContainer(element, node, null);

  return container;
}

export default render;

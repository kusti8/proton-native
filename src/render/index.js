import {createElement} from '../utils/createElement';
import DesktopRenderer from '../reconciler/';
import {debounce} from 'lodash'

export let ROOT_NODE = {}

// Renders the input component
function render(element) {
  ROOT_NODE = createElement('ROOT')
  const container = ROOT_NODE

  // Returns the current fiber (flushed fiber)
  const node = DesktopRenderer.createContainer(ROOT_NODE);
    
  // Schedules a top level update with current fiber and a priority level (depending upon the context)
  DesktopRenderer.updateContainer(element, node, null);
  ROOT_NODE.render()
  // DesktopRenderer.injectIntoDevTools({
  //   bundleType: 1,
  //   version: '0.1.0',
  //   rendererPackageName: 'custom-renderer',
  //   findHostInstanceByFiber: DesktopRenderer.findHostInstance
  // })
}

export default render;

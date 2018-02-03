import fs from 'fs';
import path from 'path';
import {createElement} from '../utils/createElement';
import Renderer from '../reconciler/';

// Renders the input component

const roots = new Map();
const defaultContainer = {};

export const ReactDesktop = {
  render(element, callback, container) {
    const containerKey = typeof container === 'undefined' ? defaultContainer : container;
    let root = roots.get(containerKey);
    if (!root) {
      root = Renderer.createContainer(containerKey, false, false);
      roots.set(container, root);
    }
    Renderer.updateContainer(element, root, null);
    const publicInst = Renderer.getPublicRootInstance(root);
    return publicInst
  },
  unmountComponentAtNode(container) {
    const containerKey = typeof container === 'undefined' ? defaultContainer : container;
    const root = roots.get(containerKey);
    if (root) {
      Renderer.updateContainer(null, root, null, () => {
        roots.delete(container);
      });
    }
  },
}

export default ReactDesktop;

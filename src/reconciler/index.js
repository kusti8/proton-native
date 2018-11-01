import emptyObject from 'fbjs/lib/emptyObject';
import { createElement, getHostContextNode } from '../utils/createElement';
import { ROOT_NODE } from '../render/';

const Reconciler = require('react-reconciler');

const DesktopRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    }
  },

  createInstance(type, props, internalInstanceHandle) {
    return createElement(type, props);
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    return text;
  },

  finalizeInitialChildren(wordElement, type, props) {
    return false;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareForCommit(hostContext) {
    // noop
  },

  prepareUpdate(wordElement, type, oldProps, newProps) {
    return true;
  },

  resetAfterCommit(hostContext) {
    // noop
  },

  resetTextContent(wordElement) {
    // noop
  },

  getRootHostContext(instance) {
    const a = getHostContextNode(instance);
    return a;
  },

  getChildHostContext(instance) {
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    return false;
  },

  now: () => {},

  useSyncScheduling: true,

  // MUTATION

  appendChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    }
    if (typeof child.render === 'function') child.render(parentInstance); // we just added a new child, so we want to render it
  },

  appendChildToContainer(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    }
    if (typeof child.render === 'function') child.render(parentInstance); // we just added a new child, so we want to render it
  },

  removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
  },

  removeChildFromContainer(parentInstance, child) {
    parentInstance.removeChild(child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    parentInstance.insertChild(child, beforeChild);
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    if (typeof instance.update !== 'undefined') {
      instance.update(oldProps, newProps);
    }
  },

  commitMount(instance, updatePayload, type, oldProps, newProps) {
    // noop
  },

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance = newText;
  },

  supportsMutation: true,
  supportsPersistence: false,
});

export default DesktopRenderer;

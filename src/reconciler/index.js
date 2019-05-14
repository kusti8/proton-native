import emptyObject from 'fbjs/lib/emptyObject';
import { createElement } from '../utils/createElement';
import { ROOT_NODE } from '../render';

const Reconciler = require('react-reconciler');

const DesktopRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    appendChild(parentInstance, child);
  },

  createInstance(type, props, internalInstanceHandle) {
    return createElement(type, props);
  },

  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    return { text, type: 'text' };
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
    const propKeys = new Set(
      Object.keys(newProps).concat(Object.keys(oldProps))
    ).values();

    const diff = {};
    for (let key of propKeys) {
      if (
        key !== 'children' && // children are already handled by react-reconciler
        oldProps[key] !== newProps[key]
      ) {
        diff[key] = newProps[key];
      }
    }

    return diff;
  },

  resetAfterCommit(hostContext) {
    hostContext.afterCommit(hostContext);
  },

  resetTextContent(wordElement) {
    // noop
  },

  getRootHostContext(instance) {
    return {};
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
    appendChild(parentInstance, child);
  },

  appendChildToContainer(parentInstance, child) {
    appendChild(parentInstance, child);
  },

  removeChild(parentInstance, child) {
    removeChild(parentInstance, child);
  },

  removeChildFromContainer(parentInstance, child) {
    removeChild(parentInstance, child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    insertChild(parentInstance, child, beforeChild);
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    instance.updateProps(updatePayload);
  },

  commitMount(instance, updatePayload, type, oldProps, newProps) {
    // noop
  },

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.text = newText;
  },

  supportsMutation: true,
  supportsPersistence: false,
});

const appendChild = (container, child) => {
  if (container.appendChild) {
    if (typeof child == 'object') child.parent = container;
    container.appendChild(child, container);
  } else {
    throw new Error(`Can't append child to ${container.constructor.name}`);
  }
};

const removeChild = (container, child) => {
  if (container.removeChild) {
    container.removeChild(child, container);
  } else {
    throw new Error(`Can't remove child from ${container.constructor.name}`);
  }
};

const insertChild = (container, child, beforeChild) => {
  if (container.insertChild) {
    if (typeof child == 'object') child.parent = container;
    container.insertChild(child, beforeChild, container);
  } else {
    throw new Error(`Can't append child to ${container.constructor.name}`);
  }
};

export default DesktopRenderer;

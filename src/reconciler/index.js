import emptyObject from 'fbjs/lib/emptyObject';
import { createElement } from '../utils/createElement';
import { ROOT_NODE } from '../render';

const Reconciler = require('react-reconciler');

const DEBUG = false;

const DesktopRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    if (DEBUG) console.log('appendInitialChild');
    appendChild(parentInstance, child);
  },

  createInstance(type, props, internalInstanceHandle) {
    if (DEBUG) console.log('createInstance');
    return createElement(type, props);
  },

  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    if (DEBUG) console.log('createTextInstance');
    return { text, type: 'text' };
  },

  finalizeInitialChildren(wordElement, type, props) {
    if (DEBUG) console.log('finalizeInitialChildren');
    return false;
  },

  getPublicInstance(inst) {
    if (DEBUG) console.log('getPublicInstance');
    return inst;
  },

  prepareForCommit(hostContext) {
    if (DEBUG) console.log('prepareForCommit');
    // noop
  },

  prepareUpdate(wordElement, type, oldProps, newProps) {
    if (DEBUG) console.log('prepareUpdate');
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
    if (DEBUG) console.log('resetAfterCommit');
    hostContext.afterCommit(hostContext);
  },

  resetTextContent(wordElement) {
    if (DEBUG) console.log('resetTextContent');
    // noop
  },

  getRootHostContext(instance) {
    if (DEBUG) console.log('getRootHostContext');
    return {};
  },

  getChildHostContext(instance) {
    if (DEBUG) console.log('getChildHostContext');
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    if (DEBUG) console.log('shouldSetTextContent');
    return false;
  },

  now: () => {},

  useSyncScheduling: true,

  // MUTATION

  appendChild(parentInstance, child) {
    if (DEBUG) console.log('appendChild');
    appendChild(parentInstance, child);
  },

  appendChildToContainer(parentInstance, child) {
    if (DEBUG) console.log('appendChildToContainer');
    appendChild(parentInstance, child);
  },

  removeChild(parentInstance, child) {
    if (DEBUG) console.log('removeChild');
    removeChild(parentInstance, child);
  },

  removeChildFromContainer(parentInstance, child) {
    if (DEBUG) console.log('removeChildFromContainer');
    removeChild(parentInstance, child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    if (DEBUG) console.log('insertBefore');
    insertChild(parentInstance, child, beforeChild);
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    if (DEBUG) console.log('commitUpdate');
    instance.updateProps(updatePayload);
  },

  commitMount(instance, updatePayload, type, oldProps, newProps) {
    if (DEBUG) console.log('commitMount');
    // noop
  },

  commitTextUpdate(textInstance, oldText, newText) {
    if (DEBUG) console.log('commitTextUpdate');
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

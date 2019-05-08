import emptyObject from 'fbjs/lib/emptyObject';
import { createElement } from '../utils/createElement';

const Reconciler = require('react-reconciler');

const DesktopRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    console.log('Append');
    appendChild(parentInstance, child);
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
    // noop
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
    console.log('Append');
    appendChild(parentInstance, child);
  },

  appendChildToContainer(parentInstance, child) {
    console.log('Append');
    appendChild(parentInstance, child);
  },

  removeChild(parentInstance, child) {
    removeChild(parentInstance, child);
  },

  removeChildFromContainer(parentInstance, child) {
    removeChild(parentInstance, child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    parentInstance.insertChild(child, beforeChild);
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    instance.updateProps(updatePayload);
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

const appendChild = (container, child) => {
  if (container.appendChild) {
    container.appendChild(child);
    child.parent = container;
  } else {
    throw new Error(`Can't append child to ${container.constructor.name}`);
  }
};

const removeChild = (container, child) => {
  if (container.removeChild) {
    container.removeChild(child);
  } else {
    throw new Error(`Can't remove child from ${container.constructor.name}`);
  }
};

export default DesktopRenderer;

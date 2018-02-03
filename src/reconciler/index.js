import emptyObject from 'fbjs/lib/emptyObject';
import {createElement} from '../utils/createElement';

const Reconciler = require('react-reconciler')

const Renderer = Reconciler({
  createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    console.log("HI")
    return createElement(type, props, hostContext);
  },

  appendInitialChild(parentInstance, child) {
    console.log("HI")
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.win = child;
    }
  },

  finalizeInitialChildren(instance, type, props, rootContainerInstance) {
    console.log("HI")
    return true;
  },

  prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, hostContext) {
    console.log("HI")
    return newProps;
  },

  getPublicInstance(inst) {
    console.log(inst)
    return inst;
  },

  prepareForCommit() {
    // noop
  },

  resetAfterCommit() {
    
    // noop
  },

  resetTextContent(wordElement) {
    // noop
  },

  getRootHostContext(instance) {
    return emptyObject
  },

  getChildHostContext(instance) {
    return emptyObject;
  },

  shouldSetTextContent(props) {
    console.log('shouldSetTextContent');
    return false;

    if (typeof props.children === 'string') {
      return true;
    }
    return false;
  },

  resetTextContent(instance) {
    console.log('resetTextContent');
  },

  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  )  {
    console.log('createTextInstance');
    return text;
  },

  scheduleAnimationCallback() {
    console.log('scheduleAnimationCallback');
  },

  scheduleDeferredCallback() {
    console.log('scheduleDeferredCallback');
  },

  mutation: {
    appendChild(
      parentInstance,
      child
    ) {
      console.log("HI")
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child)
      } else {
        parentInstance.win = child;
      }
    },

    appendChildToContainer(parentInstance, child) {
      console.log("Prepare for commit")
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child)
      } else {
        parentInstance.win = child;
      }
    },

    removeChild(
      parentInstance,
      child
    ) {
      parentInstance.removeChild(child);
      child.destroy();
    },
  
    removeChildFromContainer(
      parentInstance,
      child
    ) {
      parentInstance.removeChild(child);
      child.destroy();
    },

    insertBefore(
      parentInstance,
      child,
      beforeChild
    ) {
      console.log('insertBefore');
      // parentInstance.insertBefore(child, beforeChild);
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
      instance.update(oldProps, newProps)
    },

    commitTextUpdate(
      textInstance,
      oldText,
      newText
    ) {
      console.log('commitTextUpdate', oldText, newText);
      // noop
      throw new Error('commitTextUpdate should not be called');
    },
  },

  now: () => Date.now(),

  useSyncScheduling: true
})

export default Renderer;

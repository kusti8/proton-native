import emptyObject from 'fbjs/lib/emptyObject';
import {createElement, getHostContextNode} from '../utils/createElement';

const Reconciler = require('react-reconciler')

const DesktopRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    console.log("HI1")
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    }
  },

  createInstance(type, props, internalInstanceHandle) {
    console.log("HI2")
    return createElement(type, props);
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    console.log("HI3")
    return text;
  },

  finalizeInitialChildren(wordElement, type, props) {
    console.log("HI4")
    return false;
  },

  getPublicInstance(inst) {
    console.log("HI5")
    return inst;
  },

  prepareForCommit() {
    console.log("HI6")
    // noop
  },

  prepareUpdate(wordElement, type, oldProps, newProps) {
    console.log("HI7")
    return true;
  },

  resetAfterCommit() {
    console.log("HI8")
    // noop
  },

  resetTextContent(wordElement) {
    console.log("HI9")
    // noop
  },

  getRootHostContext(instance) {
    console.log(instance)
    const a = getHostContextNode(instance)
    return a
  },

  getChildHostContext(instance) {
    console.log("HI11")
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    console.log("HI12")
    return false;
  },

  now: () => {},

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      console.log("HI13")
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      }
    },

    appendChildToContainer(parentInstance, child) {
      console.log("HI14")
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      }
    },
    
    removeChild(parentInstance, child) {
      console.log("HI15")
      parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      console.log("HI16")
      parentInstance.removeChild(child);
    },
  
    insertBefore(parentInstance, child, beforeChild) {
      console.log("HI17")
      // noob
    },
  
    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      console.log("HI18")
      if (typeof instance.update !== 'undefined') {
        instance.update(oldProps, newProps)
      }
    },
  
    commitMount(instance, updatePayload, type, oldProps, newProps) {
      console.log("HI19")
      // noop
    },
  
    commitTextUpdate(textInstance, oldText, newText) {
      console.log("HI20")
      console.log(newText)
      textInstance = newText;
    },
  }
})

export default DesktopRenderer;

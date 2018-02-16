'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emptyObject = require('fbjs/lib/emptyObject');

var _emptyObject2 = _interopRequireDefault(_emptyObject);

var _createElement = require('../utils/createElement');

var _render = require('../render/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Reconciler = require('react-reconciler');

var DesktopRenderer = Reconciler({
  appendInitialChild: function appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    }
  },
  createInstance: function createInstance(type, props, internalInstanceHandle) {
    return (0, _createElement.createElement)(type, props);
  },
  createTextInstance: function createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    return text;
  },
  finalizeInitialChildren: function finalizeInitialChildren(wordElement, type, props) {
    return false;
  },
  getPublicInstance: function getPublicInstance(inst) {
    return inst;
  },
  prepareForCommit: function prepareForCommit() {
    // noop
  },
  prepareUpdate: function prepareUpdate(wordElement, type, oldProps, newProps) {
    return true;
  },
  resetAfterCommit: function resetAfterCommit() {
    // noop
  },
  resetTextContent: function resetTextContent(wordElement) {
    // noop
  },
  getRootHostContext: function getRootHostContext(instance) {
    var a = (0, _createElement.getHostContextNode)(instance);
    return a;
  },
  getChildHostContext: function getChildHostContext(instance) {
    return _emptyObject2.default;
  },
  shouldSetTextContent: function shouldSetTextContent(type, props) {
    return false;
  },


  now: function now() {},

  useSyncScheduling: true,

  mutation: {
    appendChild: function appendChild(parentInstance, child) {
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      }
      if (typeof child.render === 'function') child.render(parentInstance.element); // we just added a new child, so we want to render it
    },
    appendChildToContainer: function appendChildToContainer(parentInstance, child) {
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      }
    },
    removeChild: function removeChild(parentInstance, child) {
      parentInstance.removeChild(child);
    },
    removeChildFromContainer: function removeChildFromContainer(parentInstance, child) {
      parentInstance.removeChild(child);
    },
    insertBefore: function insertBefore(parentInstance, child, beforeChild) {
      // noob
    },
    commitUpdate: function commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      if (typeof instance.update !== 'undefined') {
        instance.update(oldProps, newProps);
      }
    },
    commitMount: function commitMount(instance, updatePayload, type, oldProps, newProps) {
      // noop
    },
    commitTextUpdate: function commitTextUpdate(textInstance, oldText, newText) {
      textInstance = newText;
    }
  }
});

exports.default = DesktopRenderer;
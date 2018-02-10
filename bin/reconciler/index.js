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
    console.log('HI1');
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    }
  },
  createInstance: function createInstance(type, props, internalInstanceHandle) {
    console.log('HI2');
    return (0, _createElement.createElement)(type, props);
  },
  createTextInstance: function createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    console.log('HI3');
    return text;
  },
  finalizeInitialChildren: function finalizeInitialChildren(wordElement, type, props) {
    console.log('HI4');
    return false;
  },
  getPublicInstance: function getPublicInstance(inst) {
    console.log('HI5');
    return inst;
  },
  prepareForCommit: function prepareForCommit() {
    console.log('HI6');
    // noop
  },
  prepareUpdate: function prepareUpdate(wordElement, type, oldProps, newProps) {
    console.log('HI7');
    return true;
  },
  resetAfterCommit: function resetAfterCommit() {
    console.log('HI8');
    // noop
  },
  resetTextContent: function resetTextContent(wordElement) {
    console.log('HI9');
    // noop
  },
  getRootHostContext: function getRootHostContext(instance) {
    var a = (0, _createElement.getHostContextNode)(instance);
    return a;
  },
  getChildHostContext: function getChildHostContext(instance) {
    console.log('HI11');
    return _emptyObject2.default;
  },
  shouldSetTextContent: function shouldSetTextContent(type, props) {
    console.log('HI12');
    return false;
  },


  now: function now() {},

  useSyncScheduling: true,

  mutation: {
    appendChild: function appendChild(parentInstance, child) {
      console.log('HI13');
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      }
      child.render(parentInstance.element); // we just added a new child, so we want to render it
      console.log('Rendered child');
    },
    appendChildToContainer: function appendChildToContainer(parentInstance, child) {
      console.log('HI14');
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      }
    },
    removeChild: function removeChild(parentInstance, child) {
      console.log('HI15');
      parentInstance.removeChild(child);
    },
    removeChildFromContainer: function removeChildFromContainer(parentInstance, child) {
      console.log('HI16');
      parentInstance.removeChild(child);
    },
    insertBefore: function insertBefore(parentInstance, child, beforeChild) {
      console.log('HI17');
      // noob
    },
    commitUpdate: function commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      console.log('HI18');
      if (typeof instance.update !== 'undefined') {
        instance.update(oldProps, newProps);
      }
    },
    commitMount: function commitMount(instance, updatePayload, type, oldProps, newProps) {
      console.log('HI19');
      // noop
    },
    commitTextUpdate: function commitTextUpdate(textInstance, oldText, newText) {
      console.log('HI20');
      console.log(newText);
      textInstance = newText;
    }
  }
});

exports.default = DesktopRenderer;
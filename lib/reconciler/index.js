'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _Reconciler;

var _emptyObject = require('fbjs/lib/emptyObject');

var _emptyObject2 = _interopRequireDefault(_emptyObject);

var _createElement = require('../utils/createElement');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var Reconciler = require('react-reconciler');

var Renderer = Reconciler(
  ((_Reconciler = {
    createInstance: function createInstance(
      type,
      props,
      rootContainerInstance,
      hostContext,
      internalInstanceHandle
    ) {
      console.log('HI');
      return (0, _createElement.createElement)(type, props, hostContext);
    },
    appendInitialChild: function appendInitialChild(parentInstance, child) {
      console.log('HI');
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        parentInstance.win = child;
      }
    },
    finalizeInitialChildren: function finalizeInitialChildren(
      instance,
      type,
      props,
      rootContainerInstance
    ) {
      console.log('HI');
      return true;
    },
    prepareUpdate: function prepareUpdate(
      instance,
      type,
      oldProps,
      newProps,
      rootContainerInstance,
      hostContext
    ) {
      console.log('HI');
      return newProps;
    },
    getPublicInstance: function getPublicInstance(inst) {
      console.log(inst);
      return inst;
    },
    prepareForCommit: function prepareForCommit() {
      // noop
    },
    resetAfterCommit: function resetAfterCommit() {
      // noop
    },
    resetTextContent: function resetTextContent(wordElement) {
      // noop
    },
    getRootHostContext: function getRootHostContext(instance) {
      return _emptyObject2.default;
    },
    getChildHostContext: function getChildHostContext(instance) {
      return _emptyObject2.default;
    },
    shouldSetTextContent: function shouldSetTextContent(props) {
      console.log('shouldSetTextContent');
      return false;

      if (typeof props.children === 'string') {
        return true;
      }
      return false;
    },
  }),
  _defineProperty(_Reconciler, 'resetTextContent', function resetTextContent(
    instance
  ) {
    console.log('resetTextContent');
  }),
  _defineProperty(
    _Reconciler,
    'createTextInstance',
    function createTextInstance(
      text,
      rootContainerInstance,
      hostContext,
      internalInstanceHandle
    ) {
      console.log('createTextInstance');
      return text;
    }
  ),
  _defineProperty(
    _Reconciler,
    'scheduleAnimationCallback',
    function scheduleAnimationCallback() {
      console.log('scheduleAnimationCallback');
    }
  ),
  _defineProperty(
    _Reconciler,
    'scheduleDeferredCallback',
    function scheduleDeferredCallback() {
      console.log('scheduleDeferredCallback');
    }
  ),
  _defineProperty(_Reconciler, 'mutation', {
    appendChild: function appendChild(parentInstance, child) {
      console.log(child);
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        parentInstance.win = child;
      }
    },
    appendChildToContainer: function appendChildToContainer(
      parentInstance,
      child
    ) {
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        parentInstance.win = child;
      }
    },
    removeChild: function removeChild(parentInstance, child) {
      parentInstance.removeChild(child);
      child.destroy();
    },
    removeChildFromContainer: function removeChildFromContainer(
      parentInstance,
      child
    ) {
      parentInstance.removeChild(child);
      child.destroy();
    },
    insertBefore: function insertBefore(parentInstance, child, beforeChild) {
      console.log('insertBefore');
      // parentInstance.insertBefore(child, beforeChild);
    },
    commitUpdate: function commitUpdate(
      instance,
      updatePayload,
      type,
      oldProps,
      newProps,
      internalInstanceHandle
    ) {
      instance.update(oldProps, newProps);
    },
    commitTextUpdate: function commitTextUpdate(
      textInstance,
      oldText,
      newText
    ) {
      console.log('commitTextUpdate', oldText, newText);
      // noop
      throw new Error('commitTextUpdate should not be called');
    },
  }),
  _defineProperty(_Reconciler, 'now', function now() {}),
  _defineProperty(_Reconciler, 'useSyncScheduling', true),
  _Reconciler)
);

exports.default = Renderer;

import { createElement } from "../utils/createElement";
import { Component } from "../components/Base";
import { TextChild } from "../components/TextFuncs";
import { Root } from "../components/Root";
import { uniq } from "lodash";

const Reconciler = require("react-reconciler");

const DEBUG = false;

const DesktopRenderer = Reconciler({
  appendInitialChild(parentInstance: Component, child: Component) {
    if (DEBUG) console.log("appendInitialChild");
    insertChild(parentInstance, child);
  },

  createInstance(type: string, props: object) {
    if (DEBUG) console.log("createInstance");
    return createElement(type, props);
  },

  createTextInstance(text: string) {
    if (DEBUG) console.log("createTextInstance");
    return { text, type: "text" };
  },

  finalizeInitialChildren() {
    if (DEBUG) console.log("finalizeInitialChildren");
    return false;
  },

  getPublicInstance(inst: any) {
    if (DEBUG) console.log("getPublicInstance");
    return inst;
  },

  prepareForCommit() {
    if (DEBUG) console.log("prepareForCommit");
    // noop
  },

  prepareUpdate(
    wordElement: any,
    type: string,
    oldProps: { [key: string]: any },
    newProps: { [key: string]: any }
  ) {
    if (DEBUG) console.log("prepareUpdate");
    const propKeys = uniq(Object.keys(newProps).concat(Object.keys(oldProps)));

    const diff: { [key: string]: any } = {};
    for (let key of propKeys) {
      if (
        //key !== "children" && // children are already handled by react-reconciler
        oldProps[key] !== newProps[key]
      ) {
        diff[key] = newProps[key];
      }
    }

    // console.log(oldProps, newProps);
    // console.log("DIFF", diff);

    return diff;
  },

  resetAfterCommit(hostContext: Root) {
    if (DEBUG) console.log("resetAfterCommit");
    hostContext.afterCommit(hostContext);
  },

  resetTextContent() {
    if (DEBUG) console.log("resetTextContent");
    // noop
  },

  getRootHostContext() {
    if (DEBUG) console.log("getRootHostContext");
    return {};
  },

  getChildHostContext() {
    if (DEBUG) console.log("getChildHostContext");
    return {};
  },

  shouldSetTextContent() {
    if (DEBUG) console.log("shouldSetTextContent");
    return false;
  },

  now: () => {},

  useSyncScheduling: true,

  // MUTATION

  appendChild(parentInstance: Component, child: Component) {
    if (DEBUG) console.log("appendChild");
    insertChild(parentInstance, child);
  },

  appendChildToContainer(parentInstance: Component, child: Component) {
    if (DEBUG) console.log("appendChildToContainer");
    insertChild(parentInstance, child);
  },

  removeChild(parentInstance: Component, child: Component) {
    if (DEBUG) console.log("removeChild");
    removeChild(parentInstance, child);
  },

  removeChildFromContainer(parentInstance: Component, child: Component) {
    if (DEBUG) console.log("removeChildFromContainer");
    removeChild(parentInstance, child);
  },

  insertBefore(
    parentInstance: Component,
    child: Component,
    beforeChild: Component
  ) {
    if (DEBUG) console.log("insertBefore");
    insertChild(parentInstance, child, beforeChild);
  },

  commitUpdate(instance: Component, updatePayload: object) {
    if (DEBUG) console.log("commitUpdate");
    //console.log("UPDATE", instance, updatePayload);
    instance.updateProps(updatePayload);
  },

  commitMount() {
    if (DEBUG) console.log("commitMount");
    // noop
  },

  commitTextUpdate(textInstance: TextChild, oldText: string, newText: string) {
    if (DEBUG) console.log("commitTextUpdate");
    //console.log("TEXT UPDATE", newText);
    textInstance.text = newText;
    textInstance.parent!.updateText();
  },

  supportsMutation: true,
  supportsPersistence: false
});

const removeChild = (container: Component, child: Component) => {
  //console.log("REMOVE", child);
  if (container.removeChild) {
    container.removeChild(child);
  } else {
    throw new Error(`Can't remove child from ${container.constructor.name}`);
  }
};

const insertChild = (
  container: Component,
  child: Component,
  beforeChild?: Component
) => {
  const operation = beforeChild ? "insertChild" : "appendChild";
  const params = beforeChild ? [child, beforeChild] : [child];
  if (container[operation]) {
    setParent(container, child);
    //@ts-ignore
    container[operation](...params);
    child?.element?.show?.(); // TODO: Should this be here?
  } else {
    throw new Error(`Can't append child to ${container.constructor.name}`);
  }
};

const setParent = (container: Component, child: Component) => {
  if (typeof child == "object") child.parent = container;
};

export default DesktopRenderer;

import propChecker from "../utils/propChecker";
import propsUpdater from "../utils/propsUpdater";
import { Component } from "./Base";

const propTypes = {};
const defaultProps = {};

export default (p: {}) => {
  const children: Component[] = [];

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, "App");

  const updateProps = propsUpdater({});

  const appendChild = (child: Component) => {
    if (child.element) {
      children.push(child);
      child.element.show();
    }
  };

  const insertChild = (child: Component, beforeChild: Component) => {
    if (children.includes(child)) {
      throw new Error(`Can't add the same window twice`);
    }
    if (!children.includes(beforeChild)) {
      throw new Error(`Relative element does not exist`);
    }
    const i = children.indexOf(beforeChild);
    children.splice(0, i, child);
    child.element.show();
  };

  const removeChild = (child: Component) => {
    if (!children.includes(child)) {
      throw new Error(`Can't remove a child that's not added`);
    }
    const i = children.indexOf(child);
    children.splice(i, 1)[0].element.del();
  };

  updateProps(props);

  return {
    appendChild,
    insertChild,
    removeChild,
    updateProps,
    children
  };
};

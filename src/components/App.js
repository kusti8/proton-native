import propChecker from '../utils/propChecker';
import { disconnectDevtools } from '../devtools';
import propsUpdater from '../utils/propsUpdater';

export default p => {
  const children = [];

  const propTypes = {};
  const defaultProps = {};

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, 'App');

  const updateProps = propsUpdater({});

  const appendChild = child => {
    children.push(child);
    child.element.show();
  };

  const insertChild = (child, beforeChild) => {
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

  const removeChild = child => {
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
    children,
  };
};

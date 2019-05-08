import propChecker from '../utils/propChecker';
import { disconnectDevtools } from '../devtools';
import propsUpdater from '../utils/propsUpdater';

export default p => {
  const windows = [];

  const propTypes = {};
  const defaultProps = {};

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, 'App');

  const updateProps = propsUpdater({});

  const appendChild = child => {
    windows.push(child.element);
    child.element.show();
  };

  const insertChild = (child, beforeChild) => {
    if (windows.includes(child.element)) {
      throw new Error(`Can't add the same window twice`);
    }
    if (!windows.includes(beforeChild.element)) {
      throw new Error(`Relative element does not exist`);
    }
    const i = windows.indexOf(beforeChild.element);
    windows.splice(0, i, child.element);
    child.element.show();
  };

  const removeChild = child => {
    if (!isWindow(child)) {
      throw new Error('Child is not a window');
    }
    if (!windows.includes(child.element)) {
      throw new Error(`Can't remove a child that's not added`);
    }
    const i = windows.indexOf(child.element);
    windows.splice(i, 1)[0].close();
  };

  updateProps(props);

  return {
    appendChild,
    insertChild,
    removeChild,
    updateProps,
  };
};

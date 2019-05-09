import propChecker from '../utils/propChecker';
import { disconnectDevtools } from '../devtools';
import qt from 'node-qt-napi';
import { Container } from './Container';
import PropTypes from 'prop-types';
import propsUpdater from '../utils/propsUpdater';
import convertStyleSheet from '../utils/convertStyleSheet';
import yoga, { Node } from 'yoga-layout';
import { getYogaValueTransformer } from '../utils/yogaHelper';

export default p => {
  const propTypes = {
    style: PropTypes.object,
  };
  const defaultProps = {
    style: {},
  };

  const element = new qt.QWidget();
  const node = Node.create();

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, 'View');

  const applyYogaStyle = style => {
    for (const key in style) {
      const transformer = getYogaValueTransformer(key);
      const setFn = node[transformer.functionName];
      if (setFn) {
        const value = style[key];
        const args = transformer.transform(value);
        setFn.apply(node, args);
      }
    }
  };

  const containerProps = Container(
    child => {
      child.element.setParent(element);
      if (child.node) {
        node.insertChild(child.node, node.getChildCount());
      }
    },
    child => {
      child.element.del();
      if (child.node) {
        node.removeChild(child.node);
      }
    },
    (child, i) => {
      child.element.setParent(element);
      if (child.node) {
        node.insertChild(child.node, i);
      }
    }
  );

  const updateProps = propsUpdater({
    style: style => {
      element.setStyleSheet(convertStyleSheet(style));
      applyYogaStyle(style);
    },
  });

  const applyYoga = root => {
    if (root) {
      node.calculateLayout(root.w, root.h, yoga.DIRECTION_LTR);
    }
    const layout = node.getComputedLayout();
    element.resize(layout.width, layout.height);
    element.move(layout.left, layout.top);
  };

  updateProps(props);

  return {
    ...containerProps,
    element,
    updateProps,
    applyYoga,
    node,
  };
};

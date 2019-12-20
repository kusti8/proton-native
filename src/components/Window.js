import propChecker from '../utils/propChecker';
import { disconnectDevtools } from '../devtools';
import { Container } from './Container';
import propsUpdater from '../utils/propsUpdater';
import { ROOT_NODE } from '../render';
import PropTypes from 'prop-types';
import convertStyleSheet from '../utils/convertStyleSheet';
import { YogaComponent } from './YogaComponent';
import { WindowElement, desktopSize } from '../backends/qt';

export default p => {
  const propTypes = {
    style: PropTypes.object,
    onResize: PropTypes.func,
  };
  const defaultProps = {
    style: {},
    onResize: () => {},
  };

  const element = new WindowElement();

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, 'Window');

  const yogaProps = YogaComponent(element);

  const handlers = {
    onResize: props.onResize,
  };

  element.resizeEvent((w, h) => {
    ROOT_NODE.afterCommit(ROOT_NODE);
    handlers.onResize({ w, h });
  });

  const percentToSize = (width, height) => {
    let newWidth = width;
    let newHeight = height;
    if (typeof width == 'string' && width[width.length - 1] == '%') {
      newWidth = desktopSize().w * (parseInt(width, 10) / 100.0);
    }
    if (typeof height == 'string' && height[height.length - 1] == '%') {
      newHeight = desktopSize().h * (parseInt(height, 10) / 100.0);
    }
    return { w: newWidth, h: newHeight };
  };

  const updateProps = propsUpdater([handlers, 'onResize'], {
    style: style => {
      const width = style.width;
      const height = style.height;
      delete style.width; // cause we don't want to resize with yoga, only with our pipeline
      delete style.height;
      element.setStyleSheet(convertStyleSheet(style));
      yogaProps.applyYogaStyle(style);
      const size = percentToSize(width, height);
      if (size.h && size.w) {
        element.resize(size.w, size.h);
      } else if (size.w) {
        element.resize(size.w, element.height());
      } else if (size.h) {
        element.resize(element.width(), size.h);
      }
    },
  });

  const containerProps = Container(
    child => {
      child.element.setParent(element);
      if (child.node) {
        yogaProps.node.insertChild(child.node, yogaProps.node.getChildCount());
      }
    },
    child => {
      child.element.del();
      if (child.node) {
        yogaProps.node.removeChild(child.node);
      }
    },
    (child, i) => {
      child.element.setParent(element);
      if (child.node) {
        yogaProps.node.insertChild(child.node, i);
      }
    }
  );

  updateProps(props);

  return {
    ...containerProps,
    ...yogaProps,
    element,
    updateProps,
  };
};

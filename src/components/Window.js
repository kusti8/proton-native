import propChecker from '../utils/propChecker';
import { disconnectDevtools } from '../devtools';
import qt from 'node-qt-napi';
import { Container } from './Container';
import propsUpdater from '../utils/propsUpdater';
import { ROOT_NODE } from '../render';
import PropTypes from 'prop-types';
import convertStyleSheet from '../utils/convertStyleSheet';

export default p => {
  const propTypes = {
    style: PropTypes.object,
    onResize: PropTypes.func,
  };
  const defaultProps = {
    style: {},
    onResize: () => {},
  };

  const element = new qt.QMainWindow();

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, 'Window');

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
      newWidth = qt.desktopSize().w * (parseInt(width, 10) / 100.0);
    }
    if (typeof height == 'string' && height[height.length - 1] == '%') {
      newHeight = qt.desktopSize().h * (parseInt(height, 10) / 100.0);
    }
    return { w: newWidth, h: newHeight };
  };

  const updateProps = propsUpdater([handlers, 'onResize'], {
    style: style => {
      element.setStyleSheet(convertStyleSheet(style));
      const size = percentToSize(style.width, style.height);
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
    child => child.element.setParent(element),
    child => child.element.del()
  );

  updateProps(props);

  return {
    ...containerProps,
    element,
    updateProps,
  };
};

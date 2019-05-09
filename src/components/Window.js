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

  const updateProps = propsUpdater([handlers, 'onResize'], {
    style: style => element.setStyleSheet(convertStyleSheet(style)),
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

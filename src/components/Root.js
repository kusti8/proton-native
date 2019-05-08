import propChecker from '../utils/propChecker';
import { disconnectDevtools } from '../devtools';
import qt from 'node-qt-napi';
import { Container } from './Container';

export default props => {
  const propTypes = {};
  const defaultProps = {};

  const element = new qt.QApplication();

  props = propChecker(props, propTypes, defaultProps, 'Root');

  const containerProps = Container(() => {}, () => {});

  setInterval(() => element.processEvents(), 0);

  return {
    ...containerProps,
    element,
  };
};

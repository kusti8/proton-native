import propChecker from '../utils/propChecker';
import { disconnectDevtools } from '../devtools';
import qt from 'node-qt-napi';
import { Container } from './Container';
import propsUpdater from '../utils/propsUpdater';

export default p => {
  const propTypes = {};
  const defaultProps = {};

  const element = new qt.QMainWindow();

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, 'Window');

  const updateProps = propsUpdater({});

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

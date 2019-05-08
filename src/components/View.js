import propChecker from '../utils/propChecker';
import { disconnectDevtools } from '../devtools';
import qt from 'node-qt-napi';
import { Container } from './Container';
import PropTypes from 'prop-types';
import propsUpdater from '../utils/propsUpdater';
import convertStyleSheet from '../utils/convertStyleSheet';
import yoga, { Node } from 'yoga-layout';

export default p => {
  const propTypes = {
    style: PropTypes.object,
  };
  const defaultProps = {
    style: {},
  };

  const element = new qt.QWidget();

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, 'View');

  const containerProps = Container(
    child => child.setParent(element),
    child => child.element.del()
  );

  const updateProps = propsUpdater({
    style: style => {
      element.setStyleSheet(convertStyleSheet(style));
    },
  });

  updateProps(props);

  return {
    ...containerProps,
    element,
    updateProps,
  };
};

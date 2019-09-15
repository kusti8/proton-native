import propChecker from '../utils/propChecker';
import { disconnectDevtools } from '../devtools';
import qt from 'node-qt-napi';
import { Container } from './Container';
import PropTypes from 'prop-types';
import propsUpdater from '../utils/propsUpdater';
import convertStyleSheet from '../utils/convertStyleSheet';
import { YogaComponent } from './YogaComponent';

export default p => {
  const propTypes = {
    style: PropTypes.object,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
  };
  const defaultProps = {
    style: {},
    onChangeText: () => {},
    value: '',
  };

  const element = new qt.QLineEdit();

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, 'TextInput');

  const yogaProps = YogaComponent(element);

  const handlers = {
    onChangeText: props.onChangeText,
  };

  element.textChangedEvent(text => {
    handlers.onChangeText(text);
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

  const updateProps = propsUpdater([handlers, 'onChangeText'], {
    style: style => {
      element.setStyleSheet(convertStyleSheet(style));
      yogaProps.applyYogaStyle(style);
    },
    value: value => {
      element.setText(value);
    },
  });

  updateProps(props);

  return {
    ...containerProps,
    ...yogaProps,
    element,
    updateProps,
  };
};

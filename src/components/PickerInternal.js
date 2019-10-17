import propChecker from '../utils/propChecker';
import { disconnectDevtools } from '../devtools';
import qt from 'node-qt-napi';
import { Container } from './Container';
import PropTypes from 'prop-types';
import propsUpdater from '../utils/propsUpdater';
import convertStyleSheet from '../utils/convertStyleSheet';
import { YogaComponent } from './YogaComponent';
import Yoga from 'yoga-layout-prebuilt';

export default p => {
  const propTypes = {
    style: PropTypes.object,
    onValueChange: PropTypes.func,
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
  const defaultProps = {
    style: {},
    onValueChange: () => {},
    selectedValue: '',
  };

  const element = new qt.QComboBox();
  const items = {};
  const itemList = [];

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, 'Picker');

  const yogaProps = YogaComponent(element, undefined, true);

  const handlers = {
    onValueChange: props.onValueChange,
  };

  element.currentTextChangedEvent(text => {
    handlers.onValueChange(element.currentIndex(), items[text] || text);
  });

  const containerProps = Container(
    child => {
      element.addItem(child.props.label);
      itemList.push(child);
      items[child.props.label] = child.props.value || child.props.label;
    },
    child => {
      element.removeItem(itemList.indexOf(child));
      delete items[child.props.label];
      itemList.splice(itemList.indexOf(child), 1);
    },
    (child, i) => {
      element.insertItem(i, child.props.label);
      items[child.props.label] = child.props.value || child.props.label;
      itemList.splice(i, 0, child);
    }
  );

  const updateProps = propsUpdater([handlers, 'onValueChange'], {
    style: style => {
      element.setStyleSheet(convertStyleSheet(style));
      yogaProps.applyYogaStyle(style);
    },
    selectedValue: value => {
      element.setCurrentText(value);
    },
  });

  updateProps(props);

  for (let i = 0; i < props.children.length; i++) {
    containerProps.appendChild(props.children[i]);
  }

  return {
    ...containerProps,
    ...yogaProps,
    element,
    updateProps,
  };
};

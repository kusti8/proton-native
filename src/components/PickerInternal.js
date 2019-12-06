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

  element.activatedEvent(text => {
    handlers.onValueChange(items[text] || text, element.currentIndex());
  });

  const containerProps = Container(
    child => {
      if (!child.props) return;
      element.addItem(child.props.label);
      itemList.push(child.props.label);
      items[child.props.label] = child.props.value || child.props.label;
    },
    child => {
      if (!child.props) return;
      element.removeItem(itemList.indexOf(child.props.label));
      delete items[child.props.label];
      itemList.splice(itemList.indexOf(child.props.label), 1);
    },
    (child, i) => {
      if (!child.props) return;
      element.insertItem(i, child.props.label);
      items[child.props.label] = child.props.value || child.props.label;
      itemList.splice(i, 0, child.props.label);
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
    children: children => {
      if (
        children.map(x => (x.props ? x.props.label : x)).toString() ==
        itemList.toString()
      )
        return;
      for (let i = itemList.length - 1; i >= 0; i--) {
        itemList.splice(i, 1);
        element.removeItem(i);
      }
      Object.keys(items).forEach(item => delete items[item]);

      for (let i = 0; i < children.length; i++) {
        containerProps.appendChild(children[i]);
      }

      if (!children.length) {
        containerProps.appendChild(children);
      }
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

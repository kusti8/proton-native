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
    onResponderGrant: PropTypes.func,
    onResponderRelease: PropTypes.func,
    resizeMode: PropTypes.oneOf([
      'cover',
      'contain',
      'stretch',
      'repeat',
      'center',
    ]),
  };
  const defaultProps = {
    style: {},
    onResponderGrant: () => {},
    onResponderRelease: () => {},
    resizeMode: 'stretch',
  };

  const element = new qt.QLabel();
  const pixElement = new qt.QPixmap();

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, 'Image');

  let resizeMode = props.resizeMode;

  const applyPixSize = (width, height, mode) => {};

  const yogaProps = YogaComponent(element, layout => {
    applyPixSize(layout.width, layout.height, resizeMode);
  });

  const handlers = {
    onResponderGrant: props.onResponderGrant,
    onResponderRelease: props.onResponderRelease,
  };

  element.mousePressEvent(() => {
    handlers.onResponderGrant();
  });

  element.mouseReleaseEvent(() => {
    handlers.onResponderRelease();
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

  const updateProps = propsUpdater(
    [handlers, 'onResponderGrant', 'onResponderRelease'],
    {
      style: style => {
        element.setStyleSheet(convertStyleSheet(style));
        yogaProps.applyYogaStyle(style);
      },
      resizeMode: r => {
        resizeMode = r;
      },
    }
  );

  updateProps(props);

  return {
    ...containerProps,
    ...yogaProps,
    element,
    pixElement,
    updateProps,
    resizeMode,
  };
};

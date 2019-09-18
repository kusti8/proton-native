import propChecker from '../utils/propChecker';
import { disconnectDevtools } from '../devtools';
import qt from 'node-qt-napi';
import { Container } from './Container';
import PropTypes from 'prop-types';
import propsUpdater from '../utils/propsUpdater';
import convertStyleSheet from '../utils/convertStyleSheet';
import { YogaComponent } from './YogaComponent';
import fetch from 'node-fetch';

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
  };

  const element = new qt.QLabel();
  element.setScaledContents(false);
  const pixElement = new qt.QPixmap();

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, 'Image');

  const resizeMode = { r: props.resizeMode || 'stretch' };

  const applyPixSize = (width, height, mode) => {
    element.setAlignment(qt.Alignment.AlignLeft | qt.Alignment.AlignVCenter);
    if (mode == 'cover') {
      pixElement.scaled(
        width,
        height,
        qt.AspectRatioMode.KeepAspectRatioByExpanding
      );
    } else if (mode == 'contain') {
      pixElement.scaled(width, height, qt.AspectRatioMode.KeepAspectRatio);
    } else if (mode == 'stretch') {
      pixElement.scaled(width, height, qt.AspectRatioMode.IgnoreAspectRatio);
    } else if (mode == 'center') {
      element.setAlignment(qt.Alignment.AlignCenter);
      pixElement.scaled(width, height, qt.AspectRatioMode.KeepAspectRatio);
    } else if (mode == 'repeat') {
      pixElement.scaledTile(width, height);
    }
    element.setPixmap(pixElement);
    element.show();
    element.adjustSize();
  };

  const yogaProps = YogaComponent(element, layout => {
    applyPixSize(layout.width, layout.height, resizeMode.r);
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
        if (style.resizeMode) {
          resizeMode.r = style.resizeMode;
        }
        element.setStyleSheet(convertStyleSheet(style));
        yogaProps.applyYogaStyle(style);
      },
      resizeMode: r => {
        resizeMode.r = r;
      },
      source: source => {
        if (source.uri) {
          // need to figure out what width and height work with, and also work with arrays
          if (
            source.uri.startsWith('http://') ||
            source.uri.startsWith('https://') ||
            source.uri.startsWith('ftp://')
          ) {
            fetch(source.uri, {
              method: source.method || 'GET',
              body: source.body,
              headers: source.headers,
            })
              .then(out => out.buffer())
              .then(out => {
                pixElement.loadFromData(out);
                element.setPixmap(pixElement);
              });
          } else {
            pixElement.load(source.uri);
            element.setPixmap(pixElement);
          }
        }
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

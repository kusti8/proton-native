import propChecker from '../utils/propChecker';
import { disconnectDevtools } from '../devtools';
import { Container } from './Container';
import PropTypes from 'prop-types';
import propsUpdater from '../utils/propsUpdater';
import convertStyleSheet from '../utils/convertStyleSheet';
import { YogaComponent } from './YogaComponent';
import fetch from 'node-fetch';
import { ImageElement } from '../backends/qt';

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
    source: PropTypes.object,
  };
  const defaultProps = {
    style: {},
    onResponderGrant: () => {},
    onResponderRelease: () => {},
  };

  const element = new ImageElement();

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, 'Image');

  const resizeMode = { r: props.resizeMode || 'stretch' };
  const pixSize = {};

  const yogaProps = YogaComponent(element, layout => {
    pixSize.width = layout.width;
    pixSize.height = layout.height;
    pixSize.resizeMode = resizeMode.r;
    if (!element.isNull())
      element.scaleImage(layout.width, layout.height, resizeMode.r);
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
                element.setFromData(out);
                element.scaleImage(
                  pixSize.width,
                  pixSize.height,
                  pixSize.resizeMode
                );
              })
              .catch(err => console.log(err));
          } else {
            element.setFromUri(source.uri);
            element.scaleImage(
              pixSize.width,
              pixSize.height,
              pixSize.resizeMode
            );
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
    updateProps,
    resizeMode,
  };
};

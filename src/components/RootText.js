import propChecker from '../utils/propChecker';
import qt from 'node-qt-napi';
import propsUpdater from '../utils/propsUpdater';
import PropTypes from 'prop-types';
import { TextFuncs } from './TextFuncs';
import { YogaComponent } from './YogaComponent';
import Yoga from 'yoga-layout';

export default p => {
  const propTypes = {
    style: PropTypes.object,
  };
  const defaultProps = {
    style: {},
  };

  const element = new qt.QLabel();

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, 'Text');

  let styleProp = props.style;

  const yogaProps = YogaComponent(element);

  const measureText = (width, widthMode, height, heightMode) => {
    if (widthMode === Yoga.MEASURE_MODE_EXACTLY) {
      return { height: element.height() }; // TODO: is this the right measurement function?
    }

    if (widthMode === Yoga.MEASURE_MODE_AT_MOST) {
      return {
        height: element.height(),
        width: Math.min(width, element.width()),
      };
    }

    return {};
  };

  yogaProps.node.setMeasureFunc((...args) => measureText(...args));

  const updateProps = propsUpdater({
    style: style => {
      styleProp = style;
      yogaProps.applyYogaStyle(style);
      yogaProps.node.markDirty();
    },
  });

  const textProps = TextFuncs(text => {
    element.setText(text);
    element.adjustSize();
  }, styleProp);

  updateProps(props);

  return {
    ...textProps,
    ...yogaProps,
    element,
    updateProps,
    type: 'fullText',
  };
};

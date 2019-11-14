import propChecker from '../utils/propChecker';
import qt from 'node-qt-napi';
import propsUpdater from '../utils/propsUpdater';
import PropTypes from 'prop-types';
import { TextFuncs } from './TextFuncs';
import { YogaComponent } from './YogaComponent';

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

  const styleProp = { s: props.style };

  const yogaProps = YogaComponent(element, undefined, true);

  const updateProps = propsUpdater({
    style: style => {
      styleProp.s = style;
      if (style.textAlign) {
      }
      yogaProps.applyYogaStyle(style);
    },
  });

  const textProps = TextFuncs(text => {
    element.setText(text);
    yogaProps.node.markDirty();
    yogaProps.f.f && yogaProps.f.f();
  }, styleProp.s);

  updateProps(props);

  return {
    ...textProps,
    ...yogaProps,
    element,
    updateProps,
    type: 'fullText',
  };
};

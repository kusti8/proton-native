import propChecker from '../utils/propChecker';
import { disconnectDevtools } from '../devtools';
import qt from 'node-qt-napi';
import propsUpdater from '../utils/propsUpdater';
import PropTypes from 'prop-types';
import { TextFuncs } from './TextFuncs';
import convertStyleSheet from '../utils/convertStyleSheet';

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

  const updateProps = propsUpdater({
    style: style => {
      styleProp = style;
    },
  });

  const textProps = TextFuncs(text => {
    element.setText(text);
    element.adjustSize();
  }, styleProp);

  updateProps(props);

  return {
    ...textProps,
    element,
    updateProps,
    type: 'fullText',
  };
};

import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class Slider extends DesktopComponent {
  eventParameter = { onChanged: 'value' };

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = new libui.UiSlider(this.props.min, this.props.max);
    this.initialProps(this.props);
  }

  render(parent) {
    this.lastParent = parent;
    this.addParent(parent);
    this.renderChildNode();
  }
}

Slider.propTypes = {
  ...universalPropTypes,
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
};

Slider.defaultProps = {
  ...universalDefaultProps,
  enabled: true,
  visible: true,
  value: 0,
  onChange: () => {},
  min: 0,
  max: 100,
};

export default Slider;

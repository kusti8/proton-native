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
    this.element = new libui.UiSlider();
    this.initialProps(this.props);
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

Slider.PropTypes = {
  ...universalPropTypes,
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

Slider.defaultProps = {
  ...universalDefaultProps,
  enabled: true,
  visible: true,
  value: 0,
  onChange: () => {},
};

export default Slider;

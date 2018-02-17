import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class Spinbox extends DesktopComponent {
  eventParameter = { onChange: 'value' };

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = new libui.UiSpinbox();
    this.initialProps(this.props);
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

Spinbox.PropTypes = {
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
  ...universalPropTypes,
};

Spinbox.defaultProps = {
  enabled: true,
  visible: true,
  value: 0,
  onChange: () => {},
  ...universalDefaultProps,
};

export default Spinbox;

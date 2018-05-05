import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class Checkbox extends DesktopComponent {
  eventParameter = { onToggled: 'checked' };
  childName = 'text';

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = new libui.UiCheckbox();
    this.initialProps(this.props);
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

Checkbox.propTypes = {
  ...universalPropTypes,
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  checked: PropTypes.bool,
  onToggle: PropTypes.func,
  children: PropTypes.string,
};

Checkbox.defaultProps = {
  ...universalDefaultProps,
  enabled: true,
  visible: true,
  checked: false,
  onToggle: () => {},
  children: '',
};

export default Checkbox;

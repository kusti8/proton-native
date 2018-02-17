import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class PasswordEntry extends DesktopComponent {
  eventParameter = { onChange: 'text' };
  childName = 'text';

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = new libui.UiPasswordEntry();
    this.initialProps(this.props);
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

PasswordEntry.PropTypes = {
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.string,
  ...universalPropTypes,
};

PasswordEntry.defaultProps = {
  enabled: true,
  visible: true,
  readOnly: false,
  onChange: () => {},
  children: '',
  ...universalDefaultProps,
};

export default PasswordEntry;

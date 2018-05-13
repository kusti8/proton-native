import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class Button extends DesktopComponent {
  eventParameter = { onClicked: 'text' };
  childName = 'text';

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = new libui.UiButton();
    this.initialProps(this.props);
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

Button.propTypes = {
  ...universalPropTypes,
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.string,
};

Button.defaultProps = {
  ...universalDefaultProps,
  enabled: true,
  visible: true,
  onClick: () => {},
  children: '',
};

export default Button;

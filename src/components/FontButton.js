import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class FontButton extends DesktopComponent {
  eventParameter = { onChange: () => this.element.getFont() };

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = new libui.UiFontButton();
    this.initialProps(this.props);
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

FontButton.PropTypes = {
  onChange: PropTypes.func,
  ...universalPropTypes,
};

FontButton.defaultProps = {
  onChange: () => {},
  ...universalDefaultProps,
};

export default FontButton;

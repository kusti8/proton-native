import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class FontButton extends DesktopComponent {
  eventParameter = { onChanged: () => this.element.getFont() };

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

FontButton.propTypes = {
  ...universalPropTypes,
  onChange: PropTypes.func,
};

FontButton.defaultProps = {
  ...universalDefaultProps,
  onChange: () => {},
};

export default FontButton;

import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class HorizontalBox extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.newElement();
    this.initialProps(this.props);
  }

  newElement() {
    this.element = new libui.UiHorizontalBox();
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode(this);
  }
}

HorizontalBox.propTypes = {
  ...universalPropTypes,
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  padded: PropTypes.bool,
};

HorizontalBox.defaultProps = {
  ...universalDefaultProps,
  enabled: true,
  visible: true,
  padded: false,
};

export default HorizontalBox;

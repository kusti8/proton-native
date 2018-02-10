import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class HorizontalSeparator extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = new libui.UiHorizontalSeparator();
    this.initialProps(this.props);
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

HorizontalSeparator.PropTypes = {
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  ...universalPropTypes,
};

HorizontalSeparator.defaultProps = {
  enabled: true,
  visible: true,
  ...universalDefaultProps,
};

export default HorizontalSeparator;

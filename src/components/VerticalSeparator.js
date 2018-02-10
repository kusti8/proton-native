import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class VerticalSeparator extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = new libui.UiVerticalSeparator();
    this.initialProps(this.props);
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

VerticalSeparator.PropTypes = {
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  ...universalPropTypes,
};

VerticalSeparator.defaultProps = {
  enabled: true,
  visible: true,
  ...universalDefaultProps,
};

export default VerticalSeparator;

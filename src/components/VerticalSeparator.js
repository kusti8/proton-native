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
    this.newElement();
    this.initialProps(this.props);
  }

  newElement() {
    this.element = new libui.UiVerticalSeparator();
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

VerticalSeparator.propTypes = {
  ...universalPropTypes,
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
};

VerticalSeparator.defaultProps = {
  ...universalDefaultProps,
  enabled: true,
  visible: true,
};

export default VerticalSeparator;

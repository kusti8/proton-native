import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class Text extends DesktopComponent {
  childName = 'text';

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.newElement();
    this.initialProps(this.props);
  }

  newElement() {
    this.element = new libui.UiLabel();
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

Text.propTypes = {
  ...universalPropTypes,
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  children: PropTypes.string,
};

Text.defaultProps = {
  ...universalDefaultProps,
  enabled: true,
  visible: true,
  children: '',
};

export default Text;

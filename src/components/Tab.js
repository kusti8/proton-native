import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class Tab extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = new libui.UiTab();
    this.initialProps(props);
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode(this);
  }
}

Tab.PropTypes = {
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  ...universalPropTypes,
};

Tab.defaultProps = {
  enabled: true,
  visible: true,
  ...universalDefaultProps,
};

export default Tab;

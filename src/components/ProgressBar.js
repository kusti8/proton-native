import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class ProgressBar extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = new libui.UiProgressBar();
    this.initialProps(this.props);
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

ProgressBar.PropTypes = {
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  value: PropTypes.number,
  ...universalPropTypes,
};

ProgressBar.defaultProps = {
  enabled: true,
  visible: true,
  value: 0,
  ...universalDefaultProps,
};

export default ProgressBar;

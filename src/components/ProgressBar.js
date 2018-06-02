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
    this.newElement();
    this.initialProps(this.props);
  }

  newElement() {
    this.element = new libui.UiProgressBar();
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

ProgressBar.propTypes = {
  ...universalPropTypes,
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  value: PropTypes.number,
};

ProgressBar.defaultProps = {
  ...universalDefaultProps,
  enabled: true,
  visible: true,
  value: 0,
};

export default ProgressBar;

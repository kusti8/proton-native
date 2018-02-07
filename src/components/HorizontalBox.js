import DesktopComponent from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types'

class HorizontalBox extends DesktopComponent {

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = props;
    this.element = new libui.UiHorizontalBox();
    this.initialProps()
  }

  render(parent) {
    this.addParent(parent)
    this.renderChildNode(this);
  }
}

HorizontalBox.PropTypes = {
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  padded: PropTypes.bool
}

HorizontalBox.defaultProps = {
  enabled: true,
  visible: true,
  padded: false
}

export default HorizontalBox;

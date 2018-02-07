import DesktopComponent from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types'

class VerticalBox extends DesktopComponent {
  expectedProps = ['enabled', 'visible', 'padded']

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = props;
    this.element = new libui.UiVerticalBox();
    this.initialProps(props)
  }

  render(parent) {
    this.addParent(parent)
    this.renderChildNode(this);
  }
}

VerticalBox.PropTypes = {
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  padded: PropTypes.bool
}

VerticalBox.defaultProps = {
  enabled: true,
  visible: true,
  padded: false
}

export default VerticalBox;

import DesktopComponent from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types'

class Button extends DesktopComponent {
  eventParameter = {onClicked: 'text'}
  childName = 'text'

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = {...props}
    this.element = new libui.UiButton();
    this.setDefaults(props)
    console.log(this.props)
    this.initialProps(this.props)
  }

  render(parent) {
    this.addParent(parent)
    this.renderChildNode();
  }
}

Button.PropTypes = {
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  onClicked: PropTypes.func,
  children: PropTypes.string,
  stretchy: PropTypes.bool
}

Button.defaultProps = {
  enabled: true,
  visible: true,
  onClicked: () => {},
  children: '',
  stretchy: true
}

export default Button;

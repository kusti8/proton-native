import DesktopComponent from './DesktopComponent';
import libui from 'libui-node';

class Button extends DesktopComponent {
  expectedProps = ['enabled', 'visible']
  expectedEvents = {'onClicked': ''}
  expectedChild = 'text'

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = props;
    this.element = new libui.UiButton();
    this.initialProps(props)
  }

  render(parent) {
    this.addParent(parent)
    this.renderChildNode();
  }
}

export default Button;

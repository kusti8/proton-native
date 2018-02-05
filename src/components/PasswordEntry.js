import DesktopComponent from './DesktopComponent';
import libui from 'libui-node';

class PasswordEntry extends DesktopComponent {
  expectedProps = ['enabled', 'visible', 'readOnly']
  expectedEvents = {'onChanged': 'text'}
  expectedChild = 'text'

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = props;
    this.element = new libui.UiPasswordEntry();
    this.initialProps(props)
  }

  render(parent) {
    this.addParent(parent)
    this.renderChildNode();
  }
}

export default PasswordEntry;

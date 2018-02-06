import DesktopComponent from './DesktopComponent';
import libui from 'libui-node';

class Form extends DesktopComponent {
  expectedProps = ['enabled', 'visible', 'padded']

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = props;
    this.element = new libui.UiForm();
    this.initialProps(props)
  }

  render(parent) {
    this.addParent(parent)
    this.renderChildNode(this);
  }
}

export default Form;

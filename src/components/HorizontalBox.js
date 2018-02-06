import DesktopComponent from './DesktopComponent';
import libui from 'libui-node';

class HorizontalBox extends DesktopComponent {
  expectedProps = ['enabled', 'visible', 'padded']

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

export default HorizontalBox;

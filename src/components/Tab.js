import DesktopComponent from './DesktopComponent';
import libui from 'libui-node';

class Tab extends DesktopComponent {
  expectedProps = ['enabled', 'visible']

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = props;
    this.element = new libui.UiTab();
    this.initialProps(props)
  }

  render(parent) {
    this.addParent(parent)
    this.renderChildNode(this);
  }
}

export default Tab;

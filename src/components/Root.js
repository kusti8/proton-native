import libui from 'libui-node';
import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';

// This creates the document instance
class Root extends DesktopComponent {
  constructor() {
    super();
    libui.startLoop();
  }
  render() {
    this.renderChildNode();
  }
}

export default Root;

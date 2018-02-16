import libui from 'libui-node';
import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import { start } from '../eventLoop';

// This creates the document instance
class Root extends DesktopComponent {
  constructor() {
    super();
    libui.Ui.init();
    start();
  }
  render() {
    this.renderChildNode();
  }
}

export default Root;
